'use client'

import { FormEvent, useState } from 'react'
import { AlertCircle, BarChart3, CalendarDays, Filter, Lock, RefreshCw } from 'lucide-react'

type UtmOption = { value: string; count: number }

type Report = {
  days: number
  startDate: string
  endDate: string
  filters: { source: string; medium: string; campaign: string }
  utmOptions: { sources: UtmOption[]; mediums: UtmOption[]; campaigns: UtmOption[] }
  pageViews: number
  ctaClicks: number
  ctaRate: number
  checkoutClicks: number
  leadFormClicks: number
  bookingClicks: number
  daily: Array<{ date: string; pageViews: number; ctaClicks: number }>
  pages: Array<{ page: string; views: number; clicks: number; rate: number }>
  topCtas: Array<{ name: string; clicks: number }>
  pageCtas: Record<string, Array<{ name: string; clicks: number }>>
}

type Filters = {
  startDate: string
  endDate: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
}

const LANDING_PAGES = ['/makeup', '/mental-health-leads', '/criminology', '/criminology-leads', '/criminology-advertorial', '/criminology-advertorial-v2', '/dog-grooming', '/business-bundle', '/social-media', '/horticulture', '/event-management-bundle']

const utcDate = (daysAgo = 0) => {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - daysAgo)
  return date.toISOString().slice(0, 10)
}

const initialFilters: Filters = {
  startDate: utcDate(6),
  endDate: utcDate(),
  utmSource: '',
  utmMedium: '',
  utmCampaign: ''
}

const selectClassName = 'w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-[#1d3b56] outline-none focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20'

