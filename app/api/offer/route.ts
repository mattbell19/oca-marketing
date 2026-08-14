import { NextResponse } from 'next/server'
import { getCampaignOffers, saveCampaignOffers } from '../../../lib/offerDb'

const ACCESS_CODE = 'OCA-ADMIN-2026'

export async function GET() {
  try {
    const config = await getCampaignOffers()
    return NextResponse.json(config)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to read campaigns.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { accessCode, campaignKey, bannerText, detailText, promoCode, discountText, endDate, endDateLabel, applyToAll } = body

    if (accessCode !== ACCESS_CODE) {
      return NextResponse.json({ error: 'Invalid access code.' }, { status: 401 })
    }

    const key = campaignKey || 'default'
    if (!['dog-grooming', 'mental-health-leads', 'makeup', 'business-bundle', 'social-media', 'default'].includes(key)) {
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

    // Get current config
    const campaigns = await getCampaignOffers()

    const sanitizedOffer = {
      bannerText: sanitize(bannerText),
      detailText: sanitize(detailText),
      promoCode: sanitize(promoCode),
      discountText: sanitize(discountText),
      endDate: new Date(endDate).toISOString(),
      endDateLabel: sanitize(endDateLabel)
    }

    if (applyToAll) {
      const keys = ['dog-grooming', 'mental-health-leads', 'makeup', 'business-bundle', 'social-media', 'default']
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
    const saveSuccess = await saveCampaignOffers(campaigns)
    if (!saveSuccess) {
      return NextResponse.json({ error: 'Failed to write campaign updates.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, campaignKey: key, offer: campaigns[key] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid request payload.' }, { status: 400 })
  }
}
