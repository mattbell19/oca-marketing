# OCA landing-page infrastructure and operations

This is the operating guide for the OCA paid-traffic landing pages. It explains what runs where, how a lead reaches Salesforce, how to make safe changes, and where to investigate a discrepancy.

## System map

```text
Meta / other paid traffic
        │
        ▼
Vercel-hosted Next.js landing pages
        │                         └─ GTM / Meta Pixel / Hyros
        ▼
/api/makeup-leads
        ├─ durable lead backup in Vercel KV / Upstash (`leads`)
        ├─ non-PII delivery audit (`lead_delivery_events`)
        ▼
Zapier Catch Hook
        ▼
Zapier Salesforce action(s)
        ▼
Salesforce lead record
```

Offer updates and on-site analytics use the same KV database, but are independent of lead delivery:

```text
/admin/offers → /api/offer → KV `offer` + rolling `offer_history`
Public pages → /api/analytics → daily KV analytics counters → /admin/analytics
```

## Services and responsibilities

| Service | Responsibility | Operational owner action |
| --- | --- | --- |
| Vercel | Hosts the Next.js site and server routes. A push to `main` creates a Production deployment. | Keep public landing-page deployments unprotected; use protection only for previews. |
| Vercel KV / Upstash Redis | Durable backup of accepted leads, webhook-delivery audit, offers, offer history, and aggregated analytics. | Do not rotate/delete keys without a migration and a backup. |
| Zapier | Receives the server-side lead webhook and runs the downstream Salesforce workflow. | Monitor task/run failures and alert on any failed Salesforce action. |
| Salesforce | System of record for sales follow-up. | Reconcile records to `lead_id`, source, and submission time. |
| Google Tag Manager | Receives `dataLayer` events for page and CTA activity. | Configure GTM/GA4 tags if GA4 reporting is also wanted. |
| Meta Pixel and Hyros | Existing marketing attribution scripts. | Do not count CTA clicks as Meta Leads; the app sends a Lead only after a successful lead submission. |

## Landing pages and offer campaigns

| Route | Offer campaign key | Lead source sent to Zapier |
| --- | --- | --- |
| `/makeup` | `makeup` | OCA Makeup Landing Page |
| `/mental-health-leads` | `mental-health-leads` | OCA Mental Health Landing Page |
| `/criminology`, `/criminology-leads`, `/criminology-advertorial`, `/criminology-advertorial-v2` | `default` | OCA Criminology Landing Page |
| `/dog-grooming` | `dog-grooming` | OCA Makeup Landing Page* |
| `/business-bundle` | `business-bundle` | OCA Business Landing Page |
| `/social-media` | `social-media` | OCA Social Media Landing Page |
| `/horticulture` | `horticulture` | OCA Horticulture Landing Page |
| `/event-management-bundle` | `event-management-bundle` | OCA Event Management Landing Page |

\*Dog Grooming currently falls back to the general primary lead source. If Salesforce needs a separate Dog Grooming source, add an explicit mapping and test the change end-to-end.

## Lead generation flow

All landing-page forms must submit to `POST /api/makeup-leads`. The API:

1. Validates required contact fields and rejects invalid email/phone values.
2. Generates a `lead_id`.
3. Writes the full accepted lead to KV before attempting delivery.
4. Sends it to Zapier using the configured server-side webhook and a 10-second timeout.
5. Writes a non-PII delivery audit record.
6. Returns success to the page only after Zapier accepts the request.

The payload includes `lead_id`, contact details, `course`, `form_title`, `source_page`, `lead_source`, `submitted_at`, and marketing consent. Do not remove `lead_id`, `lead_source`, `source_page`, or `submitted_at`: they are the reconciliation keys.

### Zapier configuration

- The trigger is a **Catch Hook** using `OCA_MAKEUP_LEADS_WEBHOOK_URL`.
- `OCA_MENTAL_HEALTH_LEADS_WEBHOOK_URL` is an optional dedicated hook for Mental Health; all other pages use the primary hook.
- The Zap should create/update the intended Salesforce record and retain `lead_id` in a Salesforce field or in its activity history where possible.
- Add a Zapier alert for failed runs and for Salesforce-action errors. The landing page can confirm only that Zapier accepted the webhook—not that Salesforce created a record.
- Treat a replay as an operational replay and prevent duplicates using `lead_id` where possible.

### Lead backup and reconciliation

KV keys:

| Key | Contents | Use |
| --- | --- | --- |
| `leads` | Full accepted lead payloads, including PII | Backup and recovery only; restrict access. |
| `lead_delivery_events` | `leadId`, source, timestamp, HTTP status, accepted/failure result | Diagnose webhook delivery without exposing PII in logs. |

