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
  bannerText: 'Choose $500 OFF or $15/Week. Sale Ends 20 Aug',
  detailText: 'August Intake Sale: Choose $500 off any course OR study from just $15 per week.',
  promoCode: 'SAVEBIG',
  discountText: '$500',
  endDate: '2026-08-20T13:59:00.000Z',
  endDateLabel: '20 August 2026'
}

const defaultCampaigns: CampaignsConfig = {
  'dog-grooming': {
    bannerText: 'Choose $500 OFF or $15/Week. Sale Ends 20 Aug',
    detailText: 'August Intake Sale: Choose $500 off any course OR study from just $15 per week.',
    promoCode: 'SAVEBIG',
    discountText: '$500',
    endDate: '2026-08-20T13:59:00.000Z',
    endDateLabel: '20 August 2026'
  },
  'mental-health-leads': {
    bannerText: 'Choose $500 OFF or $15/Week. Sale Ends 20 Aug',
    detailText: 'August Intake Sale: Choose $500 off any course OR study from just $15 per week.',
    promoCode: 'SAVEBIG',
    discountText: '$500',
    endDate: '2026-08-20T13:59:00.000Z',
    endDateLabel: '20 August 2026'
  },
  'makeup': {
    bannerText: 'Choose $500 OFF or $15/Week. Sale Ends 20 Aug',
    detailText: 'August Intake Sale: Choose $500 off any course OR study from just $15 per week.',
    promoCode: 'SAVEBIG',
    discountText: '$500',
    endDate: '2026-08-20T13:59:00.000Z',
    endDateLabel: '20 August 2026'
  },
  'business-bundle': {
    bannerText: 'Choose $500 OFF or $15/Week. Sale Ends 20 Aug',
    detailText: 'August Intake Sale: Choose $500 off any course OR study from just $15 per week.',
    promoCode: 'SAVEBIG',
    discountText: '$500',
    endDate: '2026-08-20T13:59:00.000Z',
    endDateLabel: '20 August 2026'
  },
  'social-media': {
    bannerText: 'Choose $500 OFF or $25/Week. Sale Ends 20 Aug',
    detailText: 'August Intake Sale: Choose $500 off any course OR study from just $25 per week.',
    promoCode: 'SAVEBIG',
    discountText: '$500',
    endDate: '2026-08-20T13:59:00.000Z',
    endDateLabel: '20 August 2026'
  },
  'horticulture': {
    bannerText: 'Choose $500 OFF or $15/Week. Sale Ends 20 Aug',
    detailText: 'August Intake Sale: Choose $500 off any course OR study from just $15 per week.',
    promoCode: 'SAVEBIG',
    discountText: '$500',
    endDate: '2026-08-20T13:59:00.000Z',
    endDateLabel: '20 August 2026'
  },
  'event-management-bundle': {
    bannerText: 'Choose $500 OFF or $15/Week. Sale Ends 20 Aug',
    detailText: 'August Intake Sale: Choose $500 off any course OR study from just $15 per week.',
    promoCode: 'SAVEBIG',
    discountText: '$500',
    endDate: '2026-08-20T13:59:00.000Z',
    endDateLabel: '20 August 2026'
  },
  'default': defaultOffer
}

export async function getCampaignOffers(): Promise<CampaignsConfig> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

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
            return { ...defaultCampaigns, ...parsed } as CampaignsConfig
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
    return { ...defaultCampaigns, ...JSON.parse(data) } as CampaignsConfig
  } catch {
    return defaultCampaigns
  }
}

export async function saveCampaignOffers(campaigns: CampaignsConfig): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

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

export async function saveLeadToDb(lead: any): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (kvUrl && kvToken) {
    try {
      const response = await fetch(kvUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['RPUSH', 'leads', JSON.stringify(lead)])
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.result !== undefined) {
          return true
        }
      }
    } catch (err) {
      console.error('Error saving lead to Vercel KV:', err)
    }
  }

  // Fallback: write to local file data/leads.json
  try {
    const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json')
    let leads: any[] = []
    try {
      const existing = await fs.readFile(leadsFilePath, 'utf-8')
      leads = JSON.parse(existing)
    } catch {}
    leads.push(lead)
    await fs.mkdir(path.dirname(leadsFilePath), { recursive: true })
    await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Error saving lead to local backup:', err)
    return false
  }
}

type LeadDeliveryEvent = {
  leadId: string
  leadSource: string
  delivered: boolean
  occurredAt: string
  statusCode?: number
  error?: string
}

// Store delivery outcomes separately from lead data. This lets operations reconcile
// accepted landing-page leads with webhook/Salesforce outcomes without exposing PII
// in application logs.
export async function recordLeadDeliveryEvent(event: LeadDeliveryEvent): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (!kvUrl || !kvToken) {
    console.error('Lead delivery event was not persisted because KV is not configured.')
    return false
  }

  try {
    const response = await fetch(kvUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['RPUSH', 'lead_delivery_events', JSON.stringify(event)])
    })

    const data = await response.json()
    return response.ok && data?.result !== undefined
  } catch (err) {
    console.error('Error saving lead delivery event:', err)
    return false
  }
}

export async function isLeadRateAllowed(key: string, maxRequests = 10, windowSeconds = 600): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  // Never turn an upstream KV outage into lost legitimate leads. The webhook
  // delivery audit will still make the outage observable.
  if (!kvUrl || !kvToken) return true

  try {
    const incrementResponse = await fetch(kvUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['INCR', key])
    })
    const incrementData = await incrementResponse.json()
    const requestCount = Number(incrementData?.result)

    if (!incrementResponse.ok || !Number.isFinite(requestCount)) return true

    if (requestCount === 1) {
      await fetch(kvUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['EXPIRE', key, windowSeconds])
      })
    }

    return requestCount <= maxRequests
  } catch (err) {
    console.error('Lead rate limit check failed:', err)
    return true
  }
}
