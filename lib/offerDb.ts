import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'offer.json')

export type OfferConfig = {
  bannerText: string
  detailText: string
  promoCode: string
  discountText: string
  endDate: string
  endDateLabel: string
}

export type CampaignsConfig = Record<string, OfferConfig>

const defaultOffer: OfferConfig = {
  bannerText: 'August Intake Special Offers Open',
  detailText: 'Study from just $15 per week on a flexible payment plan.',
  promoCode: 'SAVE100',
  discountText: '$100',
  endDate: '2026-08-06T23:59:59+10:00',
  endDateLabel: '6 August 2026'
}

const defaultCampaigns: CampaignsConfig = {
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
  'business-bundle': {
    bannerText: 'August Intake Sale: 50% Off Course Fees',
    detailText: 'August Intake Sale: Get 50% off the course fee or study from just $15 per week.',
    promoCode: 'FIRST300',
    discountText: '50%',
    endDate: '2026-08-16T23:59:59+10:00',
    endDateLabel: '16 August 2026'
  },
  'default': defaultOffer
}

export async function getCampaignOffers(): Promise<CampaignsConfig> {
  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN

  if (kvUrl && kvToken) {
    try {
      const response = await fetch(kvUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['GET', 'offer']),
        next: { revalidate: 0 } // Bypass Next.js fetch cache
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.result) {
          const parsed = JSON.parse(data.result)
          if (parsed && typeof parsed === 'object') {
            return parsed as CampaignsConfig
          }
        }
      }
    } catch (err) {
      console.error('Error fetching campaigns from Vercel KV:', err)
    }
  }

  // Fallback to local file
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data) as CampaignsConfig
  } catch {
    return defaultCampaigns
  }
}

export async function saveCampaignOffers(campaigns: CampaignsConfig): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN

  if (kvUrl && kvToken) {
    try {
      const response = await fetch(kvUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['SET', 'offer', JSON.stringify(campaigns)])
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.result === 'OK') {
          return true
        }
      }
    } catch (err) {
      console.error('Error saving campaigns to Vercel KV:', err)
    }
  }

  // Fallback: write to local file (fails in read-only environment, but works in dev)
  try {
    const dirPath = path.dirname(filePath)
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(campaigns, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Error saving campaigns to local file system:', err)
    return false
  }
}
