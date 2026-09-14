import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const validAccessCode = (provided: unknown) => {
  const configured = process.env.OCA_ADMIN_ACCESS_CODE
  if (!configured || typeof provided !== 'string') return false
  const left = Buffer.from(provided)
  const right = Buffer.from(configured)
  return left.length === right.length && timingSafeEqual(left, right)
}

const kvConfig = () => ({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
})

const callKvPipeline = async (commands: unknown[][]) => {
  const { url, token } = kvConfig()
  if (!url || !token) return null
  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    next: { revalidate: 0 }
  })
  if (!response.ok) return null
  return response.json()
}

const cleanPath = (value: unknown) => typeof value === 'string' && /^\/[a-z0-9/_-]{0,119}$/i.test(value) ? value : ''
const cleanName = (value: unknown) => typeof value === 'string' && /^[a-z0-9_]{1,80}$/i.test(value) ? value : ''
const cleanType = (value: unknown) => ['checkout', 'lead_form', 'booking', 'other'].includes(String(value)) ? String(value) : 'other'
const cleanUtm = (value: unknown) => typeof value === 'string' ? value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 100) : ''
const dayKey = (date: Date) => date.toISOString().slice(0, 10)
const DIRECT = '(direct)'
const DAY_MS = 24 * 60 * 60 * 1000

const getDateRange = (body: Record<string, unknown>) => {
  const today = dayKey(new Date())
  const endDate = typeof body.endDate === 'string' ? body.endDate : today
  if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) return null
  const fallbackDays = Math.min(Math.max(Number(body.days) || 7, 1), 366)
  const fallbackStart = new Date(`${endDate}T00:00:00.000Z`)
  fallbackStart.setUTCDate(fallbackStart.getUTCDate() - (fallbackDays - 1))
  const startDate = typeof body.startDate === 'string' ? body.startDate : dayKey(fallbackStart)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) return null

  const start = new Date(`${startDate}T00:00:00.000Z`)
  const end = new Date(`${endDate}T00:00:00.000Z`)
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || dayKey(start) !== startDate || dayKey(end) !== endDate || start > end) return null
  const days = Math.floor((end.getTime() - start.getTime()) / DAY_MS) + 1
  if (days < 1 || days > 366) return null

  return {
    startDate,
    endDate,
    days,
    dates: Array.from({ length: days }, (_, index) => dayKey(new Date(start.getTime() + index * DAY_MS)))
  }
}

const decodeField = (value: string) => {
  try { return decodeURIComponent(value) } catch { return value }
}

const addCount = (record: Record<string, number>, key: string, count: number) => {
  record[key] = (record[key] || 0) + count
}

