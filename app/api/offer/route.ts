import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'offer.json')
const ACCESS_CODE = 'OCA-ADMIN-2026'

const defaultOffer = {
  bannerText: 'July Intake Closing 50% Off Sitewide',
  detailText: 'Our Last 100 Sale is on now. Enrol today to get 50% off all course fees, limited to the first 100 students only.',
  promoCode: 'LAST100',
  discountText: '50%',
  endDate: '2026-07-30T23:59:59+10:00',
  endDateLabel: '30 July 2026'
}

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const config = JSON.parse(data)
    return NextResponse.json(config)
  } catch {
    return NextResponse.json(defaultOffer)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { accessCode, bannerText, detailText, promoCode, discountText, endDate, endDateLabel } = body

    if (accessCode !== ACCESS_CODE) {
      return NextResponse.json({ error: 'Invalid access code.' }, { status: 401 })
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

    const dirPath = path.dirname(filePath)
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(newOffer, null, 2), 'utf-8')

    return NextResponse.json({ ok: true, offer: newOffer })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid request payload.' }, { status: 400 })
  }
}
