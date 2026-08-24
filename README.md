<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/291dc5d1-5021-4e04-807e-ec0114dbb8d7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Production lead configuration

Configure these server-only Vercel environment variables before deploying:

- `OCA_MAKEUP_LEADS_WEBHOOK_URL` — required primary Zapier webhook.
- `OCA_MENTAL_HEALTH_LEADS_WEBHOOK_URL` — optional Mental Health override.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` — required for durable lead and delivery-event audit records.
- `OCA_ADMIN_ACCESS_CODE` — a long, randomly generated value used to protect offer updates.

Keep Vercel Deployment Protection disabled for the public production landing-page
domain. Preview deployments can remain protected.

Lead acceptance is recorded in `leads`; webhook outcomes are recorded in
`lead_delivery_events`. A successful webhook response confirms that Zapier accepted
the lead, not that a downstream Salesforce action completed. Configure a Zapier
alert or callback for downstream failures and reconcile both records daily.

See [the infrastructure and operations guide](docs/infrastructure-and-operations.md)
for the full architecture, Zapier/Salesforce flow, offer administration,
analytics, recovery procedures, and safe production test procedures. The shorter
[lead operations runbook](docs/lead-operations.md) is for daily reconciliation.

See [delivery rules](CONTRIBUTING.md) and the [production release checklist](docs/release-checklist.md)
before merging or deploying changes.
