'use client'

import React, { useState } from 'react'
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
  Users,
  Video,
  Zap,
  BookOpen,
  TrendingUp,
  BrainCircuit,
  X
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import OcaFooter from '../components/OcaFooter'
import TrustpilotShowcase from '../components/TrustpilotShowcase'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'
const CALENDLY_URL = 'https://calendly.com/online-courses-aus/careercall'

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
  '8 Comprehensive Courses Included',
  'Monthly Live Masterclasses',
  'Weekly Mentor Q&A Calls',
  'CPD-Endorsed Credly Badge'
]

const courseOutcomes = [
  {
    title: 'Marketing Objectives Alignment',
    desc: 'Analyse marketing objectives and define content opportunities aligned to business goals'
  },
  {
    title: 'Research AI Tools',
    desc: 'Research AI tools for content ideation, creation and production'
  },
  {
    title: 'AI Content Plan & Workflow',
    desc: 'Develop an AI-enabled content plan, calendar and workflow'
  },
  {
    title: 'Multimedia Content Asset Creation',
    desc: 'Create written, visual and multimedia content assets using AI'
  },
  {
    title: 'Quality & Brand Alignment',
    desc: 'Edit and refine AI-generated content for quality and brand alignment'
  },
  {
    title: 'AI Performance & Growth Analytics',
    desc: 'Use AI analytics to analyse content performance and develop improvement recommendations'
  }
]

const courseModules = [
  {
    title: 'Social Media Strategy',
    value: 'Valued at $497',
    desc: 'Build comprehensive, omnichannel growth strategies tailored to brand positioning and customer conversion funnels.',
    isBonus: false
  },
  {
    title: 'Creating Content with AI',
    value: '$497 Value',
    desc: 'Leverage generative AI prompt workflows to produce weeks of engaging copy, graphics, and video scripts in minutes.',
    isBonus: false
  },
  {
    title: 'Meta Business Suite',
    value: '$497 Value',
    desc: 'Master the unified Meta management portal, scheduling tools, inbox automations, and role access permissions.',
    isBonus: false
  },
  {
    title: 'Meta Advertising',
    value: '$497 Value',
    desc: 'Target precision custom and lookalike audiences, configure Meta Pixel tracking, and run high-ROI ad campaigns.',
    isBonus: false
  },
  {
    title: 'Instagram Marketing',
    value: '$497 Value',
    desc: 'Unlock organic growth algorithms, trending audio, Reels production, Stories conversion funnels, and creator collabs.',
    isBonus: false
  },
  {
    title: 'LinkedIn Marketing',
    value: '$497 Value',
    desc: 'Optimize personal executive profiles, establish thought leadership, generate B2B inbound leads, and manage company pages.',
    isBonus: false
  },
  {
    title: 'Email Marketing',
    value: '$497 Value',
    desc: 'Build automated lead nurture sequences, design high-converting newsletters, and retain loyal paying subscribers.',
    isBonus: false
  },
  {
    title: 'BONUS: Facebook Organic Marketing',
    value: 'FREE BONUS ($497)',
    desc: 'Engage private community groups, maximize organic post reach without ad spend, and build active brand evangelists.',
    isBonus: true
  }
]

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3 inline-flex rounded-full bg-[#f38669]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f38669] sm:px-4 sm:py-2 sm:text-[11px]">
    {children}
  </span>
)

const trackLeadSubmission = (formTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', 'Lead', {
      content_name: 'Social Media Masterclass and Mentorship',
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
          course: 'Social Media Masterclass and Mentorship',
          sourcePage: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : ''
        })
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed')
      }

      setStatus('success')
      setMessage('Thanks! Your info pack request has been received.')
      setFormData(initialLeadFormState)
      trackLeadSubmission(title)
      window.location.assign('/thank-you?course=social-media')
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
        <p className="mt-2 text-xs md:text-sm font-semibold leading-relaxed text-[#1d3b56]/70">
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
          By submitting this form, you agree to receive relevant course information and occasional updates from us. You can unsubscribe at any time. View Online Courses Australia&apos;s{' '}
          <a href="https://www.onlinecoursesaustralia.edu.au/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f38669]">terms of service</a>{' '}
          and{' '}
          <a href="https://www.onlinecoursesaustralia.edu.au/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f38669]">privacy policy</a>.
        </p>
      </form>
    </div>
  )
}

