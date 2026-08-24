'use client'

import { FormEvent, useState } from 'react'
import { AlertCircle, BarChart3, Lock, RefreshCw } from 'lucide-react'

type Report = {
  days: number
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

const LANDING_PAGES = ['/makeup', '/mental-health-leads', '/criminology', '/criminology-leads', '/criminology-advertorial', '/criminology-advertorial-v2', '/dog-grooming', '/business-bundle', '/social-media', '/horticulture', '/event-management-bundle']

export default function AnalyticsPage() {
  const [code, setCode] = useState('')
  const [report, setReport] = useState<Report | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async (event?: FormEvent) => {
    event?.preventDefault()
    setLoading(true); setError('')
    try {
      const response = await fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'report', accessCode: code, days: 7 }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not load analytics.')
      setReport(data)
    } catch (err: any) {
      setError(err.message || 'Could not load analytics.')
    } finally { setLoading(false) }
  }

  if (!report) return <main className="flex min-h-screen items-center justify-center bg-[#f7f9fa] px-4"><form onSubmit={load} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-[#1d3b56]/5"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4efe8] text-[#f38669]"><Lock /></div><h1 className="mt-4 text-center text-2xl font-black text-[#1d3b56]">Campaign Analytics</h1><p className="mt-2 text-center text-sm font-semibold text-gray-500">Live CTA and page-view data from the landing pages.</p><input type="password" required value={code} onChange={(e) => setCode(e.target.value)} placeholder="Admin access code" className="mt-6 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3.5 text-sm outline-none" />{error && <p className="mt-3 flex gap-2 text-xs font-semibold text-red-700"><AlertCircle className="h-4 w-4" />{error}</p>}<button disabled={loading} className="mt-5 flex w-full justify-center rounded-xl bg-[#1d3b56] py-4 text-sm font-black uppercase tracking-wider text-white disabled:opacity-70">{loading ? 'Loading…' : 'View analytics'}</button></form></main>

  const cards = [['Page views', report.pageViews], ['CTA clicks', report.ctaClicks], ['CTA click rate', `${report.ctaRate}%`], ['Checkout clicks', report.checkoutClicks], ['Info-pack clicks', report.leadFormClicks], ['Book-call clicks', report.bookingClicks]]
  const pages = [...report.pages]
  for (const page of LANDING_PAGES) if (!pages.some((row) => row.page === page)) pages.push({ page, views: 0, clicks: 0, rate: 0 })
  pages.sort((a, b) => b.views - a.views || a.page.localeCompare(b.page))
  return <main className="min-h-screen bg-[#f7f9fa] py-8 text-[#1d3b56]"><div className="mx-auto max-w-6xl px-4"><div className="flex items-center justify-between border-b border-gray-200 pb-6"><div><p className="text-xs font-black uppercase tracking-widest text-[#f38669]">Online Courses Australia</p><h1 className="mt-1 text-3xl font-black">Campaign Analytics</h1><p className="mt-1 text-sm font-semibold text-gray-500">Last 7 days · live site data</p></div><button onClick={() => load()} disabled={loading} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold"><RefreshCw className="h-4 w-4" />Refresh</button></div>{error && <p className="mt-5 text-sm font-semibold text-red-700">{error}</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards.map(([label, value]) => <div key={String(label)} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-gray-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}</div><section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm"><div className="border-b border-slate-100 p-6"><h2 className="flex items-center gap-2 text-lg font-black"><BarChart3 className="h-5 w-5 text-[#f38669]" />Every landing page</h2><p className="mt-1 text-xs font-semibold text-gray-500">Views, CTA click rate, and the best-performing CTA on each page.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs font-black uppercase tracking-wider text-gray-500"><tr><th className="px-6 py-3">Landing page</th><th className="px-4 py-3 text-right">Views</th><th className="px-4 py-3 text-right">CTA clicks</th><th className="px-4 py-3 text-right">CTA rate</th><th className="px-6 py-3">Top CTA</th></tr></thead><tbody>{pages.map((row) => { const top = report.pageCtas[row.page]?.[0]; return <tr key={row.page} className="border-t border-slate-100"><td className="px-6 py-4 font-bold">{row.page}</td><td className="px-4 py-4 text-right">{row.views}</td><td className="px-4 py-4 text-right">{row.clicks}</td><td className="px-4 py-4 text-right font-black text-[#f38669]">{row.rate}%</td><td className="px-6 py-4">{top ? `${top.name.replaceAll('_', ' ')} · ${top.clicks}` : '—'}</td></tr> })}</tbody></table></div></section><div className="mt-6 grid gap-6 lg:grid-cols-2"><section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-lg font-black">Top CTAs across the site</h2><div className="mt-4 space-y-3">{report.topCtas.length ? report.topCtas.map((row) => <div key={row.name} className="flex justify-between border-b border-slate-100 pb-3 text-sm"><span className="font-bold">{row.name.replaceAll('_', ' ')}</span><span>{row.clicks} clicks</span></div>) : <p className="text-sm text-gray-500">No CTA clicks recorded yet.</p>}</div></section><section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-lg font-black">How to read this</h2><p className="mt-3 text-sm leading-relaxed text-gray-600">CTA rate is CTA clicks divided by page views. It measures visitor intent, not completed enrolments. Use the top CTA column to see the best button on each landing page.</p></section></div></div></main>
}
