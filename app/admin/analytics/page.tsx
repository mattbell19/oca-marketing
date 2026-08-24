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
}

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
  return <main className="min-h-screen bg-[#f7f9fa] py-8 text-[#1d3b56]"><div className="mx-auto max-w-6xl px-4"><div className="flex items-center justify-between border-b border-gray-200 pb-6"><div><p className="text-xs font-black uppercase tracking-widest text-[#f38669]">Online Courses Australia</p><h1 className="mt-1 text-3xl font-black">Campaign Analytics</h1><p className="mt-1 text-sm font-semibold text-gray-500">Last 7 days · live site data</p></div><button onClick={() => load()} disabled={loading} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold"><RefreshCw className="h-4 w-4" />Refresh</button></div>{error && <p className="mt-5 text-sm font-semibold text-red-700">{error}</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards.map(([label, value]) => <div key={String(label)} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-gray-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-2"><section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="flex items-center gap-2 text-lg font-black"><BarChart3 className="h-5 w-5 text-[#f38669]" />Page performance</h2><div className="mt-4 space-y-3">{report.pages.length ? report.pages.map((row) => <div key={row.page} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm"><span className="font-bold">{row.page}</span><span>{row.clicks}/{row.views} clicks <strong className="ml-2 text-[#f38669]">{row.rate}%</strong></span></div>) : <p className="text-sm text-gray-500">No visits recorded yet.</p>}</div></section><section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-lg font-black">Top CTAs</h2><div className="mt-4 space-y-3">{report.topCtas.length ? report.topCtas.map((row) => <div key={row.name} className="flex justify-between border-b border-slate-100 pb-3 text-sm"><span className="font-bold">{row.name.replaceAll('_', ' ')}</span><span>{row.clicks} clicks</span></div>) : <p className="text-sm text-gray-500">No CTA clicks recorded yet.</p>}</div></section></div></div></main>
}