export default function AnalyticsPage() {
  const [code, setCode] = useState('')
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [report, setReport] = useState<Report | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async (event?: FormEvent, overrides?: Partial<Filters>) => {
    event?.preventDefault()
    const nextFilters = { ...filters, ...overrides }
    setFilters(nextFilters)
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'report', accessCode: code, ...nextFilters })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not load analytics.')
      setReport(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not load analytics.')
    } finally {
      setLoading(false)
    }
  }

  const setPreset = (days: number) => {
    void load(undefined, { startDate: utcDate(days - 1), endDate: utcDate() })
  }

  const clearUtmFilters = () => {
    void load(undefined, { utmSource: '', utmMedium: '', utmCampaign: '' })
  }

  if (!report) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f9fa] px-4">
        <form onSubmit={load} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-[#1d3b56]/5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4efe8] text-[#f38669]"><Lock /></div>
          <h1 className="mt-4 text-center text-2xl font-black text-[#1d3b56]">Campaign Analytics</h1>
          <p className="mt-2 text-center text-sm font-semibold text-gray-500">Live CTA and page-view data from the landing pages.</p>
          <input type="password" required value={code} onChange={(event) => setCode(event.target.value)} placeholder="Admin access code" className="mt-6 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3.5 text-sm outline-none" />
          {error && <p className="mt-3 flex gap-2 text-xs font-semibold text-red-700"><AlertCircle className="h-4 w-4" />{error}</p>}
          <button disabled={loading} className="mt-5 flex w-full justify-center rounded-xl bg-[#1d3b56] py-4 text-sm font-black uppercase tracking-wider text-white disabled:opacity-70">{loading ? 'Loading…' : 'View analytics'}</button>
        </form>
      </main>
    )
  }

  const cards = [
    ['Page views', report.pageViews],
    ['CTA clicks', report.ctaClicks],
    ['CTA click rate', `${report.ctaRate}%`],
    ['Checkout clicks', report.checkoutClicks],
    ['Info-pack clicks', report.leadFormClicks],
    ['Book-call clicks', report.bookingClicks]
  ]
  const pages = [...report.pages]
  for (const page of LANDING_PAGES) if (!pages.some((row) => row.page === page)) pages.push({ page, views: 0, clicks: 0, rate: 0 })
  pages.sort((a, b) => b.views - a.views || a.page.localeCompare(b.page))
  const activeUtmCount = Object.values(report.filters).filter(Boolean).length

  return (
    <main className="min-h-screen bg-[#f7f9fa] py-8 text-[#1d3b56]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#f38669]">Online Courses Australia</p>
            <h1 className="mt-1 text-3xl font-black">Campaign Analytics</h1>
            <p className="mt-1 text-sm font-semibold text-gray-500">{report.startDate} to {report.endDate} · {report.days} day{report.days === 1 ? '' : 's'}{activeUtmCount ? ` · ${activeUtmCount} UTM filter${activeUtmCount === 1 ? '' : 's'}` : ' · all traffic'}</p>
          </div>
          <button onClick={() => void load()} disabled={loading} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
        </div>

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-black"><Filter className="h-5 w-5 text-[#f38669]" />Report filters</h2>
              <p className="mt-1 text-xs font-semibold text-gray-500">Choose any date range up to 366 days, then optionally narrow results by UTM attribution.</p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90].map((days) => <button key={days} type="button" onClick={() => setPreset(days)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black hover:bg-[#d4efe8]">{days} days</button>)}
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500">Start date<input type="date" max={filters.endDate} value={filters.startDate} onChange={(event) => setFilters({ ...filters, startDate: event.target.value })} className={`${selectClassName} mt-2`} /></label>
            <label className="text-xs font-black uppercase tracking-wider text-gray-500">End date<input type="date" min={filters.startDate} max={utcDate()} value={filters.endDate} onChange={(event) => setFilters({ ...filters, endDate: event.target.value })} className={`${selectClassName} mt-2`} /></label>
            <UtmSelect label="UTM source" value={filters.utmSource} options={report.utmOptions.sources} onChange={(value) => setFilters({ ...filters, utmSource: value })} />
            <UtmSelect label="UTM medium" value={filters.utmMedium} options={report.utmOptions.mediums} onChange={(value) => setFilters({ ...filters, utmMedium: value })} />
            <UtmSelect label="UTM campaign" value={filters.utmCampaign} options={report.utmOptions.campaigns} onChange={(value) => setFilters({ ...filters, utmCampaign: value })} />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-gray-500">UTM-filtered reporting applies to visits collected from this release onward. Historical unfiltered totals remain available.</p>
            <div className="flex gap-2">
              <button type="button" onClick={clearUtmFilters} disabled={loading || !(filters.utmSource || filters.utmMedium || filters.utmCampaign)} className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-black disabled:opacity-40">Clear UTM</button>
              <button type="button" onClick={() => void load()} disabled={loading} className="rounded-xl bg-[#1d3b56] px-5 py-2.5 text-xs font-black text-white disabled:opacity-60">{loading ? 'Loading…' : 'Apply filters'}</button>
            </div>
          </div>
          {error && <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700"><AlertCircle className="h-4 w-4" />{error}</p>}
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([label, value]) => <div key={String(label)} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-gray-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6"><h2 className="flex items-center gap-2 text-lg font-black"><CalendarDays className="h-5 w-5 text-[#f38669]" />Daily performance</h2><p className="mt-1 text-xs font-semibold text-gray-500">Daily results within the selected date range, newest first.</p></div>
          <div className="max-h-[420px] overflow-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="sticky top-0 bg-slate-50 text-xs font-black uppercase tracking-wider text-gray-500"><tr><th className="px-6 py-3">Date</th><th className="px-4 py-3 text-right">Views</th><th className="px-4 py-3 text-right">CTA clicks</th><th className="px-6 py-3 text-right">CTA rate</th></tr></thead><tbody>{[...report.daily].reverse().map((row) => <tr key={row.date} className="border-t border-slate-100"><td className="px-6 py-3 font-bold">{row.date}</td><td className="px-4 py-3 text-right">{row.pageViews}</td><td className="px-4 py-3 text-right">{row.ctaClicks}</td><td className="px-6 py-3 text-right font-black text-[#f38669]">{row.pageViews ? ((row.ctaClicks / row.pageViews) * 100).toFixed(1) : '0.0'}%</td></tr>)}</tbody></table></div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6"><h2 className="flex items-center gap-2 text-lg font-black"><BarChart3 className="h-5 w-5 text-[#f38669]" />Every landing page</h2><p className="mt-1 text-xs font-semibold text-gray-500">Views, CTA click rate, and the best-performing CTA on each page.</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-gray-500"><tr><th className="px-6 py-3">Landing page</th><th className="px-4 py-3 text-right">Views</th><th className="px-4 py-3 text-right">CTA clicks</th><th className="px-4 py-3 text-right">CTA rate</th><th className="px-6 py-3">Top CTA</th></tr></thead><tbody>{pages.map((row) => { const top = report.pageCtas[row.page]?.[0]; return <tr key={row.page} className="border-t border-slate-100"><td className="px-6 py-4 font-bold">{row.page}</td><td className="px-4 py-4 text-right">{row.views}</td><td className="px-4 py-4 text-right">{row.clicks}</td><td className="px-4 py-4 text-right font-black text-[#f38669]">{row.rate}%</td><td className="px-6 py-4">{top ? `${top.name.replaceAll('_', ' ')} · ${top.clicks}` : '—'}</td></tr> })}</tbody></table></div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-lg font-black">Top CTAs across the site</h2><div className="mt-4 space-y-3">{report.topCtas.length ? report.topCtas.map((row) => <div key={row.name} className="flex justify-between border-b border-slate-100 pb-3 text-sm"><span className="font-bold">{row.name.replaceAll('_', ' ')}</span><span>{row.clicks} clicks</span></div>) : <p className="text-sm text-gray-500">No CTA clicks recorded for these filters.</p>}</div></section>
          <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-lg font-black">How to read this</h2><p className="mt-3 text-sm leading-relaxed text-gray-600">CTA rate is CTA clicks divided by page views. It measures visitor intent, not completed enrolments. Date and UTM filters apply to every card and table on this report.</p></section>
        </div>
      </div>
    </main>
  )
}

function UtmSelect({ label, value, options, onChange }: { label: string; value: string; options: UtmOption[]; onChange: (value: string) => void }) {
  return (
    <label className="text-xs font-black uppercase tracking-wider text-gray-500">{label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className={`${selectClassName} mt-2`}>
        <option value="">All</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.value} ({option.count})</option>)}
      </select>
    </label>
  )
}
