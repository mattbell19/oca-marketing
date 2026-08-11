'use client'

import React from 'react'
import { useOffer } from '../components/useOffer'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Menu,
  Sparkles,
  Star,
  X
} from 'lucide-react'
import Image from 'next/image'
import OcaFooter from '../components/OcaFooter'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'

type LeadFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  enquiryReason: string
  company: string
}

const initialLeadFormState: LeadFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  enquiryReason: '',
  company: ''
}

const reasonOptions = [
  'Grow My Small Business',
  'Advance Professional Career',
  'Upskill & Personal Brand',
  'Retraining / Career Change'
]

const studyFeatures = [
  'CPD-Endorsed Courses Included',
  'Interest-Free Payment Plans',
  'Expert Mentors Sarah, Tara & Gareth',
  'Study At Your Own Pace'
]

const courseInclusions = [
  'Social Media Strategy & Meta Advertising',
  'Content Creation & Email Marketing',
  'Facebook Organic & Instagram Growth Hacks',
  'LinkedIn Marketing for personal and business brands'
]

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#f38669]">
    + {children}
  </span>
)

const trackLeadSubmission = (formTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', 'Lead', {
      content_name: 'Social Media Essentials Bundle',
      content_category: 'Lead Gen',
      value: 0.0,
      currency: 'AUD',
      form_title: formTitle
    })
  }
}

