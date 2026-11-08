# RM NeuroAI local database verification

This workflow keeps the hosted project read-only. It exports schema only and never runs
`db pull`, `db push`, `migration up`, or `migration repair`.

## One-time GitHub repository secrets

Add these secrets in the repository settings:

- `SUPABASE_ACCESS_TOKEN`: a scoped Supabase access token with access to project `ccfuoqpaxrzwrrdqovrp`.
- `SUPABASE_DB_PASSWORD`: the database password for that same project.

Do not put either value in source files, workflow inputs, logs, or chat messages.

## Export the hosted schema

1. Open Actions → **RM NeuroAI schema export (read-only)**.
2. Select **Run workflow** on branch `fix/rm-neuroai-dev-foundation`.
3. Download artifact `rm-neuroai-schema-only-export`.
4. Review the SQL and checksum before any migration file is created.

The export includes the application schemas `public` and `private`, excludes table data,
and does not modify remote migration history. Supabase-managed schemas such as `auth`
and `storage` are managed by the local Supabase stack and are not exported.

## Local test workflow

After the schema export is reviewed and a baseline migration is approved:

```bash
supabase start
supabase test db
```

The RLS behavioral tests in `supabase/tests/rls/tenant_isolation.test.sql` use
synthetic Auth users and child rows inside a transaction that is rolled back.

Do not link a local test command to a hosted write operation. Do not run
`supabase db push --remote` or `supabase migration up --remote` for this task.
