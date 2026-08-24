import fs from 'fs/promises'
import path from 'path'
import { createHash } from 'node:crypto'

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

export type OfferStorageSource = 'kv' | 'file' | 'defaults'

export type CampaignOffersResult = {
  campaigns: CampaignsConfig
  source: OfferStorageSource
}

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

const cloneCampaigns = (campaigns: CampaignsConfig): CampaignsConfig => JSON.parse(JSON.stringify(campaigns))

const withDefaults = (campaigns: CampaignsConfig): CampaignsConfig => ({
  ...cloneCampaigns(defaultCampaigns),
  ...campaigns
})

export const getCampaignOffersVersion = (campaigns: CampaignsConfig) =>
  createHash('sha256').update(JSON.stringify(Object.keys(campaigns).sort().map((key) => [key, campaigns[key]]))).digest('hex')

export async function getCampaignOffersWithStatus(): Promise<CampaignOffersResult> {
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
            return { campaigns: withDefaults(parsed as CampaignsConfig), source: 'kv' }
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
    return { campaigns: withDefaults(JSON.parse(data) as CampaignsConfig), source: 'file' }
  } catch {
    return { campaigns: cloneCampaigns(defaultCampaigns), source: 'defaults' }
  }
}

export async function getCampaignOffers(): Promise<CampaignsConfig> {
  return (await getCampaignOffersWithStatus()).campaigns
}

async function executeKv(command: unknown[]): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!kvUrl || !kvToken) return false

  try {
    const response = await fetch(kvUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kvToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(command)
    })
    const data = await response.json()
    return response.ok && data?.result !== undefined
  } catch (err) {
    console.error('Error writing campaign offers to KV:', err)
    return false
  }
}

export async function saveCampaignOffers(campaigns: CampaignsConfig): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (kvUrl && kvToken) {
    return executeKv(['SET', 'offer', JSON.stringify(campaigns)])
  }

  // Vercel files are not durable between invocations. Never report a live save as
  // successful unless it reached KV.
  if (process.env.VERCEL) return false

  // Local fallback is useful for development only.
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

export async function saveCampaignOffersWithBackup(nextCampaigns: CampaignsConfig, currentCampaigns: CampaignsConfig): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (kvUrl && kvToken) {
    const backup = JSON.stringify({ campaigns: currentCampaigns, savedAt: new Date().toISOString() })
    const backedUp = await executeKv(['LPUSH', 'offer_history', backup])
    if (!backedUp) return false

    // Keep a short, rolling set of recoverable versions. The current offer is
    // always stored before it is replaced.
    await executeKv(['LTRIM', 'offer_history', 0, 19])
    return executeKv(['SET', 'offer', JSON.stringify(nextCampaigns)])
  }

  return saveCampaignOffers(nextCampaigns)
}

export async function getLatestOfferBackup(): Promise<CampaignsConfig | null> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!kvUrl || !kvToken) return null

  try {
    const response = await fetch(kvUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kvToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['LINDEX', 'offer_history', 0]),
      next: { revalidate: 0 }
    })
    const data = await response.json()
    if (!response.ok || !data?.result) return null
    const backup = JSON.parse(data.result)
    return backup?.campaigns && typeof backup.campaigns === 'object'
      ? withDefaults(backup.campaigns as CampaignsConfig)
      : null
  } catch (err) {
    console.error('Error reading offer backup from KV:', err)
    return null
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