const InfoPackForm = ({ title = 'Get a Free Course Info Pack' }: { title?: string }) => {
  const [formData, setFormData] = React.useState<LeadFormState>(initialLeadFormState)
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  const updateField = (field: keyof LeadFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/makeup-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formTitle: title,
          course: 'Social Media Essentials Bundle',
          sourcePage: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : ''
        })
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed')
      }

      setStatus('success')
      setMessage('Thanks. Your social media bundle course info pack request has been received.')
      setFormData(initialLeadFormState)
      trackLeadSubmission(title)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[1.5rem] border border-[#ffdb71] bg-[#fff0c0] p-5 shadow-xl shadow-[#1d3b56]/10 sm:rounded-[2rem] sm:p-6 lg:p-7">
      <div className="mb-5 text-center">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#f38669]">Instant course guide</p>
        <h2 className="text-xl font-black tracking-tight text-[#1d3b56] sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-[#1d3b56]/70">
          Please fill out the details below to receive your free course info pack instantly!
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input name="company" type="text" value={formData.company} onChange={updateField('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <input name="firstName" type="text" placeholder="First Name *" value={formData.firstName} onChange={updateField('firstName')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7]" required />
          <input name="lastName" type="text" placeholder="Last Name *" value={formData.lastName} onChange={updateField('lastName')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7]" required />
        </div>
        <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={updateField('email')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7]" required />
        <input name="phone" type="tel" placeholder="Best Contact Number *" value={formData.phone} onChange={updateField('phone')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7]" required />
        <div className="relative">
          <select name="enquiryReason" value={formData.enquiryReason} onChange={updateField('enquiryReason')} className="w-full appearance-none rounded-xl border border-white/80 bg-white px-4 py-3 text-sm font-semibold text-[#1d3b56]/80 outline-none transition focus:ring-2 focus:ring-[#a6d5c7]" required>
            <option value="" disabled>Reason for Enquiry *</option>
            {reasonOptions.map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1d3b56]/40" />
        </div>

        <button type="submit" disabled={status === 'submitting'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f38669] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-[#e26e50] disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm">
          {status === 'submitting' ? 'Sending...' : 'Get Info Pack'}
          <ArrowRight className="h-4 w-4" />
        </button>

        {message && (
          <p className={`rounded-xl px-4 py-3 text-center text-xs font-bold ${status === 'success' ? 'bg-[#d4efe8] text-[#1d3b56]' : 'bg-red-50 text-red-700'}`}>
            {message}
          </p>
        )}

        <p className="text-[9px] font-medium leading-normal text-[#1d3b56]/60 text-center mt-3">
          By submitting this form, you agree to receive relevant course information and occasional updates from us. You can unsubscribe at any time. View Online Courses Australia's{' '}
          <a href="https://www.onlinecoursesaustralia.edu.au/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f38669]">terms of service</a>{' '}
          and{' '}
          <a href="https://www.onlinecoursesaustralia.edu.au/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f38669]">privacy policy</a>{' '}
          for more information.
        </p>
      </form>
    </div>
  )
}

export default function SocialMediaLandingPage() {
  const { offer, timeLeft } = useOffer('social-media')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<string | null>(null)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef9f6] to-white font-sans text-[#1d3b56] antialiased selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
      {/* Dynamic Promo Bar */}
      <div className="sticky top-0 z-[120]">
        <div className="bg-[#a6d5c7] text-[#1d3b56] px-4 py-2 text-center text-xs font-black tracking-wide sm:text-sm flex flex-wrap items-center justify-center gap-2 shadow-sm border-b border-[#90c8ba]">
          <Sparkles className="w-4 h-4 animate-bounce text-[#f38669]" />
          <span className="font-black uppercase tracking-wide">
            {offer.bannerText}
          </span>
          <span className="bg-[#1d3b56]/10 px-3 py-0.5 rounded text-xs">
            Ends {offer.endDateLabel}: {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
          </span>
        </div>

        <header className="border-b border-[#d4efe8] bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <a href="https://onlinecoursesaustralia.edu.au" target="_blank" rel="noopener noreferrer" className="relative h-9 w-36 shrink-0 md:h-10 md:w-44" aria-label="Online Courses Australia">
              <Image
                src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png"
                alt="Online Courses Australia"
                fill
                className="object-contain"
                priority
              />
            </a>

            <nav className="hidden items-center gap-8 text-[13px] font-black uppercase tracking-[0.14em] text-[#1d3b56]/80 lg:flex">
              <a href="#topics" className="hover:text-[#f38669] transition">Syllabus</a>
              <a href="#details" className="hover:text-[#f38669] transition">Fees & Offers</a>
              <a href="#credentials" className="hover:text-[#f38669] transition">Course Details</a>
              <a href="#mentor" className="hover:text-[#f38669] transition">Mentors</a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-[#00b67a] text-[#00b67a]" />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00b67a] ml-1.5">Excellent 4.8</span>
              </div>
              <a href="#lead-form" className="rounded-full bg-[#f38669] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-[#e26e50]">
                Get Info Pack
              </a>
            </div>

            <button type="button" onClick={toggleMenu} className="rounded-xl border border-gray-200 p-2.5 hover:bg-slate-50 lg:hidden" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {isMobileMenuOpen && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 border-b border-[#d4efe8] bg-white p-6 shadow-xl lg:hidden z-50">
            <div className="flex flex-col gap-4 text-sm font-black uppercase tracking-wider text-[#1d3b56]/90">
              <a href="#topics" onClick={closeMenu} className="hover:text-[#f38669]">Syllabus</a>
              <a href="#details" onClick={closeMenu} className="hover:text-[#f38669]">Fees & Offers</a>
              <a href="#credentials" onClick={closeMenu} className="hover:text-[#f38669]">Course Details</a>
              <a href="#mentor" onClick={closeMenu} className="hover:text-[#f38669]">Mentors</a>
              <a href="#lead-form" onClick={closeMenu} className="rounded-xl bg-[#f38669] px-4 py-3 text-center text-white">Get Info Pack</a>
            </div>
          </motion.nav>
        )}
      </div>

      <main id="top">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden bg-[#d4efe8] px-5 py-8 sm:px-6 md:py-12 lg:py-16">
          <div className="absolute -left-32 top-14 h-72 w-72 rounded-full bg-[#ffdb71]/35 blur-3xl" />
          <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#f38669]/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-10">
            <div className="min-w-0">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-sm sm:px-4 sm:text-xs">
                  <Award className="h-4 w-4 text-[#f38669]" />
                  Award-Winning Course with Live Industry Masterclasses!
                </span>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#f38669] sm:text-sm">Master Social Media Like a Pro!</p>
                <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#1d3b56] sm:text-5xl md:text-6xl lg:text-7xl">
                  Grow Your Brand and Master Platform Marketing
                </h1>
                <div className="relative mt-6 aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[#e9f5f1] shadow-sm lg:hidden">
                  <Image
                    src="/oca-assets/meta-remarketing.png"
                    alt="Social Media essentials course dashboard graphics"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Learn directly from industry professionals and master platforms like Facebook, Instagram, and LinkedIn. Build in-demand skills you can apply straight to your business or personal brand.
                </p>
              </motion.div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-[#e26e50] sm:text-sm">
                  Get Info Pack <ArrowRight className="h-4 w-4" />
                </a>
                <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-sm transition hover:bg-slate-50 sm:text-sm">
                  Book Call <Calendar className="h-4 w-4 text-[#f38669]" />
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.promoCode)
                    setCopiedCode(true)
                    setTimeout(() => setCopiedCode(false), 2000)
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#a6d5c7] bg-[#d4efe8] px-3 py-1.5 text-xs font-bold text-[#1d3b56] transition hover:bg-[#d4efe8]/70 shadow-sm"
                >
                  <span>Promo Code: <code className="font-mono text-[#1d3b56]">{offer.promoCode}</code></span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy & Apply'})</span>
                </button>
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#1d3b56]/70">Limited Time Offer</p>

              <div className="mt-5 max-w-xl rounded-2xl border border-[#f38669]/20 bg-white/70 p-4">
                <p className="text-sm font-black text-[#1d3b56]">Start for Only $25/Week and Get Lifetime Access</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[#1d3b56]/70">
                  Download the course info pack for the latest pricing, discounts and flexible payment plans.
                </p>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 text-sm font-black text-[#1d3b56] sm:grid-cols-2 lg:grid-cols-3">
                {studyFeatures.map((feat) => (
                  <div key={feat} className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#f38669] shrink-0" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative mx-auto max-w-[620px]">
                <div className="relative hidden aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[#e9f5f1] lg:block">
                  <Image
                    src="/oca-assets/meta-remarketing.png"
                    alt="Social Media essentials course dashboard graphics"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <div id="lead-form" className="relative z-10 mx-auto mt-6 lg:-mt-12 max-w-[470px] scroll-mt-28">
                  <InfoPackForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Highlight Callout Section */}
        <section className="bg-white py-12 px-5 border-y border-gray-100 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-black text-[#1d3b56] sm:text-3xl md:text-4xl tracking-tight">
              "Why pay someone else when you can do it yourself?"
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/75 md:text-lg">
              In today’s digital world, social media isn’t optional—it’s essential. This course gives you the tools, strategies, and real-time support to grow your brand with confidence.
            </p>
            <p className="mt-4 text-[#f38669] text-lg font-black tracking-wider uppercase">
              Learn it. Apply it. Own it.
            </p>
          </div>
        </section>

        {/* 2.5. The Social Media Opportunity Section */}
        <section className="bg-white px-5 py-14 sm:px-6 md:py-20 border-b border-gray-100">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 relative">
                {/* Visual Opportunity stats card */}
                <div className="rounded-[2.5rem] bg-[#d4efe8] p-6 sm:p-8 border border-[#a6d5c7] shadow-xl relative overflow-hidden">
                  <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#ffdb71]/20 blur-2xl" />
                  <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-[#f38669]/10 blur-2xl" />

                  <span className="bg-[#f38669] text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full inline-block leading-none mb-6">
                    Market Demand Statistics
                  </span>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1d3b56]/50 block mb-1">
                        Average Social Media Manager Salary
                      </span>
                      <p className="text-2xl font-black text-[#1d3b56]">$78,000 - $112,000 <span className="text-xs font-semibold text-gray-500">/ yr</span></p>
                      
                      <div className="mt-3 w-full h-2 bg-white/60 rounded-full relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-[20%] right-[10%] bg-[#f38669] rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="border-t border-[#a6d5c7]/30 pt-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1d3b56]/50 block mb-1">
                        Freelance Income Potential
                      </span>
                      <p className="text-2xl font-black text-[#1d3b56]">$1,500 - $4,500 <span className="text-xs font-semibold text-gray-500">/ mo per client</span></p>
                      <p className="text-[10px] font-bold text-[#1d3b56]/60 mt-1 leading-normal">
                        Based on managing 3-5 standard social accounts.
                      </p>
                    </div>

                    <div className="border-t border-[#a6d5c7]/30 pt-6 flex gap-4 items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1d3b56] text-white">
                        <svg className="w-6 h-6 text-[#ffdb71]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-[#1d3b56]">Remote Friendly</h4>
                        <p className="text-[10px] font-bold text-slate-500 leading-normal">92% of business owners allow flexible work from home.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <SectionEyebrow>The social opportunity</SectionEyebrow>
                <h2 className="text-3xl font-black tracking-tight text-[#1d3b56] sm:text-4xl md:text-5xl leading-none">
                  A massive, growing market that you can capture
                </h2>
                <p className="text-sm font-semibold leading-relaxed text-[#1d3b56]/80 md:text-base">
                  Every modern brand, business, and creator needs a digital presence to survive. More than <strong>15,000 new job openings</strong> are projected for social media specialists in Australia over the next five years.
                </p>
                
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-black text-[#1d3b56]">Scale Your Own Venture</h4>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5 leading-relaxed">
                        Skip hiring expensive marketing agencies. Learn how to run your own campaigns, analyze advertising spend, and build organic communities yourself.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-black text-[#1d3b56]">Start a High-Margin Side Hustle</h4>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5 leading-relaxed">
                        Provide freelance social media services to local businesses. Charging just three clients $2,000/month generates a secure $72,000 yearly side-income.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-black text-[#1d3b56]">Work 100% Online & Remotely</h4>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5 leading-relaxed">
                        Social media management is entirely location-independent. Manage brands, schedule content, and run ads from anywhere in the world.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a href="#lead-form" className="inline-flex items-center gap-2 rounded-full bg-[#f38669] px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-sm hover:bg-[#e26e50] transition">
                    Learn the Strategies <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Syllabus Section */}
        <section id="topics" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <SectionEyebrow>Course Credentials</SectionEyebrow>
              <h2 className="text-3xl font-black leading-none tracking-[-0.03em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                You will learn
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-[#1d3b56]/75 md:text-base">
                As part of this course, you will learn about:
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {courseInclusions.map((item, idx) => (
                <div key={idx} className="flex gap-4 rounded-3xl bg-white p-6 shadow-sm border border-gray-100/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d4efe8] text-[#1d3b56] font-black">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#1d3b56] leading-tight">{item}</h3>
                    <p className="mt-1.5 text-xs text-gray-500 font-semibold leading-relaxed">
                      Industry-relevant platform techniques built for real-world campaigns.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-dashed border-[#a6d5c7] bg-[#e9f5f1]/40 p-6 text-center sm:p-8">
              <p className="text-sm font-black text-[#1d3b56]">
                View the full list of topics with the complete course outline in the info pack below:
              </p>
              <a href="#lead-form" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1d3b56] px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-sm hover:bg-[#f38669] transition">
                Get Info Pack Outline <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 space-y-6 text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-[#1d3b56]/80 leading-relaxed md:text-base">
                This course is perfect for small business owners, marketers, and content creators ready to grow their business or personal brand cross-platform.
              </p>
              <p className="text-sm font-semibold text-[#1d3b56]/80 leading-relaxed md:text-base">
                We also don’t use thick academic textbooks. Instead, we design easy to follow student-friendly modules with exclusive movie-quality video sessions and tutorials, backed by 24/7 student support.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Credentials & Pricing Details Section */}
        <section id="credentials" className="bg-white px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <SectionEyebrow>Course Details</SectionEyebrow>
              <h2 className="text-3xl font-black text-[#1d3b56] sm:text-4xl md:text-5xl tracking-tight">Credentials & Delivery Options</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[#f7f9fa] rounded-3xl p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-[#d4efe8] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1d3b56]">Credentials</span>
                  <p className="text-xs font-bold text-[#1d3b56]/80 leading-relaxed">
                    This course bundle includes CPD-endorsed courses in Social Media Marketing, Meta Advertising, Content Creation, and Email Marketing. You will gain an industry-endorsed micro-credential with a course completion document, plus a shareable & verifiable Digital Badge from Credly. Prior experience is NOT required.
                  </p>
                </div>
              </div>

              <div className="bg-[#f7f9fa] rounded-3xl p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-[#d4efe8] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1d3b56]">Delivery</span>
                  <p className="text-xs font-bold text-[#1d3b56]/80 leading-relaxed">
                    Flexible, online, self-paced learning with dedicated student support from a mentor by email or phone (Mon-Fri), or contact us through live chat 7 days a week.
                  </p>
                </div>
              </div>

              <div className="bg-[#f7f9fa] rounded-3xl p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-[#d4efe8] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1d3b56]">Duration</span>
                  <p className="text-xs font-bold text-[#1d3b56]/80 leading-relaxed">
                    This course takes approximately 84 study hours to complete. Study at your own pace with no deadlines. Enjoy the flexibility of online learning with lifetime access to resources throughout your study.
                  </p>
                </div>
              </div>

              <div className="bg-[#f7f9fa] rounded-3xl p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-[#fecabe]/30 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#f38669]">Payment Options</span>
                  <p className="text-xs font-bold text-[#1d3b56]/80 leading-relaxed">
                    Upfront Payment, Afterpay, Latitude Pay or a flexible Payment Plan ($25 per week). Our FIRST 300 Sale is on now! Enrol today to get 50% OFF all course fees. Use code FIRST300. Sale ends 13 August 2026. Get more details in the course infopack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Fees & Offer section */}
        <section id="details" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28 border-t border-gray-100">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <SectionEyebrow>Fees & Pricing</SectionEyebrow>
              <h2 className="text-3xl font-black text-[#1d3b56] sm:text-4xl md:text-5xl tracking-tight">
                Start for Only $25/Week and Get Lifetime Access
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xs font-semibold leading-relaxed text-[#1d3b56]/75 md:text-sm">
                This course comes with a super affordable interest-free payment plan option starting from only $25 per week. You can also pay through a single payment upfront and get a discount so you won’t have to fork out thousands of dollars to upgrade your skills. We also offer Afterpay and Latitude Pay as alternatives.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.promoCode)
                    setCopiedCode(true)
                    setTimeout(() => setCopiedCode(false), 2000)
                  }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#a6d5c7] bg-[#d4efe8]/50 px-4 py-2 text-xs font-bold text-[#1d3b56] transition hover:bg-[#d4efe8]/80 shadow-sm"
                >
                  <span>Use Coupon Code <strong className="font-mono text-[#1d3b56]">{offer.promoCode}</strong> for 50% Off!</span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
                </button>
              </div>
            </div>

            <div className="grid items-stretch gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col justify-between rounded-[2.5rem] bg-white p-8 shadow-sm border border-gray-100">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Upfront Offer</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">$999 <span className="text-xs font-semibold text-gray-400">Total</span></h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>One simple payment</li>
                    <li>Lifetime Access</li>
                    <li>Saves over 50%</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-gray-100 bg-[#f7f9fa] p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Upfront Price</span>
                    <p className="text-3xl font-black text-gray-800">$999</p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">Includes 7-Day Guarantee.</p>
                  </div>
                </div>
                <a href="#lead-form" className="block w-full rounded-xl bg-[#1d3b56] py-4 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#f38669]">
                  Get Info Pack
                </a>
              </div>

              <div className="flex flex-col justify-between rounded-[2.5rem] bg-white p-8 shadow-sm border border-gray-100">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-[#a6d5c7] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#1d3b56]">Afterpay</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">4 instalments</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>Interest-free fortnightly</li>
                    <li>Instant course access</li>
                    <li>Easy setup</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-[#a6d5c7]/50 bg-[#e9f5f1] p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#1d3b56]">Afterpay Payments</span>
                    <p className="text-3xl font-black text-gray-800">$249.75</p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">4 fortnightly payments.</p>
                  </div>
                </div>
                <a href="#lead-form" className="block w-full rounded-xl bg-[#a6d5c7] py-4 text-center text-xs font-bold uppercase tracking-wide text-[#1d3b56] transition hover:bg-[#a6d5c7]/80">
                  Get Info Pack
                </a>
              </div>

              <div className="relative flex flex-col justify-between rounded-[2.5rem] border border-amber-200 bg-amber-100/50 p-8 shadow-sm">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-amber-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Weekly Plan</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">$25 / week</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>Flexible Payment Plan</li>
                    <li>Lifetime Access</li>
                    <li>Unlimited Support</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-amber-200 bg-white p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-gray-500">Payment Plan From</span>
                    <p className="text-3xl font-black text-gray-800">$25 <span className="text-xs text-gray-400">/wk</span></p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">Flexible interest-free instalments.</p>
                  </div>
                </div>
                <a href="#lead-form" className="block w-full rounded-xl bg-amber-500 py-4 text-center text-xs font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-amber-600">
                  Get Info Pack
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Mentors Section */}
        <section id="mentor" className="bg-white px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="relative lg:col-span-5">
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] border-[8px] border-white shadow-xl aspect-[3/4]">
                  <Image
                    src="/oca-assets/meta-mentor.png"
                    alt="Social Media expert mentor Sarah"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute -left-4 bottom-4 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-100">
                  <p className="text-xs font-black text-[#f38669] uppercase tracking-wider">Expert Guidance</p>
                  <p className="mt-0.5 text-[10px] font-semibold text-slate-500">Real-world digital professionals.</p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <SectionEyebrow>Your digital team</SectionEyebrow>
                <h2 className="text-3xl font-black tracking-tight text-[#1d3b56] sm:text-4xl md:text-5xl">
                  Get Mentored by Digital Experts
                </h2>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-[#1d3b56]/80 md:text-base">
                  When you enrol in our Social Media Masterclass & Mentorship Course, you’re not just accessing expert-led content—you’re joining a supportive community of digital professionals. With live workshops and 1-on-1 mentoring, you’ll gain real-world insight from industry leaders.
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-base font-black text-[#1d3b56]">Sarah – Social Media Specialist</h3>
                    <p className="mt-1 text-xs font-semibold text-[#1d3b56]/70 leading-relaxed">
                      12+ years in social and content marketing with brands like Burt’s Bees, Bonds & kikki.K. Sarah shares practical strategies and creative know-how to elevate your content.
                    </p>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div>
                    <h3 className="text-base font-black text-[#1d3b56]">Tara – Digital Marketing Specialist</h3>
                    <p className="mt-1 text-xs font-semibold text-[#1d3b56]/70 leading-relaxed">
                      With 10+ years in digital and e-commerce, Tara helps simplify strategy and prepare you for online success.
                    </p>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div>
                    <h3 className="text-base font-black text-[#1d3b56]">Gareth – Social Media Trainer & Strategist</h3>
                    <p className="mt-1 text-xs font-semibold text-[#1d3b56]/70 leading-relaxed">
                      15+ years of experience, co-author of the Diploma of Social Media Marketing, and trusted by brands like PwC and ING.
                    </p>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div>
                    <h3 className="text-base font-black text-[#1d3b56]">Julia – Student Support Specialist</h3>
                    <p className="mt-1 text-xs font-semibold text-[#1d3b56]/70 leading-relaxed">
                      Your go-to for help with course content, platform support, and staying on track throughout your study journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Dropdown navigation links (Interactive Accordion) */}
        <section className="bg-[#f7f9fa] border-y border-gray-200/60 py-12 px-5 scroll-mt-28" id="inclusions-accordion">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  id: 'learn',
                  title: 'What You Will Learn',
                  content: (
                    <div className="space-y-3">
                      <p>This course bundle includes CPD-endorsed training across core social media and digital marketing disciplines:</p>
                      <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li><strong>Social Media Strategy & Meta Advertising:</strong> Meta Business Suite setup, Ads Manager configuration, custom audience tracking pixels, campaign creation, budgeting, and performance analytics.</li>
                        <li><strong>Content Creation & Email Marketing:</strong> Strategy, content planning, graphics design basics, email campaign automation, newsletter copy, and subscriber growth.</li>
                        <li><strong>Organic Platform Growth:</strong> Facebook/Instagram algorithms, organic visibility hacks, hashtags, Reels/Video content strategy, and community engagement.</li>
                        <li><strong>LinkedIn Marketing:</strong> Professional personal profile optimization, company brand pages, organic B2B outreach, and networking.</li>
                      </ul>
                    </div>
                  )
                },
                {
                  id: 'inclusions',
                  title: 'Course Fees Include',
                  content: (
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>Full lifetime access to all learning platform modules and future updates.</li>
                      <li>Exclusive movie-quality video masterclasses and screen-share tutorials.</li>
                      <li>Dedicated 1-on-1 support and coaching sessions from digital marketing experts Sarah, Tara & Gareth.</li>
                      <li>Verifiable and shareable Digital Badge issued by Credly to showcase on your LinkedIn profile.</li>
                      <li>CPD-endorsed certificates for each successfully completed module.</li>
                      <li>Access to Online Courses Australia’s student job portal and private community group.</li>
                      <li>7-Day Money Back Guarantee.</li>
                    </ul>
                  )
                },
                {
                  id: 'outcomes',
                  title: 'Career Outcomes',
                  content: (
                    <div className="space-y-3">
                      <p>Gain the skills to pursue professional, in-demand marketing and growth roles, or scale your own venture:</p>
                      <div className="grid sm:grid-cols-2 gap-4 pl-2 mt-2">
                        <div className="border-l-2 border-[#a6d5c7] pl-3">
                          <h4 className="font-bold text-[#1d3b56]">Employment Roles</h4>
                          <p className="text-xs text-[#1d3b56]/70 mt-1">Social Media Manager, Digital Marketing Coordinator, Brand Manager, Content Creator, Marketing Assistant.</p>
                        </div>
                        <div className="border-l-2 border-[#f38669] pl-3">
                          <h4 className="font-bold text-[#1d3b56]">Entrepreneurial Paths</h4>
                          <p className="text-xs text-[#1d3b56]/70 mt-1">Freelance Marketing Consultant, Agency Owner, E-commerce Founder, Small Business Content Manager.</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'provider',
                  title: 'Course Provider',
                  content: (
                    <div className="space-y-2">
                      <p><strong>Online Courses Australia (OCA)</strong> is a leading provider of online training, professional development, and industry micro-credentials in Australia.</p>
                      <p>All courses are fully certified and recognized, designed in collaboration with active industry specialists to ensure real-world skills relevance. Supported by our 7-day student support team and student champions network.</p>
                    </div>
                  )
                }
              ].map((tab) => {
                const isOpen = activeTab === tab.id
                return (
                  <div key={tab.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => setActiveTab(isOpen ? null : tab.id)}
                      className="w-full flex items-center justify-between px-6 py-4.5 text-left font-black uppercase tracking-wider text-xs md:text-sm text-[#1d3b56] hover:bg-slate-50 transition"
                    >
                      <span>+ {tab.title}</span>
                      <ChevronDown className={`h-4 w-4 text-[#f38669] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-xs md:text-sm leading-relaxed text-[#1d3b56]/85 border-t border-slate-50 pt-4 font-semibold">
                        {tab.content}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 8. Trustpilot Footer Area */}
        <section className="py-16 md:py-40 bg-[#1d3b56] text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl xs:text-5xl md:text-8xl font-bold mb-8 md:mb-12 tracking-tighter">Your future <span className="font-serif italic text-[#ffdb71]">starts now</span></h2>
            <div className="flex justify-center gap-1.5 md:gap-2 mb-8 md:mb-12">
               {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 md:w-16 md:h-16 fill-[#ffdb71] text-[#ffdb71]" />)}
            </div>
            <p className="text-xl md:text-4xl font-serif italic text-[#fff0c0] opacity-80 mb-12 md:mb-16">7-day Money Back Guarantee</p>
            <div className="bg-white/5 backdrop-blur-md p-6 xs:p-8 sm:p-12 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-inner">
               <p className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight uppercase tracking-[0.05em] md:tracking-[0.1em]">Trustpilot - Excellent</p>
               <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm">Based on student reviews</p>
            </div>
          </div>
        </section>

        {/* 9. Final Form Area */}
        <section id="enrol" className="py-16 md:py-40 bg-[#fff0c0]/40 px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
             <h2 className="text-3xl font-black md:text-5xl mb-10 md:mb-16 text-[#1d3b56]">Get Your Career <span className="font-serif italic text-[#a6d5c7]">Pathway</span> Guide</h2>
             <div className="grid lg:grid-cols-[1fr_540px] gap-10 items-center w-full">
               <div className="relative aspect-[654/402] w-full overflow-hidden rounded-[2rem] border border-[#fecabe] bg-white shadow-sm">
                <Image src="/oca-assets/info-pack-images.png" alt="Download your free social media info pack" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
               </div>
               <InfoPackForm title="Build Your Confidence" />
             </div>
          </div>
        </section>
      </main>

      <OcaFooter bookCallHref={BOOK_CALL_URL} showLinks={false} />
    </div>
  )
}
