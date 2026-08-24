'use client'

import { useEffect } from 'react'

type TrackingWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
}

const CTA_TEXT = /\b(enrol|enroll|buy now|get (?:my |the )?(?:free )?(?:course )?(?:info|guide|pack)|info pack|apply now|start now|book (?:a )?call|call now|view pricing)\b/i

const CTA_DESTINATION = /(checkout|enrol|lead-form|bottom-form|info-pack|calendly|book)/i

const slugify = (value: string) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '_')
  .replace(/^_+|_+$/g, '')
  .slice(0, 80)

const getCtaType = (href: string, label: string) => {
  const value = `${href} ${label}`.toLowerCase()
  if (/checkout|enrol|enroll|buy now|pricing/.test(value)) return 'checkout'
  if (/lead-form|bottom-form|info pack|course guide|apply now/.test(value)) return 'lead_form'
  if (/calendly|book.*call|call now/.test(value)) return 'booking'
  return 'other'
}

// Captures high-intent CTA interactions in one place. Individual links can opt
// into an exact name later with data-cta="header_enrol", without changing this
// shared tracking behaviour.
export default function CtaClickTracker() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const element = target?.closest<HTMLElement>('a, button, [data-cta]')
      if (!element || element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true') return

      const anchor = element instanceof HTMLAnchorElement ? element : element.closest('a')
      const href = anchor?.getAttribute('href') || ''
      const label = (element.dataset.cta || element.getAttribute('aria-label') || element.textContent || '').replace(/\s+/g, ' ').trim()
      const isTracked = Boolean(element.dataset.cta) || CTA_TEXT.test(label) || CTA_DESTINATION.test(href)
      if (!isTracked || !label) return

      const section = element.closest('section[id], header[id], footer[id]')?.id || 'page'
      const destination = href
        ? (() => {
            try {
              const url = new URL(href, window.location.origin)
              return url.origin === window.location.origin ? `${url.pathname}${url.hash}` : `${url.hostname}${url.pathname}`
            } catch {
              return href.slice(0, 120)
            }
          })()
        : 'form_or_modal'

      const trackingWindow = window as TrackingWindow
      trackingWindow.dataLayer = trackingWindow.dataLayer || []
      trackingWindow.dataLayer.push({
        event: 'cta_click',
        cta_name: slugify(element.dataset.cta || label) || 'unnamed_cta',
        cta_label: label.slice(0, 120),
        cta_type: getCtaType(href, label),
        cta_location: section,
        page_path: window.location.pathname,
        destination
      })
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