const asRecord = (value: unknown): Record<string, number> => {
  if (Array.isArray(value)) {
    const record: Record<string, number> = {}
    for (let index = 0; index < value.length; index += 2) record[String(value[index])] = Number(value[index + 1]) || 0
    return record
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, count]) => [key, Number(count) || 0]))
  }
  return {}
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid analytics payload.' }, { status: 400 })
  }

  if (body.action === 'report') {
    if (!process.env.OCA_ADMIN_ACCESS_CODE) return NextResponse.json({ error: 'Analytics admin is not configured.' }, { status: 503 })
    if (!validAccessCode(body.accessCode)) return NextResponse.json({ error: 'Invalid access code.' }, { status: 401 })

    const range = getDateRange(body)
    if (!range) return NextResponse.json({ error: 'Choose a valid date range of up to 366 days.' }, { status: 400 })
    const filters = {
      source: cleanUtm(body.utmSource),
      medium: cleanUtm(body.utmMedium),
      campaign: cleanUtm(body.utmCampaign)
    }
    const hasUtmFilter = Boolean(filters.source || filters.medium || filters.campaign)
    try {
      const response = await callKvPipeline(range.dates.map((date) => ['HGETALL', `analytics:${date}`]))
      if (!response) return NextResponse.json({ error: 'Analytics database is unavailable.' }, { status: 503 })

      const totals: Record<string, number> = {}
      const optionCounts = { sources: {} as Record<string, number>, mediums: {} as Record<string, number>, campaigns: {} as Record<string, number> }
      const daily = range.dates.map((date, index) => {
        const allValues = asRecord(response[index]?.result)
        for (const [key, count] of Object.entries(allValues)) {
          if (key.startsWith('utm_source:')) addCount(optionCounts.sources, decodeField(key.slice(11)), count)
          if (key.startsWith('utm_medium:')) addCount(optionCounts.mediums, decodeField(key.slice(11)), count)
          if (key.startsWith('utm_campaign:')) addCount(optionCounts.campaigns, decodeField(key.slice(13)), count)
        }

        const values = hasUtmFilter ? Object.entries(allValues).reduce<Record<string, number>>((selected, [key, count]) => {
          if (!key.startsWith('segment:')) return selected
          const [, encodedSource, encodedMedium, encodedCampaign, ...metricParts] = key.split(':')
          const source = decodeField(encodedSource)
          const medium = decodeField(encodedMedium)
          const campaign = decodeField(encodedCampaign)
          if ((filters.source && source !== filters.source) || (filters.medium && medium !== filters.medium) || (filters.campaign && campaign !== filters.campaign)) return selected
          addCount(selected, metricParts.join(':'), count)
          return selected
        }, {}) : allValues

        for (const [key, count] of Object.entries(values)) totals[key] = (totals[key] || 0) + count
        return { date, pageViews: values.page_views || 0, ctaClicks: values.cta_clicks || 0 }
      })
      const pages = Object.entries(totals).filter(([key]) => key.startsWith('page:')).map(([key, views]) => {
        const page = decodeURIComponent(key.slice(5))
        const clicks = totals[`click_page:${encodeURIComponent(page)}`] || 0
        return { page, views, clicks, rate: views ? Number(((clicks / views) * 100).toFixed(1)) : 0 }
      }).sort((a, b) => b.views - a.views).slice(0, 12)
      const topCtas = Object.entries(totals).filter(([key]) => key.startsWith('cta:')).map(([key, clicks]) => ({ name: key.slice(4), clicks }))
        .sort((a, b) => b.clicks - a.clicks).slice(0, 12)
      const pageCtas: Record<string, Array<{ name: string; clicks: number }>> = {}
      for (const [key, clicks] of Object.entries(totals)) {
        if (!key.startsWith('cta_page:')) continue
        const [, encodedPage, name] = key.split(':')
        if (!encodedPage || !name) continue
        const page = decodeURIComponent(encodedPage)
        pageCtas[page] = [...(pageCtas[page] || []), { name, clicks }]
      }
      for (const page of Object.keys(pageCtas)) pageCtas[page].sort((a, b) => b.clicks - a.clicks)

      const pageViews = totals.page_views || 0
      const ctaClicks = totals.cta_clicks || 0
      const toOptions = (values: Record<string, number>) => Object.entries(values)
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
      return NextResponse.json({
        days: range.days,
        startDate: range.startDate,
        endDate: range.endDate,
        filters,
        utmOptions: {
          sources: toOptions(optionCounts.sources),
          mediums: toOptions(optionCounts.mediums),
          campaigns: toOptions(optionCounts.campaigns)
        },
        pageViews,
        ctaClicks,
        ctaRate: pageViews ? Number(((ctaClicks / pageViews) * 100).toFixed(1)) : 0,
        checkoutClicks: totals.cta_checkout || 0,
        leadFormClicks: totals.cta_lead_form || 0,
        bookingClicks: totals.cta_booking || 0,
        daily,
        pages,
        topCtas,
        pageCtas
      })
    } catch {
      return NextResponse.json({ error: 'Analytics database is unavailable.' }, { status: 503 })
    }
  }

  const event = body.event
  const pagePath = cleanPath(body.pagePath)
  if ((event !== 'page_view' && event !== 'cta_click') || !pagePath) return NextResponse.json({ error: 'Invalid analytics event.' }, { status: 400 })
  if (event === 'cta_click' && !cleanName(body.ctaName)) return NextResponse.json({ error: 'Invalid CTA event.' }, { status: 400 })

  const key = `analytics:${dayKey(new Date())}`
  const encodedPage = encodeURIComponent(pagePath)
  const utmSource = cleanUtm(body.utmSource) || DIRECT
  const utmMedium = cleanUtm(body.utmMedium) || DIRECT
  const utmCampaign = cleanUtm(body.utmCampaign) || DIRECT
  const segmentPrefix = `segment:${encodeURIComponent(utmSource)}:${encodeURIComponent(utmMedium)}:${encodeURIComponent(utmCampaign)}`
  const commands: unknown[][] = [
    ['HINCRBY', key, event === 'page_view' ? 'page_views' : 'cta_clicks', 1],
    ['HINCRBY', key, `${segmentPrefix}:${event === 'page_view' ? 'page_views' : 'cta_clicks'}`, 1]
  ]
  if (event === 'page_view') commands.push(
    ['HINCRBY', key, `page:${encodedPage}`, 1],
    ['HINCRBY', key, `${segmentPrefix}:page:${encodedPage}`, 1],
    ['HINCRBY', key, `utm_source:${encodeURIComponent(utmSource)}`, 1],
    ['HINCRBY', key, `utm_medium:${encodeURIComponent(utmMedium)}`, 1],
    ['HINCRBY', key, `utm_campaign:${encodeURIComponent(utmCampaign)}`, 1]
  )
  if (event === 'cta_click') {
    const ctaName = cleanName(body.ctaName)
    const ctaType = cleanType(body.ctaType)
    commands.push(
      ['HINCRBY', key, `click_page:${encodedPage}`, 1],
      ['HINCRBY', key, `cta:${ctaName}`, 1],
      ['HINCRBY', key, `cta_page:${encodedPage}:${ctaName}`, 1],
      ['HINCRBY', key, `cta_${ctaType}`, 1],
      ['HINCRBY', key, `${segmentPrefix}:click_page:${encodedPage}`, 1],
      ['HINCRBY', key, `${segmentPrefix}:cta:${ctaName}`, 1],
      ['HINCRBY', key, `${segmentPrefix}:cta_page:${encodedPage}:${ctaName}`, 1],
      ['HINCRBY', key, `${segmentPrefix}:cta_${ctaType}`, 1]
    )
  }

  try {
    const result = await callKvPipeline(commands)
    if (!result) return NextResponse.json({ error: 'Analytics database is unavailable.' }, { status: 503 })
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Analytics database is unavailable.' }, { status: 503 })
  }
}
