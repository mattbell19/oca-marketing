# CTA analytics

The site pushes a privacy-safe `cta_click` event to the existing Google Tag Manager data layer whenever a visitor clicks a high-intent CTA. It does not include form values, email addresses, phone numbers, or URL query strings.

Each event includes:

- `cta_name` and `cta_label`
- `cta_type` (`checkout`, `lead_form`, `booking`, or `other`)
- `cta_location` (the nearest page section)
- `page_path`
- `destination` (domain/path only)

## One-time GTM setup

1. In GTM container `GTM-MWWLSQ`, create a Custom Event trigger with event name `cta_click`.
2. Attach it to a GA4 Event tag with event name `cta_click`.
3. Add data-layer variables for the five fields above and send them as GA4 event parameters.
4. Publish the GTM container and use Preview mode to click a CTA. Confirm one `cta_click` event appears per click.

Do not also create a second GA4 trigger from the same event: that would double-count clicks.

## Reporting click-through rate

In GA4 Explore, use `page_path` and `cta_name` as dimensions, with `Event count` filtered to `cta_click`. Compare it with `Views` for the same page and period:

`CTA click-through rate = cta_click event count / page views × 100`

For checkout intent, filter `cta_type` to `checkout`; for information-pack intent, filter it to `lead_form`. Exact CTA names can be added later with `data-cta="descriptive_name"` on a link or button.
