import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'offer.json')
const ACCESS_CODE = 'OCA-ADMIN-2026'

const defaultOffer = {
  bannerText: 'August Intake Special Offers Open',
  detailText: 'Study from just $15 per week on a flexible payment plan.',
  promoCode: 'SAVE100',
  discountText: '$100',
  endDate: '2026-08-06T23:59:59+10:00',
  endDateLabel: '6 August 2026'
}

const defaultCampaigns = {
  'dog-grooming': {
    bannerText: 'August Intake Sale Choose $300 Off Sitewide',
    detailText: 'August Intake Sale: Choose $300 off your course fees or study from just $15 per week.',
    promoCode: '300OFF',
    discountText: '$300',
    endDate: '2026-08-06T23:59:59+10:00',
    endDateLabel: '6 August 2026'
  },
  'mental-health-leads': {
    bannerText: 'August Intake Sale Free Laptop*',
    detailText: 'August Intake Sale: Choose a FREE laptop* when you pay upfront, or study from just $15 per week.',
    promoCode: 'LAPTOP',
    discountText: 'Laptop',
    endDate: '2026-08-06T23:59:59+10:00',
    endDateLabel: '6 August 2026'
  },
  'makeup': {
    bannerText: 'August Sale: Choose a FREE Laptop* or Study from $15/wk',
    detailText: 'August Sale: Choose a FREE laptop* when you pay upfront, or study from just $15 per week.',
    promoCode: 'LAPTOP',
    discountText: 'Laptop',
    endDate: '2026-08-06T23:59:59+10:00',
    endDateLabel: '6 August 2026'
  },
  'default': defaultOffer
}

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const config = JSON.parse(data)
    return NextResponse.json(config)
  } catch {
    return NextResponse.json(defaultCampaigns)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { accessCode, campaignKey, bannerText, detailText, promoCode, discountText, endDate, endDateLabel } = body

    if (accessCode !== ACCESS_CODE) {
      return NextResponse.json({ error: 'Invalid access code.' }, { status: 401 })
    }

    const key = campaignKey || 'default'
    if (!['dog-grooming', 'mental-health-leads', 'makeup', 'default'].includes(key)) {
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

    const newOffer = {
      bannerText: sanitize(bannerText),
      detailText: sanitize(detailText),
      promoCode: sanitize(promoCode),
      discountText: sanitize(discountText),
      endDate: new Date(endDate).toISOString(),
      endDateLabel: sanitize(endDateLabel)
    }

    let campaigns: Record<string, any> = { ...defaultCampaigns }
    try {
      const currentData = await fs.readFile(filePath, 'utf-8')
      campaigns = JSON.parse(currentData)
    } catch {
      // Use defaults if file doesn't exist
    }

    // Update specific key
    campaigns[key] = newOffer

    const dirPath = path.dirname(filePath)
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(campaigns, null, 2), 'utf-8')

    return NextResponse.json({ ok: true, campaignKey: key, offer: newOffer })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid request payload.' }, { status: 400 })
  }
}
