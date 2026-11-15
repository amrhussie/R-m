# RM NeuroAI database migration policy

## Verified starting state (2026-11-15)

- Hosted Supabase project: `ccfuoqpaxrzwrrdqovrp`.
- The Supabase migration-history API returned **zero migrations**.
- The development branch contains the schema definition only in the hosted database; there is no committed baseline migration under `supabase/migrations/`.
- The hosted project currently has 12 application tables in `public`; all 12 report Row Level Security enabled.
- This repository state is therefore **not yet reproducible from migrations**. Do not describe the hosted schema as migration-managed until a reviewed baseline exists.

## Baseline migration is intentionally pending

Do not create an empty or guessed baseline migration. The baseline must be generated from a schema-only export of the approved hosted project, reviewed against the actual tables, constraints, indexes, grants, RLS policies, enums, and private helper functions, then committed as a normal migration.

The read-only schema export workflow is:

1. Configure repository secrets `SUPABASE_ACCESS_TOKEN` and `SUPABASE_DB_PASSWORD`.
2. Run **RM NeuroAI schema export (read-only)** from GitHub Actions.
3. Inspect the `rm-neuroai-schema-only-export` artifact and its checksum.
4. Compare the export with the committed schema and this migration policy.
5. Create the baseline migration locally, review it, and run the local reset and database tests.

The schema export workflow must remain read-only. It must not run `db push`, `migration up --remote`, `migration repair`, or any command that changes the hosted database or its migration history.

## Creating and validating migrations

Use a local Supabase CLI installation and a disposable local stack only:

```bash
supabase migration new baseline_schema
# Populate the generated file from the reviewed schema export.
supabase start
supabase db reset
supabase test db
supabase migration list --local
```

Before any migration is applied to a hosted environment, a separate reviewed deployment plan and explicit approval are required. This repository workflow does not authorize hosted schema changes.

## Required migration review checklist

- [ ] Baseline matches the approved schema-only export.
- [ ] No production data, secrets, or personally identifiable child data are included.
- [ ] Tables, primary/foreign keys, unique/check constraints, indexes, and enum types are represented.
- [ ] RLS is enabled on every exposed application table.
- [ ] Policies enforce organization/child-level authorization; `TO authenticated` alone is not authorization.
- [ ] UPDATE policies contain both `USING` and `WITH CHECK`.
- [ ] Authorization helper functions remain least-privilege and are not accidentally changed to `SECURITY DEFINER`.
- [ ] Local database reset succeeds from an empty state.
- [ ] Structural and behavioral RLS tests pass against the local database.
- [ ] Migration diff and generated types are reviewed before merge.

## Current limitation

Until the baseline migration is committed, the RLS workflow reports the migration gate as not ready and skips database execution. A skipped test is not a passing test. The hosted project remains untouched.
