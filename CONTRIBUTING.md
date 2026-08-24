# Delivery rules

These rules apply to every change that can affect paid traffic, lead capture, or
production availability.

## Before changing code

1. Work on a branch or keep the change set small and reviewable.
2. Never include `.env` files, webhook URLs, API tokens, or access codes in Git.
3. Treat every lead form as production-critical. It must call the shared lead API
   and only report success after the API responds successfully.
4. Preserve `lead_id`, `lead_source`, `source_page`, and `submitted_at` when
   changing lead payloads.

## Required checks

Run these before merging or deploying:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Run the same checks locally before pushing to `main`. Do not merge a failing
deployment or ignore a failed lead-flow check.

## Production deployment rules

1. Production landing pages must be public; Vercel Deployment Protection belongs
   on previews only.
2. Required Vercel variables must be present before deployment. See the lead
   operations runbook.
3. After a lead-flow change, submit one labelled synthetic lead and verify:
   landing page → KV `leads` → KV `lead_delivery_events` → Zapier → Salesforce.
4. Do not use a real prospective student's details for tests.
5. If a deployment fails, stop paid traffic to the affected page until the public
   page and lead path have been verified again.

## Operational rules

1. Reconcile Meta, KV, Zapier, and Salesforce daily while campaigns are active.
2. Investigate any gap on the same business day using `lead_id`.
3. Keep the project on a patched Next.js release and address high-severity audit
   findings in a tested maintenance release.
4. Do not change the Zapier webhook or Salesforce mapping without an end-to-end
   test and a rollback plan.
