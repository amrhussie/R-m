-- Read-only structural checks for the RM NeuroAI RLS foundation.
-- Run against a disposable/local Supabase database after applying the reviewed schema.
-- This file creates no fixtures and performs no INSERT/UPDATE/DELETE/DDL.

begin;

do $rls_structure$
declare
  missing_rls_tables text[];
  helper_function_count integer;
begin
  -- Every current public application table must have RLS enabled.
  select array_agg(expected.table_name order by expected.table_name)
    into missing_rls_tables
  from (values
    ('organizations'),
    ('profiles'),
    ('organization_memberships'),
    ('children'),
    ('child_guardians'),
    ('child_staff_assignments'),
    ('iep_plans'),
    ('iep_goals'),
    ('therapy_sessions'),
    ('progress_observations'),
    ('documents'),
    ('audit_logs')
  ) as expected(table_name)
  where not exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = expected.table_name
      and c.relkind in ('r', 'p')
      and c.relrowsecurity
  );

  if missing_rls_tables is not null then
    raise exception 'RLS missing or expected table absent: %', missing_rls_tables;
  end if;

  -- Also protect any newly added public table from silently shipping without RLS.
  if exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind in ('r', 'p')
      and not c.relrowsecurity
  ) then
    raise exception 'At least one public table has RLS disabled';
  end if;

  -- Public application policies must be scoped to authenticated users only.
  if exists (
    select 1
    from pg_policies p
    where p.schemaname = 'public'
      and (
        not (p.roles @> array['authenticated']::name[])
        or p.roles @> array['anon']::name[]
        or p.roles @> array['public']::name[]
      )
  ) then
    raise exception 'A public policy is missing authenticated scope or includes anon/public';
  end if;

  -- UPDATE policies must constrain both the old row and the new row.
  if exists (
    select 1
    from pg_policies p
    where p.schemaname = 'public'
      and p.cmd = 'UPDATE'
      and p.with_check is null
  ) then
    raise exception 'An UPDATE policy is missing WITH CHECK';
  end if;

  -- Anonymous users must not have direct table privileges.
  if exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind in ('r', 'p')
      and (
        has_table_privilege('anon', c.oid, 'SELECT')
        or has_table_privilege('anon', c.oid, 'INSERT')
        or has_table_privilege('anon', c.oid, 'UPDATE')
        or has_table_privilege('anon', c.oid, 'DELETE')
      )
  ) then
    raise exception 'anon has direct table privileges on a public table';
  end if;

  -- Authorization helpers must remain SECURITY INVOKER.
  if exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'private'
      and p.proname in ('has_org_role', 'can_access_child', 'can_edit_child', 'set_updated_at')
      and p.prosecdef
  ) then
    raise exception 'A private helper function is SECURITY DEFINER';
  end if;

  select count(*) into helper_function_count
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'private'
    and p.proname in ('has_org_role', 'can_access_child', 'can_edit_child', 'set_updated_at');

  if helper_function_count <> 4 then
    raise exception 'Expected 4 private helper functions, found %', helper_function_count;
  end if;
end
$rls_structure$;

rollback;
