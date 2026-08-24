# Production release checklist

## Before merge

- [ ] Lead forms call `/api/makeup-leads`; none only show a client-side success state.
- [ ] Each new course maps to the intended `lead_source`.
- [ ] Webhook and KV environment variables are configured in Vercel Production.
- [ ] `OCA_ADMIN_ACCESS_CODE` is configured and not committed.
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.
- [ ] The Vercel Production deployment is green after the push to `main`.

## After deployment

- [ ] Public landing-page URL returns `200`, not a Vercel SSO redirect.
- [ ] `/api/makeup-leads` is reachable (a `405` on GET is expected).
- [ ] A labelled synthetic lead returns `ok: true` and a `leadId`.
- [ ] The lead appears in KV `leads`.
- [ ] Its audit event appears in KV `lead_delivery_events` with `delivered: true`.
- [ ] Zapier and Salesforce handle the test as intended.
- [ ] If analytics changed, a test page view and CTA click appear in `/admin/analytics`.

## Rollback trigger

Rollback or pause paid traffic immediately if the public page is unavailable, the
lead API returns an error, KV does not record the lead, Zapier rejects the webhook,
or Salesforce misses a verified lead.