const TrustpilotSlider = () => {
  const reviews = [
    { name: "Hannah W.", header: "The AI tools workflow was a game changer", text: "Creating a month of content now takes me 2 hours instead of 2 weeks. The live masterclasses are invaluable.", stars: 5, date: "2 days ago" },
    { name: "Marcus L.", header: "Landed my first social media client", text: "The mentors reviewed my proposal and ad strategy before I pitched. Signed a $2,500/mo retainer!", stars: 5, date: "4 days ago" },
    { name: "Chloe S.", header: "Easy to follow around my job", text: "Self-paced with weekly mentor calls meant I could learn at night and get expert help every week.", stars: 5, date: "1 week ago" },
    { name: "David K.", header: "Meta Advertising finally made sense", text: "Gareth and Sarah break down pixel setup and custom audiences so clearly. Highly recommend!", stars: 5, date: "1 week ago" },
    { name: "Jessica T.", header: "Digital badge boosted my LinkedIn", text: "The Credly verified badge and CPD endorsement gave me instant credibility with employers.", stars: 5, date: "2 weeks ago" }
  ]

  return (
    <a 
      href="https://au.trustpilot.com/review/onlinecoursesaustralia.edu.au"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full overflow-hidden cursor-pointer"
    >
      <div className="flex gap-4 animate-[scroll_50s_linear_infinite] hover:[animation-play-state:paused]">
        {[...reviews, ...reviews, ...reviews].map((review, i) => (
          <div key={i} className="flex-shrink-0 w-72 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-5 h-5 flex items-center justify-center text-white rounded-sm ${idx < review.stars ? 'bg-[#00b67a]' : 'bg-gray-200'}`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current text-white" />
                  </div>
                ))}
              </div>
              <h4 className="text-[13px] font-black text-gray-800 line-clamp-1 mb-1 tracking-tight leading-none h-4">{review.header}</h4>
              <p className="text-[11px] text-gray-500 line-clamp-2 h-8 leading-normal mt-2">{review.text}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-50 mt-4 pt-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                  {review.name[0]}
                </div>
                <span className="text-[10px] font-black text-gray-500">{review.name}</span>
              </div>
              <span className="text-[9px] text-gray-300 font-bold">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </a>
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
    <div className="min-h-screen bg-white font-sans text-[#1d3b56] antialiased selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
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
            <Link href="https://onlinecoursesaustralia.edu.au" target="_blank" rel="noopener noreferrer" className="relative h-10 w-44 shrink-0 md:h-12 md:w-52" aria-label="Online Courses Australia">
              <Image
                src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png"
                alt="Online Courses Australia"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </Link>

            <nav className="hidden items-center gap-6 text-[13px] font-black uppercase tracking-[0.14em] text-[#1d3b56]/80 lg:flex">
              <a href="#overview" className="hover:text-[#f38669] transition">Program</a>
              <a href="#masterclass-mentorship" className="hover:text-[#f38669] transition">Masterclass & Mentorship</a>
              <a href="#outcomes" className="hover:text-[#f38669] transition">Outcomes</a>
              <a href="#topics" className="hover:text-[#f38669] transition">Course Topics</a>
              <a href="#mentor" className="hover:text-[#f38669] transition">Mentors</a>
              <a href="#pricing" className="hover:text-[#f38669] transition">Pricing</a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-1.5 rounded-full bg-[#d4efe8]/70 px-3 py-2 text-[11px] font-black text-[#1d3b56]">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-[#00b67a] text-[#00b67a]" />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00b67a] ml-1">4.8 Excellent</span>
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
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-b border-[#d4efe8] bg-white p-6 shadow-xl lg:hidden">
            <div className="flex flex-col gap-3 text-sm font-black uppercase tracking-wider text-[#1d3b56]/90">
              <a href="#overview" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Program</a>
              <a href="#masterclass-mentorship" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Masterclass & Mentorship</a>
              <a href="#outcomes" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Outcomes</a>
              <a href="#topics" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Course Topics</a>
              <a href="#mentor" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Mentors</a>
              <a href="#pricing" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Pricing</a>
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
                  Social Media Masterclass & Mentorship Program
                </span>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#f38669] sm:text-sm">
                  AI-Powered Strategies That Deliver Measurable Results
                </p>
                <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#1d3b56] sm:text-5xl md:text-6xl lg:text-7xl">
                  Design & implement AI-powered social media strategies
                </h1>
                
                <div className="relative mt-6 aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[#e9f5f1] shadow-sm lg:hidden">
                  <Image
                    src="/oca-assets/meta-remarketing.png"
                    alt="Social Media Masterclass and Mentorship program"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>

                <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  The Social Media Masterclass and Mentorship program helps you design and implement AI-powered social media strategies that deliver outstanding, measurable results.
                </p>
              </motion.div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-[#e26e50] sm:text-sm">
                  Get Info Pack <ArrowRight className="h-4 w-4" />
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-sm transition hover:bg-[#fff0c0] sm:text-sm">
                  Book a Career Call <Calendar className="h-4 w-4 text-[#f38669]" />
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
                  className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#a6d5c7] bg-white/70 px-3 py-1.5 text-xs font-bold text-[#1d3b56] transition hover:bg-white shadow-sm"
                >
                  <span>Promo Code: <code className="font-mono text-[#f38669]">{offer.promoCode}</code></span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy & Apply'})</span>
                </button>
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#1d3b56]/70">Limited Time Offer</p>

              <div className="mt-5 max-w-xl rounded-2xl border border-[#f38669]/20 bg-white/70 p-4">
                <p className="text-sm font-black text-[#1d3b56]">{offer.bannerText}</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[#1d3b56]/70">
                  {offer.detailText || 'Download the course info pack for the latest pricing, discounts and flexible payment plans.'}
                </p>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 text-sm font-black text-[#1d3b56] sm:grid-cols-2">
                {studyFeatures.map((feat) => (
                  <div key={feat} className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#f38669] shrink-0" />
                    <span className="leading-tight text-xs font-bold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative mx-auto max-w-[620px]">
                <div className="relative hidden aspect-[1.05/1] overflow-hidden rounded-[2.5rem] border-4 border-white bg-[#e9f5f1] lg:block shadow-md">
                  <Image
                    src="/oca-assets/meta-remarketing.png"
                    alt="Social Media Masterclass and Mentorship dashboard"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-[#ffdb71] text-[#1d3b56] font-black uppercase text-[10px] px-3 py-1.5 rounded-full shadow-md select-none tracking-widest border border-white/20">
                    $15 Per Week
                  </div>
                </div>
                <div id="lead-form" className="relative z-10 mx-auto mt-6 lg:-mt-12 max-w-[470px] scroll-mt-28">
                  <InfoPackForm title="Get Free Social Media Info Pack" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Trustpilot Social Proof Banner & Slider */}
        <section className="bg-slate-50 border-y border-gray-200/60 py-12">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
              <div className="flex-shrink-0 text-center md:text-left">
                <span className="text-[10px] md:text-xs font-bold text-[#1d3b56]/40 uppercase tracking-[0.2em]">Trustpilot</span>
                <h3 className="text-xl md:text-3xl font-black text-[#1d3b56] mt-1 tracking-tight">What our students say</h3>
              </div>
              <div className="h-px w-full md:w-px md:h-10 bg-gray-200" />
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center text-white rounded-sm" title="5 star"><Star className="w-3.5 h-3.5 fill-current text-white" /></div>)}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#00b67a]">Excellent 4.8</span>
              </div>
            </div>
            <TrustpilotSlider />
          </div>
        </section>

        {/* 3. Program Overview Callout */}
        <section id="overview" className="bg-white py-14 px-5 border-b border-gray-100 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>The AI & Social Media Advantage</SectionEyebrow>
            <h2 className="mt-4 text-2xl font-black text-[#1d3b56] sm:text-3xl md:text-4xl tracking-tight leading-tight max-w-3xl mx-auto">
              Design & implement AI-powered social media strategies that deliver outstanding, measurable results.
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/75 md:text-lg">
              In today’s fast-moving digital world, relying on outdated manual posting is no longer enough. This program combines cutting-edge AI content workflows, paid Meta ad mastery, and multichannel community engagement with direct expert mentorship.
            </p>
          </div>
        </section>

        {/* 4. Masterclass Vs Mentorship Section */}
        <section id="masterclass-mentorship" className="bg-[#fff0c0]/40 px-5 py-14 sm:px-6 md:py-20 border-b border-[#ffdb71]/40 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <SectionEyebrow>Masterclass Vs Mentorship</SectionEyebrow>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl mt-2">
                Students get both: Live Masterclasses + Weekly Mentorship
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/75 md:text-lg">
                We combine industry-leading live training with intimate, ongoing mentor support so you never get stuck.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Monthly Live Masterclasses */}
              <div className="rounded-[2.5rem] bg-white p-8 md:p-10 shadow-xl shadow-[#1d3b56]/5 border border-gray-150 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4efe8]/50 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#d4efe8] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#1d3b56] mb-6">
                    <Video className="w-3.5 h-3.5 text-[#f38669]" />
                    Monthly Live Masterclasses
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#1d3b56] tracking-tight mb-4">
                    Monthly live Masterclasses, facilitated by our network of social media and digital marketing experts
                  </h3>
                  <p className="text-sm md:text-base font-semibold leading-relaxed text-[#1d3b56]/80 mb-6">
                    Deep-dive into cutting-edge platform updates, AI tools, algorithm shifts, and campaign breakdowns in real-time with leading Australian marketing specialists.
                  </p>
                  <ul className="space-y-3 text-xs md:text-sm font-bold text-[#1d3b56]/80 mb-8">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00b67a] shrink-0" />
                      <span>Live interactive Q&A and screen-share breakdowns</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00b67a] shrink-0" />
                      <span>Facilitated by active senior marketing directors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00b67a] shrink-0" />
                      <span>Full on-demand library with lifetime replay access</span>
                    </li>
                  </ul>
                </div>
                <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1d3b56] hover:bg-[#f38669] px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-md transition">
                  Enrol & Access Masterclasses <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Weekly Group Mentor Q&A Calls */}
              <div className="rounded-[2.5rem] bg-white p-8 md:p-10 shadow-xl shadow-[#1d3b56]/5 border border-[#a6d5c7] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff0c0] rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f38669] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white mb-6">
                    <Users className="w-3.5 h-3.5" />
                    Weekly Group Mentor Q&A Calls
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#1d3b56] tracking-tight mb-4">
                    Weekly Group Mentoring with social media experts + ongoing mentor support via chat and the Social Media Student community
                  </h3>
                  <p className="text-sm md:text-base font-semibold leading-relaxed text-[#1d3b56]/80 mb-6">
                    Get your ad campaigns, content calendars, and creative assets personally reviewed so you launch every campaign with complete confidence.
                  </p>
                  <ul className="space-y-3 text-xs md:text-sm font-bold text-[#1d3b56]/80 mb-8">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00b67a] shrink-0" />
                      <span>Weekly direct group coaching with dedicated mentors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00b67a] shrink-0" />
                      <span>Direct feedback on your content calendars & ad creatives</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00b67a] shrink-0" />
                      <span>Private student chat community & continuous support</span>
                    </li>
                  </ul>
                </div>
                <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f38669] hover:bg-[#e26e50] px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-md transition">
                  Get Info Pack on Mentorship <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Key Learning Outcomes ("In this course, you will:") */}
        <section id="outcomes" className="bg-white px-5 py-14 sm:px-6 md:py-20 border-b border-gray-100 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <SectionEyebrow>Key Learning Outcomes</SectionEyebrow>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl mt-2">
                In this course, you will:
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/75 md:text-lg">
                Practical, AI-powered competencies designed to elevate your brand presence and marketing efficiency from day one.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courseOutcomes.map((outcome, idx) => (
                <div key={idx} className="rounded-3xl border border-gray-150 bg-[#f7f9fa] p-6 md:p-7 flex flex-col justify-between hover:border-[#a6d5c7] hover:shadow-sm transition">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#d4efe8] text-sm font-black text-[#1d3b56]">
                        {idx + 1}
                      </span>
                      <h3 className="text-base font-black text-[#1d3b56] leading-snug">{outcome.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm font-semibold leading-relaxed text-[#1d3b56]/75">
                      {outcome.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200/50 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#00b67a]">
                    <CheckCircle2 className="w-4 h-4" /> Practical Skill Assessed
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. 8 Practical On-Demand Courses (Course Topics) */}
        <section id="topics" className="bg-[#1d3b56] px-5 py-14 text-white sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ffdb71]">
                8 Comprehensive Courses Included
              </span>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl">
                8 practical, on-demand social media marketing courses:
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-white/75">
                Get full lifetime access to all 8 specialized training courses, tools, templates, and video walkthroughs — valued at over $3,900+.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {courseModules.map((course, index) => (
                <div key={course.title} className={`rounded-3xl border p-6 flex flex-col justify-between ${course.isBonus ? 'bg-gradient-to-b from-[#f38669]/20 to-white/10 border-[#f38669]' : 'border-white/10 bg-white/8'}`}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#ffdb71] text-xs font-black text-[#1d3b56]">
                        {index + 1}
                      </span>
                      <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${course.isBonus ? 'bg-[#f38669] text-white' : 'bg-white/15 text-[#ffdb71]'}`}>
                        {course.value}
                      </span>
                    </div>
                    <h3 className="text-base font-black leading-snug text-white mb-2">{course.title}</h3>
                    <p className="text-xs font-semibold leading-relaxed text-white/70">{course.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] bg-white/10 border border-white/15 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#ffdb71] mb-1">Total Program Value</p>
                <h4 className="text-2xl md:text-3xl font-black text-white">Over $3,900+ in Masterclass & Mentorship Included</h4>
                <p className="text-xs font-semibold text-white/70 mt-1">Includes all 8 courses, Credly digital badge, monthly live masterclasses, and weekly mentor calls.</p>
              </div>
              <a href="#lead-form" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#e26e50]">
                Download Course Guide <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 7. Pricing & Payment Options */}
        <section id="pricing" className="bg-white px-5 py-14 sm:px-6 md:py-20 border-t border-gray-100 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <SectionEyebrow>Payment Options</SectionEyebrow>
              <h2 className="mb-4 text-3xl font-black leading-none tracking-tight text-[#1d3b56] md:text-5xl">Choose your payment option</h2>
              <p className="text-sm font-medium text-gray-500">All options include lifetime access, unlimited mentor support and instant course enrolment.</p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.promoCode)
                    setCopiedCode(true)
                    setTimeout(() => setCopiedCode(false), 2000)
                  }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#a6d5c7] bg-[#d4efe8]/50 px-4 py-2 text-xs font-bold text-[#1d3b56] transition hover:bg-[#d4efe8]/80 shadow-sm"
                >
                  <span>Use Coupon Code <strong className="font-mono text-[#1d3b56]">{offer.promoCode}</strong> at checkout!</span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
                </button>
              </div>
            </div>

            <div className="grid items-stretch gap-6 md:grid-cols-3">
              <div className="flex flex-col justify-between rounded-[2.5rem] bg-[#f7f9fa] p-8 shadow-sm border border-gray-100">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-slate-200 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-700">Upfront Offer</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">Upfront Payment</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>One simple payment</li>
                    <li>Lifetime Access</li>
                    <li>Claim promotional bonuses</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-gray-200/80 bg-white p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Upfront Rate</span>
                    <p className="text-2xl font-black text-gray-800">Best Value</p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">Includes 7-Day Guarantee.</p>
                  </div>
                </div>
                <a href="#lead-form" className="block w-full rounded-xl bg-[#1d3b56] py-4 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#f38669]">
                  Get Info Pack
                </a>
              </div>

              <div className="flex flex-col justify-between rounded-[2.5rem] bg-[#e9f5f1] p-8 shadow-sm border border-[#a6d5c7]/50">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-[#a6d5c7] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#1d3b56]">Afterpay</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">4 instalments</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>Interest-free fortnightly</li>
                    <li>Instant course access</li>
                    <li>Easy automated setup</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-[#a6d5c7]/50 bg-white p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#1d3b56]">Afterpay Payments</span>
                    <p className="text-2xl font-black text-gray-800">4 Payments</p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">Interest-free fortnightly.</p>
                  </div>
                </div>
                <a href="#lead-form" className="block w-full rounded-xl bg-[#a6d5c7] py-4 text-center text-xs font-bold uppercase tracking-wide text-[#1d3b56] transition hover:bg-[#a6d5c7]/80">
                  Get Info Pack
                </a>
              </div>

              <div className="relative flex flex-col justify-between rounded-[2.5rem] border border-amber-200 bg-amber-100/50 p-8 shadow-sm">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-amber-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Weekly Plan</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">$15 / week</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>Flexible Payment Plan</li>
                    <li>Lifetime Access</li>
                    <li>Unlimited Mentor Support</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-amber-200 bg-white p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Payment Plan From</span>
                    <p className="text-3xl font-black text-gray-800">$15 <span className="text-xs text-gray-400">/wk</span></p>
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

        {/* 8. Mentors Section */}
        <section id="mentor" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28 border-t border-gray-100">
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
                  When you enrol in our Social Media Masterclass & Mentorship program, you’re not just accessing expert-led content—you’re joining a supportive community of digital professionals. With live workshops and 1-on-1 mentoring, you’ll gain real-world insight from industry leaders.
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

        {/* 9. Interactive FAQs Accordion */}
        <section className="bg-white border-y border-gray-200/60 py-12 px-5 scroll-mt-28" id="inclusions-accordion">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  id: 'learn',
                  title: 'What You Will Learn',
                  content: (
                    <div className="space-y-3">
                      <p>This course bundle includes CPD-endorsed training across 8 core social media and digital marketing disciplines:</p>
                      <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li><strong>Social Media Strategy & Meta Advertising:</strong> Meta Business Suite setup, Ads Manager configuration, custom audience tracking pixels, campaign creation, budgeting, and performance analytics.</li>
                        <li><strong>AI Content Creation & Email Marketing:</strong> Strategy, AI prompt workflows, graphics design basics, email campaign automation, newsletter copy, and subscriber growth.</li>
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
                      <li>Full lifetime access to all 8 learning platform modules and future updates.</li>
                      <li>Monthly Live Masterclasses facilitated by social media & digital marketing experts.</li>
                      <li>Weekly Group Mentorship Q&A calls with direct mentor feedback on your campaigns.</li>
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

        {/* 10. Authentic Trustpilot Showcase */}
        <TrustpilotShowcase courseName="Social Media Marketing" />

        {/* 11. Final Form Area (Confidence Section) */}
        <section id="enrol" className="bg-[#fffae6] py-12 px-5 sm:px-6 md:py-24 scroll-mt-20">
          <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-[#1d3b56] sm:text-4xl md:text-6xl leading-[0.95]">
                Build Your <span className="font-serif italic text-emerald-800">Confidence</span>
              </h2>
              <p className="text-sm font-semibold leading-relaxed text-[#1d3b56]/75 sm:text-base">
                Take the first step today. Receive the comprehensive course topics, learning modules structure, payment plans, and active discounts guide in your email inbox immediately.
              </p>
              <div className="relative aspect-[1.33/1] rounded-[2rem] overflow-hidden border-8 border-white bg-slate-100 shadow-xl hidden md:block">
                <Image 
                  src="/oca-assets/info-pack-images.png" 
                  alt="Social media course guide info pack" 
                  fill 
                  className="object-cover" 
                  unoptimized
                />
              </div>
            </div>
            <div className="flex justify-center">
              <InfoPackForm title="Build Your Confidence" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <OcaFooter />
    </div>
  )
}
