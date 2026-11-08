-- Behavioral multi-tenant RLS tests.
-- Runs only against the local Supabase stack after the reviewed baseline migration.
-- All fixtures are synthetic and rolled back at the end of this test file.

begin;

create extension if not exists pgtap with schema extensions;

select extensions.plan(5);

-- Synthetic users are inserted only into the disposable local Auth schema.
insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
(
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'authenticated', 'authenticated', 'rls-a@example.test', '',
  now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
),
(
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  'authenticated', 'authenticated', 'rls-b@example.test', '',
  now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
);

insert into public.organizations (id, name, slug)
values
  ('aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa', 'RLS Test Org A', 'rls-test-org-a'),
  ('bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb', 'RLS Test Org B', 'rls-test-org-b');

insert into public.organization_memberships (organization_id, user_id, role, status)
values
  ('aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'org_admin', 'active'),
  ('bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'org_admin', 'active');

insert into public.children (id, organization_id, child_code, display_name, created_by)
values
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa', 'aaaaaaaa-0000-4000-8000-aaaaaaaaaaaa', 'RLS-A-001', 'Synthetic Child A', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('bbbbbbbb-1111-4111-8111-bbbbbbbbbbbb', 'bbbbbbbb-0000-4000-8000-bbbbbbbbbbbb', 'RLS-B-001', 'Synthetic Child B', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');

-- Authenticate as User A.
set local role authenticated;
select set_config('request.jwt.claim.sub', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","role":"authenticated","aud":"authenticated"}',
  true
);

select extensions.is(
  (select count(*)::integer from public.children),
  1,
  'Tenant A sees exactly its own child'
);

select extensions.is(
  (select count(*)::integer from public.children where id = 'bbbbbbbb-1111-4111-8111-bbbbbbbbbbbb'),
  0,
  'Tenant A cannot read Tenant B child'
);

select extensions.is(
  (select count(*)::integer from public.organizations),
  1,
  'Tenant A sees only its own organization'
);

-- UPDATE against a foreign tenant row must affect zero rows.
update public.children
set display_name = 'Cross-tenant write attempt'
where id = 'bbbbbbbb-1111-4111-8111-bbbbbbbbbbbb';

select extensions.is(
  (select count(*)::integer
   from public.children
   where id = 'bbbbbbbb-1111-4111-8111-bbbbbbbbbbbb'
     and display_name = 'Cross-tenant write attempt'),
  0,
  'Tenant A cannot update Tenant B child'
);

-- Switch to User B and confirm isolation in the opposite direction.
reset role;
select set_config('request.jwt.claim.sub', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","role":"authenticated","aud":"authenticated"}',
  true
);
set local role authenticated;

select extensions.is(
  (select count(*)::integer from public.children),
  1,
  'Tenant B sees exactly its own child'
);

select * from extensions.finish();
rollback;
