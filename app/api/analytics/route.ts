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
const dayKey = (date: Date) => date.toISOString().slice(0, 10)

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

    const days = Math.min(Math.max(Number(body.days) || 7, 1), 30)
    const dates = Array.from({ length: days }, (_, index) => {
      const date = new Date()
      date.setUTCDate(date.getUTCDate() - (days - index - 1))
      return dayKey(date)
    })
    try {
      const response = await callKvPipeline(dates.map((date) => ['HGETALL', `analytics:${date}`]))
      if (!response) return NextResponse.json({ error: 'Analytics database is unavailable.' }, { status: 503 })

      const totals: Record<string, number> = {}
      const daily = dates.map((date, index) => {
        const values = asRecord(response[index]?.result)
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
      return NextResponse.json({
        days,
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
  const commands: unknown[][] = [
    ['HINCRBY', key, event === 'page_view' ? 'page_views' : 'cta_clicks', 1]
  ]
  if (event === 'page_view') commands.push(['HINCRBY', key, `page:${encodedPage}`, 1])
  if (event === 'cta_click') {
    commands.push(
      ['HINCRBY', key, `click_page:${encodedPage}`, 1],
      ['HINCRBY', key, `cta:${cleanName(body.ctaName)}`, 1],
      ['HINCRBY', key, `cta_page:${encodedPage}:${cleanName(body.ctaName)}`, 1],
      ['HINCRBY', key, `cta_${cleanType(body.ctaType)}`, 1]
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
