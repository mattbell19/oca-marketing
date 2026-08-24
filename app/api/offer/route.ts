import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import {
  getCampaignOffers,
  getCampaignOffersVersion,
  getCampaignOffersWithStatus,
  getLatestOfferBackup,
  saveCampaignOffersWithBackup
} from '../../../lib/offerDb'

const hasValidAccessCode = (providedCode: unknown) => {
  const configuredCode = process.env.OCA_ADMIN_ACCESS_CODE
  if (!configuredCode || typeof providedCode !== 'string') return false

  const provided = Buffer.from(providedCode)
  const configured = Buffer.from(configuredCode)
  return provided.length === configured.length && timingSafeEqual(provided, configured)
}

export async function GET(request: Request) {
  try {
    const config = await getCampaignOffers()
    if (new URL(request.url).searchParams.get('admin') === '1') {
      const result = await getCampaignOffersWithStatus()
      const backup = result.source === 'kv' ? await getLatestOfferBackup() : null
      return NextResponse.json({
        campaigns: result.campaigns,
        version: getCampaignOffersVersion(result.campaigns),
        storage: result.source,
        canRestore: Boolean(backup)
      })
    }
    return NextResponse.json(config)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to read campaigns.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { accessCode, campaignKey, bannerText, detailText, promoCode, discountText, endDate, endDateLabel, applyToAll, expectedVersion, restorePrevious } = body

    if (!process.env.OCA_ADMIN_ACCESS_CODE) {
      return NextResponse.json({ error: 'Offer admin is not configured.' }, { status: 503 })
    }

    if (!hasValidAccessCode(accessCode)) {
      return NextResponse.json({ error: 'Invalid access code.' }, { status: 401 })
    }

    const current = await getCampaignOffersWithStatus()
    if (current.source !== 'kv' && process.env.VERCEL) {
      return NextResponse.json({ error: 'Offer database is unavailable. Nothing was published.' }, { status: 503 })
    }

    const currentVersion = getCampaignOffersVersion(current.campaigns)
    if (expectedVersion && expectedVersion !== currentVersion) {
      return NextResponse.json({
        error: 'This offer was changed elsewhere. Reloaded values are required before publishing.',
        currentVersion
      }, { status: 409 })
    }

    if (restorePrevious === true) {
      const previousCampaigns = await getLatestOfferBackup()
      if (!previousCampaigns) {
        return NextResponse.json({ error: 'There is no previous published offer to restore.' }, { status: 404 })
      }
      const saveSuccess = await saveCampaignOffersWithBackup(previousCampaigns, current.campaigns)
      if (!saveSuccess) {
        return NextResponse.json({ error: 'Failed to restore the previous offer. Nothing was published.' }, { status: 500 })
      }
      return NextResponse.json({
        ok: true,
        restored: true,
        campaigns: previousCampaigns,
        version: getCampaignOffersVersion(previousCampaigns)
      })
    }

    const key = campaignKey || 'default'
    if (!['dog-grooming', 'mental-health-leads', 'makeup', 'business-bundle', 'social-media', 'horticulture', 'event-management-bundle', 'default'].includes(key)) {
      return NextResponse.json({ error: 'Invalid campaign key.' }, { status: 400 })
    }

    // Input Validation & Character Limits
    if (!bannerText || bannerText.trim().length > 60) {
      return NextResponse.json({ error: 'Banner text must be between 1 and 60 characters.' }, { status: 400 })
    }
    if (!detailText || detailText.trim().length > 180) {
      return NextResponse.json({ error: 'Detail text must be between 1 and 180 characters.' }, { status: 400 })
    }
    if (!promoCode || promoCode.trim().length > 20) {
      return NextResponse.json({ error: 'Promo code must be between 1 and 20 characters.' }, { status: 400 })
    }
    if (!discountText || discountText.trim().length > 10) {
      return NextResponse.json({ error: 'Discount text must be between 1 and 10 characters.' }, { status: 400 })
    }
    if (!endDate || isNaN(Date.parse(endDate))) {
      return NextResponse.json({ error: 'Please select a valid end date.' }, { status: 400 })
    }
    if (!endDateLabel || endDateLabel.trim().length > 40) {
      return NextResponse.json({ error: 'End date label must be between 1 and 40 characters.' }, { status: 400 })
    }

    // Sanitize values to remove any HTML tags
    const sanitize = (val: string) => val.replace(/<[^>]*>/g, '').trim()

    // Use the same snapshot used for the version check to avoid replacing a
    // colleague's newer changes with stale browser data.
    const campaigns = JSON.parse(JSON.stringify(current.campaigns))

    const sanitizedOffer = {
      bannerText: sanitize(bannerText),
      detailText: sanitize(detailText),
      promoCode: sanitize(promoCode),
      discountText: sanitize(discountText),
      endDate: new Date(endDate).toISOString(),
      endDateLabel: sanitize(endDateLabel)
    }

    if (applyToAll) {
      const keys = ['dog-grooming', 'mental-health-leads', 'makeup', 'business-bundle', 'social-media', 'horticulture', 'event-management-bundle', 'default']
      for (const k of keys) {
        let banner = sanitizedOffer.bannerText
        let detail = sanitizedOffer.detailText
        
        // Auto-adjust weekly price details for social-media ($25/week vs other courses' $15/week)
        if (k === 'social-media') {
          banner = banner.replace(/\$15\/Week/i, '$25/Week').replace(/\$15/g, '$25')
          detail = detail.replace(/\$15/g, '$25')
        } else {
          banner = banner.replace(/\$25\/Week/i, '$15/Week').replace(/\$25/g, '$15')
          detail = detail.replace(/\$25/g, '$15')
        }

        campaigns[k] = {
          ...sanitizedOffer,
          bannerText: banner,
          detailText: detail
        }
      }
    } else {
      campaigns[key] = sanitizedOffer
    }

    // Save back to DB / file
    const saveSuccess = await saveCampaignOffersWithBackup(campaigns, current.campaigns)
    if (!saveSuccess) {
      return NextResponse.json({ error: 'Failed to write campaign updates.' }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      campaignKey: key,
      offer: campaigns[key],
      version: getCampaignOffersVersion(campaigns)
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid request payload.' }, { status: 400 })
  }
}
