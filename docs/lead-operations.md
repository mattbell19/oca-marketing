# Lead operations runbook

For the complete system map, Zapier configuration, admin tools, analytics, and
environment-variable guide, see [infrastructure and operations](infrastructure-and-operations.md).

## Live lead path

```text
Landing-page form → /api/makeup-leads → Vercel KV audit → Zapier webhook → Salesforce
```

The application returns success only when Zapier accepts the webhook. A Zapier
acceptance does not by itself prove that the downstream Salesforce action
succeeded.

## Required Vercel configuration

Set these values for the Production environment:

| Variable | Purpose |
| --- | --- |
| `OCA_MAKEUP_LEADS_WEBHOOK_URL` | Primary Zapier catch-hook URL. Required. |
| `OCA_MENTAL_HEALTH_LEADS_WEBHOOK_URL` | Optional Mental Health-specific hook. |
| `KV_REST_API_URL` | Upstash/Vercel KV REST endpoint for lead and delivery audit records. |
| `KV_REST_API_TOKEN` | Corresponding KV token. |
| `OCA_ADMIN_ACCESS_CODE` | Long random value that authorizes offer updates. |

Production landing-page domains must remain public. Keep Vercel Deployment
Protection on preview deployments only.

## Daily reconciliation

1. Compare Meta's website Lead events with accepted entries in KV's `leads` list.
2. Compare accepted lead IDs with Zapier run history.
3. Compare successful Zapier runs with Salesforce records created in the same period.
4. Investigate any difference by `lead_id`, `lead_source`, `source_page`, and
   `submitted_at`.

The `lead_delivery_events` list contains non-PII webhook outcomes:

- `leadId`
- `leadSource`
- `delivered` — Zapier accepted the request
- `occurredAt`
- `statusCode` or error reason

## Incident response

If Meta shows more leads than Salesforce:

1. Check whether the landing page returns `200` publicly, not a Vercel SSO redirect.
2. Check `leads` for accepted submissions in the affected window.
3. Check `lead_delivery_events` for webhook failures or timeouts.
4. Review the matching Zapier catch-hook and downstream Salesforce action for failures.
5. Replay only verified missing leads, marked as operational replays to avoid duplicates.

## Safe live test

Use a clearly marked synthetic record, such as `TEST — DO NOT CONTACT`, and
confirm all of the following:

1. The endpoint returns `{ "ok": true, "leadId": "..." }`.
2. KV records the lead and a `lead_delivery_events` entry with `delivered: true`.
3. Zapier receives the request.
4. Salesforce behaviour matches the Zap's intended handling of test leads.

Never use a real prospective student's contact details for operational tests.

## Current known follow-ups

- Configure `OCA_ADMIN_ACCESS_CODE` in Vercel before using `/admin/offers`.
- Upgrade Next.js from `15.4.9` to at least `15.5.23` after freeing sufficient
  local disk space, then run `npm audit`, lint, type-checking, and a production build.
- Configure a Zapier alert or callback for downstream Salesforce failures; the
  landing page can currently verify Zapier acceptance, not Salesforce completion.
