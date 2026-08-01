'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, Star, Lock, CheckCircle2, AlertCircle } from 'lucide-react'

type OfferConfig = {
  bannerText: string
  detailText: string
  promoCode: string
  discountText: string
  endDate: string
  endDateLabel: string
}

type CampaignsData = {
  [key: string]: OfferConfig
}

export default function AdminOffersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Campaign configurations mapping
  const [campaigns, setCampaigns] = useState<CampaignsData>({})
  const [selectedCampaign, setSelectedCampaign] = useState<string>('default')

  const [form, setForm] = useState<OfferConfig>({
    bannerText: '',
    detailText: '',
    promoCode: '',
    discountText: '',
    endDate: '',
    endDateLabel: ''
  })

  // Load current values
  useEffect(() => {
    fetch('/api/offer')
      .then((res) => res.json())
      .then((data: CampaignsData) => {
        if (data) {
          setCampaigns(data)
          // Set initial form values based on selected campaign
          const activeCampaign = data[selectedCampaign] || data['default']
          if (activeCampaign) {
            const formattedDate = activeCampaign.endDate ? new Date(activeCampaign.endDate).toISOString().slice(0, 16) : ''
            setForm({
              ...activeCampaign,
              endDate: formattedDate
            })
          }
        }
      })
      .catch(() => {})
  }, [selectedCampaign])

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value
    setSelectedCampaign(key)
    setError('')
    setSuccess('')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === 'OCA-ADMIN-2026') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid access code. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode,
          campaignKey: selectedCampaign,
          ...form
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update offer.')
      }

      setSuccess(`Offer settings for "${selectedCampaign}" published successfully! Changes are live.`)
      
      // Update local state
      setCampaigns(prev => ({
        ...prev,
        [selectedCampaign]: result.offer
      }))
    } catch (err: any) {
      setError(err.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fa] px-4">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-[#1d3b56]/5">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4efe8] text-[#f38669]">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-[#1d3b56]">Admin Portal</h1>
            <p className="mt-2 text-sm font-semibold text-gray-500">
              Please enter the access code to configure landing page offers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="code" className="block text-xs font-black uppercase tracking-wider text-[#1d3b56]/70">
                Access Code
              </label>
              <input
                id="code"
                type="password"
                placeholder="Enter access code *"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d3b56] py-4 text-sm font-black uppercase tracking-wider text-white shadow-md transition hover:bg-[#f38669]"
            >
              Verify & Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f9fa] py-8 text-[#1d3b56]">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Online Courses Australia</span>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-[#1d3b56] md:text-4xl">
              Campaign Offer Settings
            </h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold transition hover:bg-slate-50"
          >
            Logout Portal
          </button>
        </div>

        {/* Campaign Selector Banner */}
        <div className="mt-6 rounded-2xl bg-[#d4efe8] p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#1d3b56]">Select Landing Page</h3>
              <p className="text-xs font-semibold text-gray-600">Choose which campaign offer you want to modify.</p>
            </div>
            <select
              value={selectedCampaign}
              onChange={handleCampaignChange}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black outline-none shadow-sm focus:ring-2 focus:ring-[#a6d5c7]/50"
            >
              <option value="default">Default Campaign (General LP)</option>
              <option value="dog-grooming">Dog Grooming Page (/dog-grooming)</option>
              <option value="mental-health-leads">Mental Health Leads Page (/mental-health-leads)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Form Config */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-black tracking-tight">Configure Active Offer</h2>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                Updating campaign parameters for: <strong className="text-[#f38669] uppercase font-mono">{selectedCampaign}</strong>
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider text-[#1d3b56]/70">
                    <label htmlFor="bannerText">Top Banner Text</label>
                    <span className={form.bannerText.length > 60 ? 'text-red-600' : 'text-gray-400'}>
                      {form.bannerText.length}/60
                    </span>
                  </div>
                  <input
                    id="bannerText"
                    name="bannerText"
                    type="text"
                    maxLength={60}
                    value={form.bannerText}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20 font-bold"
                    placeholder="e.g. August Intake Sale Choose $300 Off Sitewide *"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider text-[#1d3b56]/70">
                    <label htmlFor="detailText">Detail Paragraph Text</label>
                    <span className={form.detailText.length > 180 ? 'text-red-600' : 'text-gray-400'}>
                      {form.detailText.length}/180
                    </span>
                  </div>
                  <textarea
                    id="detailText"
                    name="detailText"
                    maxLength={180}
                    rows={3}
                    value={form.detailText}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20 font-medium"
                    placeholder="e.g. Choose $300 off your course fees or study from just $15 per week. *"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider text-[#1d3b56]/70">
                      <label htmlFor="promoCode">Promo Code</label>
                      <span className={form.promoCode.length > 20 ? 'text-red-600' : 'text-gray-400'}>
                        {form.promoCode.length}/20
                      </span>
                    </div>
                    <input
                      id="promoCode"
                      name="promoCode"
                      type="text"
                      maxLength={20}
                      value={form.promoCode}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20 font-mono font-bold uppercase"
                      placeholder="e.g. 300OFF *"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider text-[#1d3b56]/70">
                      <label htmlFor="discountText">Discount Amount / Label</label>
                      <span className={form.discountText.length > 10 ? 'text-red-600' : 'text-gray-400'}>
                        {form.discountText.length}/10
                      </span>
                    </div>
                    <input
                      id="discountText"
                      name="discountText"
                      type="text"
                      maxLength={10}
                      value={form.discountText}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20 font-bold"
                      placeholder="e.g. $300 *"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="endDate" className="block text-xs font-black uppercase tracking-wider text-[#1d3b56]/70">
                      Campaign End Date & Time
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="datetime-local"
                      value={form.endDate}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20 font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider text-[#1d3b56]/70">
                      <label htmlFor="endDateLabel">End Date Text Label</label>
                      <span className={form.endDateLabel.length > 40 ? 'text-red-600' : 'text-gray-400'}>
                        {form.endDateLabel.length}/40
                      </span>
                    </div>
                    <input
                      id="endDateLabel"
                      name="endDateLabel"
                      type="text"
                      maxLength={40}
                      value={form.endDateLabel}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#a6d5c7] focus:ring-2 focus:ring-[#a6d5c7]/20 font-semibold"
                      placeholder="e.g. 6 August 2026 *"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 rounded-xl bg-[#d4efe8] p-3.5 text-xs font-semibold text-[#1d3b56]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f38669]" />
                    <span>{success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d3b56] py-4 text-sm font-black uppercase tracking-wider text-white shadow-md transition hover:bg-[#f38669] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Publishing Changes...' : 'Publish Offer Live'}
                </button>
              </form>
            </div>
          </div>

          {/* Real-time Previews */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-lg font-black tracking-tight px-1">Live Previews ({selectedCampaign})</h2>

            {/* Top Banner Preview */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#f38669]">Intake Promo Banner</span>
              <div className="bg-[#a6d5c7] text-[#1d3b56] py-2.5 px-3 rounded-xl font-bold text-[11px] flex flex-wrap gap-2 items-center justify-center select-none">
                <Sparkles className="w-3.5 h-3.5 text-[#f38669]" />
                <span className="font-black uppercase tracking-wide">
                  {form.bannerText || 'Campaign Title...'}
                </span>
                <span className="bg-[#1d3b56]/10 px-2 py-0.5 rounded text-[10px]">
                  Ends {form.endDateLabel || 'Date...'}: 02d : 11h : 42m : 34s
                </span>
              </div>
            </div>

            {/* Promo code copy button preview */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#f38669]">Copy Coupon CTA Button</span>
              <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#a6d5c7] bg-[#d4efe8]/30 px-3 py-1.5 text-xs font-bold text-[#1d3b56]">
                  <span>Promo Code: <code className="font-mono text-emerald-600">{form.promoCode || 'CODE'}</code></span>
                  <span className="text-[10px] text-gray-500">(Click to Copy)</span>
                </div>
              </div>
            </div>

            {/* Detail text preview */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#f38669]">Pricing Detail Description</span>
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs font-semibold leading-relaxed text-gray-600">
                <p>{form.detailText || 'Campaign offer details paragraphs will render here...'}</p>
                <p className="text-[10px] text-gray-400">Ends {form.endDateLabel || 'Date...'}.</p>
              </div>
            </div>

            {/* Pricing card badge preview */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#f38669]">Pricing Option Card</span>
              <div className="mx-auto max-w-[240px] rounded-3xl border border-amber-200 bg-amber-100/50 p-6 flex flex-col justify-between select-none">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">Weekly Plan</span>
                  <h3 className="mb-2 text-xl font-black tracking-tight text-[#1d3b56]">$15 / week</h3>
                  <div className="mb-4 rounded-xl border border-amber-200 bg-white p-3 text-center">
                    <span className="mb-0.5 block text-[8px] font-bold uppercase tracking-widest text-gray-500">Weekly Payment Plan</span>
                    <p className="text-xl font-black text-gray-800">$15 <span className="text-[10px] text-gray-400">/wk</span></p>
                    <p className="mt-1 text-[8px] font-semibold text-gray-500">Includes {form.discountText || '50%'} discount.</p>
                  </div>
                </div>
                <button disabled className="w-full rounded-lg bg-amber-500 py-2.5 text-center text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-amber-600">
                  Buy Now - Weekly
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