Daily, compare Meta Lead events → KV `leads` → Zapier runs → Salesforce records. Investigate any gap using `lead_id` first.

## Offer administration

`/admin/offers` controls the campaign offer text, promo code, discount label, and deadline. It does not control layout, course copy, checkout URLs, form configuration, tracking, or SEO.

- Access is protected by `OCA_ADMIN_ACCESS_CODE`.
- Every publish saves the former configuration to KV before replacing it.
- The latest 20 prior versions are kept in `offer_history`.
- **Undo Last Publish** restores the prior version and preserves the current one as another backup.
- A stale editor cannot overwrite a newer save; it must reload first.
- “Apply to all” shows a confirmation because it changes all offer configurations.

If KV is unavailable, production publishing is blocked. Do not attempt to change offers by editing the deployed filesystem.

## Analytics

`/admin/analytics` is protected by the same admin access code. It stores aggregated, privacy-safe on-site analytics in KV and begins collecting from its deployment date; it does not backfill historic activity.

For each known landing page it shows:

- page views;
- CTA clicks;
- CTA click rate (`CTA clicks / page views × 100`);
- top CTA on that page;
- site-wide checkout, information-pack, and book-a-call intent.

The tracker records high-intent CTA interactions only. It does not store emails, phone numbers, form values, IP addresses, or URL query strings. New events are near-real-time; refresh the dashboard to see new aggregate data.

The site also pushes `cta_click` to GTM. See [CTA analytics](cta-analytics.md) for optional GA4 reporting; do not create two GA4 rules for the same data-layer event or clicks will be double-counted.

## Environment variables

Set these in Vercel **Production**. Adding/changing a variable requires a new deployment before it becomes available.

| Variable | Required | Purpose |
| --- | --- | --- |
| `OCA_MAKEUP_LEADS_WEBHOOK_URL` | Yes | Primary Zapier Catch Hook URL. |
| `OCA_MENTAL_HEALTH_LEADS_WEBHOOK_URL` | Optional | Mental Health-specific Zapier Catch Hook. |
| `KV_REST_API_URL` | Yes | KV / Upstash REST URL. |
| `KV_REST_API_TOKEN` | Yes | KV / Upstash REST token. |
| `OCA_ADMIN_ACCESS_CODE` | Yes for admin | Protects offer publishing and analytics reporting. |
| `GEMINI_API_KEY` | Only if an AI feature uses it | App-specific AI configuration; unrelated to lead capture. |

Never commit values, webhook URLs, tokens, or access codes. `.env.local` is local-only and `.env.example` contains placeholders only.

## Deploying safely

1. Keep code changes small and run `npm run lint`, `npx tsc --noEmit`, and `npm run build` locally.
2. Push to `main`; Vercel creates the Production deployment. There is deliberately no GitHub Actions workflow for this project.
3. Wait for the Vercel deployment to report success.
4. Confirm the public landing page returns `200`, not a Vercel SSO page.
5. If lead handling changed, submit one clearly labelled synthetic test lead and trace it through KV, Zapier, and Salesforce.
6. If analytics changed, load a landing page and click a test CTA, then refresh `/admin/analytics`.

## Incident playbook

### Meta shows more leads than Salesforce

1. Check the landing-page URL is public and not redirecting to Vercel authentication.
2. Inspect `leads` for the affected period and compare its count to Meta.
3. Match `lead_id` to `lead_delivery_events`.
4. If delivery failed, investigate the webhook/timeout; if delivery succeeded, inspect the Zapier run and Salesforce action.
5. Replay only verified missing leads and label the replay to avoid duplicates.

### Offer change went wrong

1. Open `/admin/offers`.
2. Use **Undo Last Publish**.
3. Confirm the affected landing page displays the expected offer.
4. If KV is unavailable, do not publish; restore service first.

### Analytics looks empty

1. Confirm the dashboard is accessed with the current production admin code.
2. Confirm the dashboard deployment occurred before the visit/click being checked.
3. Visit a public landing page, click a CTA, and refresh the dashboard.
4. If all pages remain at zero, check `KV_REST_API_URL` and `KV_REST_API_TOKEN` in the active Vercel Production deployment.

## Current limitations and planned safeguards

- The app does not receive a confirmation callback from Salesforce. It proves Zapier acceptance, not final Salesforce creation.
- Lead replay is a manual operational action; there is not yet an automatic retry queue.
- Analytics is aggregated operational data, not a replacement for GA4’s attribution and audience reports.
- The admin passcode is shared access. Use a proper identity provider or Vercel-protected admin access if multiple editors need individual accountability.
