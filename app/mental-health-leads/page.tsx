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
  CreditCard,
  FileText,
  Menu,
  Monitor,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X
} from 'lucide-react'
import Image from 'next/image'
import OcaFooter from '../components/OcaFooter'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'
const CALENDLY_URL = 'https://calendly.com/online-courses-aus/careercall'
const MENTAL_HEALTH_IMAGES = {
  hero: '/oca-assets/mental-health/mh1.avif',
  endorsed: '/oca-assets/mental-health/mh2.png',
  group: '/oca-assets/mental-health/mh3.jpg',
  onlineStudy: '/oca-assets/mental-health/mh4.jpg',
  counselling: '/oca-assets/mental-health/mh5.jpg'
}

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

const studyFeatures = [
  'Self-paced',
  '100% online',
  '1:1 support',
  'Real-world Mentors',
  'Interactive content'
]

const courseTopics = [
  'Child & Adolescent Mental Health',
  'Mental Health in Adults',
  'Counselling Skills Micro-Credential',
  'Relationship Counselling Micro-Credential',
  'Counselling Career Sampler',
  'Mental Health Master Class Celebrity Mentor Series'
]

const feeInclusions = [
  'Lifetime access to our training resources throughout your study',
  'Mentor support by email or phone Monday–Friday, plus live chat seven days a week',
  'Course Completion Acknowledgement and shareable digital Industry Credential',
  'Shareable & verifiable Digital Badge upon completion',
  'Exclusive movie-quality video sessions and tutorials'
]

const careerOutcomes = [
  'Mental Health Support Pathway',
  'Counselling Pathway',
  'Community Services Pathway',
  'Relationship Support Pathway',
  'Youth Support Pathway',
  'Wellbeing Support Pathway',
  'Personal Development Pathway',
  'Further study pathway in counselling, psychology or mental health'
]

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3 inline-flex rounded-full bg-[#f38669]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f38669] sm:px-4 sm:py-2 sm:text-[11px]">
    {children}
  </span>
)

const trackLeadSubmission = (formTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', 'Lead', {
      content_name: 'Mental Health Course Bundle',
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
          course: 'Mental Health, Psychology & Counselling Course Bundle',
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
      window.location.assign('/thank-you?course=mental-health-leads')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="rounded-[2rem] border border-[#d4efe8] bg-white p-6 shadow-2xl shadow-[#1d3b56]/10 sm:p-8">
      <h2 className="text-2xl font-black text-[#1d3b56] sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm font-semibold text-[#1d3b56]/70">
        Fill in your details below to instantly download the full syllabus, study modules, and current promotional discounts.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-black uppercase tracking-wider text-[#1d3b56]">First name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={updateField('firstName')}
              placeholder="e.g. Sarah"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#1d3b56] outline-none transition focus:border-[#f38669] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-black uppercase tracking-wider text-[#1d3b56]">Last name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={updateField('lastName')}
              placeholder="e.g. Jenkins"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#1d3b56] outline-none transition focus:border-[#f38669] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-black uppercase tracking-wider text-[#1d3b56]">Email address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={updateField('email')}
            placeholder="e.g. sarah@example.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#1d3b56] outline-none transition focus:border-[#f38669] focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-black uppercase tracking-wider text-[#1d3b56]">Mobile number</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={updateField('phone')}
            placeholder="e.g. 0412 345 678"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#1d3b56] outline-none transition focus:border-[#f38669] focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-black uppercase tracking-wider text-[#1d3b56]">Reason for enquiry</label>
          <div className="relative">
            <select
              value={formData.enquiryReason}
              onChange={updateField('enquiryReason')}
              required
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#1d3b56] outline-none transition focus:border-[#f38669] focus:bg-white"
            >
              <option value="">Select an option</option>
              <option value="Ready to Enrol">Ready to Enrol</option>
              <option value="Researching Study Options">Researching Study Options</option>
              <option value="Need Price Information">Need Price Information</option>
              <option value="Looking To Get Advice">Looking To Get Advice</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1d3b56]/60" />
          </div>
        </div>

        <input
          type="text"
          value={formData.company}
          onChange={updateField('company')}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f38669] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-xl shadow-[#f38669]/25 transition hover:bg-[#e26e50] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending Details...' : 'Get Free Course Guide'}
          <ArrowRight className="h-4 w-4" />
        </button>

        {message && (
          <p className={`text-center text-xs font-bold ${status === 'error' ? 'text-rose-600' : 'text-emerald-700'}`}>
            {message}
          </p>
        )}

        <p className="text-center text-[10px] font-semibold text-[#1d3b56]/50">
          By clicking Get Free Course Guide, you agree to receive relevant study info and course updates from Online Courses Australia.
        </p>
      </form>
    </div>
  )
}

const TrustpilotSlider = () => {
  const reviews = [
    { name: "Anne", header: "Easy to use and understand", text: "Easy to use and understand", stars: 5, date: "4 hours ago" },
    { name: "Hana Nord", header: "Easy to navigate through and heaps of…", text: "Easy to navigate through and heaps of support", stars: 5, date: "21 hours ago" },
    { name: "Andrew", header: "Fantastic course for practical financial skills!", text: "I just completed the \"Prepare and Monitor Budgets\" certificate with OCA and couldn’t...", stars: 5, date: "2 days ago" },
    { name: "Aiyman Wajdan", header: "They helped a lot in my course really…", text: "They helped a lot in my course really good team and good option if you want to do cou...", stars: 5, date: "6 days ago" },
    { name: "sandybegmail.com", header: "The course coordinators were really…", text: "The course coordinators were really helpful when I needed to change direction in my c...", stars: 5, date: "6 days ago" },
    { name: "Hing Mui Chin", header: "Looking for the right course.....", text: "The course offers a highly comprehensive syllabus covering mental health, psychology...", stars: 4, date: "6 days ago" },
    { name: "Linda", header: "easy to follow and user friendly", text: "easy to follow and user friendly", stars: 5, date: "6 May" },
    { name: "Cassie", header: "The support is wonderful", text: "The support is wonderful and responses are quick , the content to learn is very imfor...", stars: 5, date: "6 May" },
  ]

  return (
    <a 
      href="https://au.trustpilot.com/review/onlinecoursesaustralia.edu.au?search=mental+"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full overflow-hidden cursor-pointer"
    >
      <div className="flex gap-4 animate-[scroll_60s_linear_infinite] hover:[animation-play-state:paused]">
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

export default function MentalHealthLandingPage() {
  const { offer, timeLeft } = useOffer('mental-health-leads')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const offerEndDate = offer.endDateLabel

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#1d3b56] selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
      {/* 1. Sticky Top Dynamic Offer Bar */}
      <div className="sticky top-0 z-[120]">
        <div className="bg-[#a6d5c7] text-[#1d3b56] py-3 px-4 text-center font-bold text-xs sm:text-sm relative z-[100] shadow-sm flex flex-wrap gap-2 items-center justify-center">
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
            <a href="#top" className="relative h-10 w-44 shrink-0 md:h-12 md:w-52" aria-label="Online Courses Australia">
              <Image
                src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png"
                alt="Online Courses Australia"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </a>

            <nav className="hidden items-center gap-6 text-sm font-black text-[#1d3b56]/75 lg:flex">
              <a href="#course" className="transition hover:text-[#f38669]">Course</a>
              <a href="#preview" className="transition hover:text-[#f38669]">Video Preview</a>
              <a href="#mentors" className="transition hover:text-[#f38669]">Mentors</a>
              <a href="#pricing" className="transition hover:text-[#f38669]">Pricing</a>
              <a href="#outcomes" className="transition hover:text-[#f38669]">Outcomes</a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-1 rounded-full bg-[#d4efe8]/70 px-3 py-2 text-[11px] font-black text-[#1d3b56]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-[#00b67a] text-[#00b67a]" />
                ))}
                <span className="ml-1">Trustpilot Excellent</span>
              </div>
              <a href="#lead-form" className="rounded-full bg-[#f38669] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-[#e26e50]">
                Get Info Pack
              </a>
            </div>

            <button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} className="rounded-full bg-[#d4efe8]/80 p-2 text-[#1d3b56] md:hidden" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {isMobileMenuOpen && (
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-b border-[#d4efe8] bg-white px-5 py-5 shadow-xl md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 text-base font-black text-[#1d3b56]">
              <a href="#course" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Course</a>
              <a href="#preview" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Video Preview</a>
              <a href="#mentors" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Mentors</a>
              <a href="#pricing" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Pricing</a>
              <a href="#outcomes" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Outcomes</a>
              <a href="#lead-form" onClick={closeMenu} className="rounded-xl bg-[#f38669] px-4 py-3 text-center text-white">Get Info Pack</a>
            </div>
          </motion.nav>
        )}
      </div>

      <main id="top">
        {/* 2. Hero & Lead Capture Section */}
        <section className="relative overflow-hidden bg-[#d4efe8] px-5 py-8 sm:px-6 md:py-12 lg:py-16">
          <div className="absolute -left-32 top-14 h-72 w-72 rounded-full bg-[#ffdb71]/35 blur-3xl" />
          <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#f38669]/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-10">
            <div className="min-w-0">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-sm sm:px-4 sm:text-xs">
                  <Award className="h-4 w-4 text-[#f38669]" />
                  Mental Health, Psychology & Counselling Course Bundle
                </span>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#f38669] sm:text-sm">A rewarding career starts here</p>
                <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#1d3b56] sm:text-5xl md:text-6xl lg:text-7xl">
                  Make a real impact in the lives and relationships of others
                </h1>
                <div className="relative mt-6 aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[#e9f5f1] shadow-sm lg:hidden">
                  <Image
                    src={MENTAL_HEALTH_IMAGES.hero}
                    alt="Mental health counselling student with course offer"
                    fill
                    className="object-contain object-bottom"
                    priority
                    unoptimized
                  />
                </div>
                <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Trained counsellors are needed now more than ever with more than 22,000 jobs expected to open up in Australia in 2026.
                </p>
                <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Take the first step today with the Mental Health, Psychology & Counselling Course Bundle - the 100% online course designed in collaboration with Australian experts in mental health and well-being.
                </p>
              </motion.div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#e26e50] sm:text-sm">
                  Get Info Pack <ArrowRight className="h-4 w-4" />
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-sm transition hover:bg-[#fff0c0] sm:text-sm">
                  Book a Career Call <Calendar className="h-4 w-4 text-[#f38669]" />
                </a>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.promoCode)
                    setCopiedCode(true)
                    setTimeout(() => setCopiedCode(false), 2000)
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#f38669] bg-[#feaf9d]/10 px-3 py-1.5 text-xs font-bold text-[#1d3b56] transition hover:bg-[#feaf9d]/20"
                >
                  <span>Promo Code: <code className="font-mono text-[#f38669]">{offer.promoCode}</code></span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy & Apply'})</span>
                </button>
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#1d3b56]/70">Limited Time Offer</p>

              <div className="mt-5 max-w-xl rounded-2xl border border-[#f38669]/20 bg-white/70 p-4">
                <p className="text-sm font-black text-[#1d3b56]">{offer.bannerText}</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[#1d3b56]/70">
                  {offer.detailText || 'Download the course info pack for the latest modules, weekly payment plans, and promo offers.'}
                </p>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 text-sm font-black text-[#1d3b56] sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Prior experience is NOT required</div>
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Self-paced with 1:1 support</div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative mx-auto max-w-[620px]">
                <div className="relative hidden aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[#e9f5f1] lg:block">
                  <Image
                    src={MENTAL_HEALTH_IMAGES.hero}
                    alt="Mental health counselling student with course offer"
                    fill
                    className="object-contain object-bottom"
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

        {/* 3. TRUSTPILOT SOCIAL PROOF CAROUSEL (Moved right under Hero!) */}
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

        {/* 4. COURSE VIDEO PREVIEW (Moved higher up for immediate engagement!) */}
        <section id="preview" className="bg-white px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[2rem] bg-[#1d3b56] p-5 text-white shadow-xl sm:p-7">
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#d4efe8]">
                {isVideoPlaying ? (
                  <iframe
                    src="https://iframe.videodelivery.net/7769200c00d41088be7488a4da68f288/iframe?autoplay=true"
                    title="Course preview video"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full min-h-[280px] flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <Image
                      src={MENTAL_HEALTH_IMAGES.onlineStudy}
                      alt="Preview of mental health course experience"
                      fill
                      className="object-cover opacity-80 transition-transform group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[#1d3b56]/45" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#f38669] shadow-2xl transition-transform group-hover:scale-110">
                      <PlayCircle className="h-11 w-11" />
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[#ffdb71]">Course preview video</p>
            </div>

            <div>
              <SectionEyebrow>Take a quick look at what you can expect</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Real-world training designed for your career success
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">Satisfaction Guaranteed!</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Exclusive movie-quality video sessions', 'Interactive student content', 'Practical tutorials & case studies', 'Mentor support Monday–Friday', 'Live chat support 7 days a week'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#d4efe8]/45 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f38669]" />
                    <span className="text-sm font-black leading-snug text-[#1d3b56]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. MASTERCLASS MENTORS (Moved higher up for instant authority & trust!) */}
        <section id="mentors" className="bg-[#d4efe8] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-[#1d3b56]/10 md:grid-cols-[0.85fr_1.15fr] md:p-10">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-[#1d3b56] p-3 shadow-xl">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/oca-assets/dr-golly.png"
                    alt="Dr. Golly Masterclass Mentor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-3 py-4 text-center text-white">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffdb71]">Masterclass Mentors</p>
                  <p className="mt-1 text-2xl font-black">Dr. Golly</p>
                </div>
              </div>
            </div>
            <div>
              <SectionEyebrow>Meet Your Masterclass Mentors</SectionEyebrow>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] text-[#1d3b56] md:text-4xl">Meet Your Masterclass Mentors: Dr. Golly, Wayne Schwass, and Jade Hameister OAM</h2>
              <p className="mt-3 text-sm font-bold leading-relaxed text-[#1d3b56]/80 italic">
                * Learn from industry leaders through our exclusive Masterclass video series. While your day-to-day study support is provided by our qualified student support mentors, these leading specialists host movie-quality video sessions to share their real-world experience.
              </p>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                Dr Golly is a highly respected pediatrician specialising in children’s acute and chronic medical conditions, offering invaluable guidance in managing sleep and behavioural issues for your child’s well-being.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                You have likely watched Dr Golly on TV; he has had many appearances across The Morning Show and Channel 9.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                After a distinguished AFL career spanning 14 years with the North Melbourne and Sydney Swans Football Clubs, Wayne Schwass founded PukaUp, a social enterprise that focuses on mental health, emotional wellbeing and suicide prevention.
              </p>
              <a href="#lead-form" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:bg-[#e26e50]">
                Send Me The Info Pack <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 6. Course Overview & 6 Comprehensive Topics */}
        <section id="course" className="bg-white px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionEyebrow>Course bundle</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Mental Health, Psychology & Counselling Course Bundle
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                This comprehensive course bundle equips you with the skills to recognise early mental wellness warning signs and provide meaningful, ongoing support to those in need.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                All topics and study materials were custom-made by mental health experts and are endorsed by Community Work Australia.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                We design easy to follow student-friendly modules with exclusive video sessions, backed by Mentor support by email or phone Monday–Friday, plus live chat seven days a week.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#d4efe8] bg-[#f7f9fa] p-3 shadow-xl shadow-[#1d3b56]/10">
              <div className="relative aspect-[1.24/1] overflow-hidden rounded-[1.6rem]">
                <Image
                  src={MENTAL_HEALTH_IMAGES.endorsed}
                  alt="Mental health course endorsed by Community Work Australia"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {studyFeatures.map((feature) => (
                  <div key={feature} className="rounded-2xl bg-white p-4">
                    <CheckCircle2 className="mb-3 h-5 w-5 text-[#f38669]" />
                    <h3 className="text-sm font-black text-[#1d3b56]">{feature}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Topics Breakdown */}
        <section id="topics" className="bg-[#1d3b56] px-5 py-14 text-white sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ffdb71]">6 Comprehensive Courses</span>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl">6 Comprehensive Courses, 1 Affordable Price</h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-white/75">
                You will learn skills and techniques every professional counsellor needs to build strong therapeutic relationships and support individual well-being across a wide range of topics:
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {courseTopics.map((topic, index) => (
                <div key={topic} className="rounded-2xl border border-white/10 bg-white/8 p-5">
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffdb71] text-sm font-black text-[#1d3b56]">{index + 1}</span>
                  <p className="text-sm font-black leading-snug text-white">{topic}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="mb-5 text-sm font-semibold text-white/75">View the full list of topics with the complete course outline in the info pack below:</p>
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#e26e50]">
                Get Full Topic List <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 8. MID-PAGE OFFER & PAYMENT PATHWAYS (Fixed $15/wk and TABLET offer) */}
        <section id="pricing" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 border-b border-gray-150/60 scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
            <div>
              <SectionEyebrow>Flexible Payment Pathways</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Study from just $15 per week with lifetime access
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                This course bundle is currently available with flexible interest-free payment options and special promotional offers.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                You can pay upfront to claim your bonus offer, or spread the cost with interest-free weekly instalments or Afterpay.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                {offer.bannerText} is on now! Enrol before the intake closes on {offer.endDateLabel}.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.promoCode)
                    setCopiedCode(true)
                    setTimeout(() => setCopiedCode(false), 2000)
                  }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#f38669] bg-[#feaf9d]/15 px-4 py-2 text-xs font-bold text-[#1d3b56] transition hover:bg-[#feaf9d]/25"
                >
                  <span>Use Coupon Code <strong className="font-mono text-[#f38669]">{offer.promoCode}</strong> at checkout!</span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
                </button>
              </div>
              <h3 className="mt-8 text-2xl font-black tracking-[-0.02em] text-[#1d3b56]">Payment Options</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ['Upfront Payment', 'One easy upfront payment. Claim your promotional offer with no ongoing costs.'],
                  ['Afterpay', 'Four simple interest-free fortnightly instalments. Gain immediate access to all modules.'],
                  ['Weekly Payment Plan', 'Flexible interest-free weekly instalments starting from just $15 per week.']
                ].map(([title, text]) => (
                  <div key={title} className="rounded-[1.5rem] border border-[#d4efe8] bg-white p-5 shadow-sm">
                    <CreditCard className="mb-3 h-6 w-6 text-[#f38669]" />
                    <h3 className="text-lg font-black text-[#1d3b56]">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[#1d3b56]/65">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-[#1d3b56] p-6 text-white shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ffdb71]">Current offer</p>
              <h3 className="mt-3 text-3xl font-black leading-none">{offer.promoCode === 'TABLET' ? 'FREE SAMSUNG TABLET' : (offer.discountText ? `${offer.discountText} OFF` : 'Special Promo')}</h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-white/75">
                {offer.detailText || offer.bannerText}
              </p>
              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffdb71]">Offer ends</p>
                <p className="mt-1 text-lg font-black">{offerEndDate}</p>
                <p className="mt-1 font-mono text-sm">{timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s</p>
              </div>
              <a href="#lead-form" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f38669] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-[#e26e50]">
                Get more details in the course infopack <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 9. Career Outcomes & Pathways */}
        <section id="outcomes" className="bg-[#fff0c0] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionEyebrow>+ Career Outcomes</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Gain practical on-the-job skills and credentials that Australian employers are looking for right now.
              </h2>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-[#1d3b56]/10 md:p-8">
              <h3 className="mb-5 text-2xl font-black text-[#1d3b56]">Career Pathways</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {careerOutcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 rounded-xl bg-[#d4efe8]/45 p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f38669]" />
                    <span className="text-sm font-black leading-snug text-[#1d3b56]">{outcome}</span>
                  </div>
                ))}
              </div>
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={MENTAL_HEALTH_IMAGES.group}
                  alt="Group counselling and mental health support session"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* 10. Course Fees Include */}
        <section className="bg-white px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
            <div>
              <SectionEyebrow>+ Course Fees Include</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Everything Included In Your Enrolment
              </h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {feeInclusions.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#d4efe8] bg-[#f7f9fa] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f38669]" />
                    <span className="text-sm font-black leading-snug text-[#1d3b56]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="bottom-form" className="min-w-0 scroll-mt-28">
              <InfoPackForm title="Send Me The Full Course Outline" />
            </div>
          </div>
        </section>

        {/* 11. Course Details Grid */}
        <section id="details" className="bg-white px-5 py-14 sm:px-6 md:py-20 border-t border-gray-100 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <SectionEyebrow>Course Details</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">Delivery & Credentials</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Award,
                  title: 'Credentials',
                  text: 'This bundle includes 6 industry-endorsed courses in Counselling, Psychology, and Mental Health. You will gain an industry-endorsed micro-credential with a Course Completion Acknowledgement and shareable digital Industry Credential, plus a shareable & verifiable Digital Badge upon completion.'
                },
                {
                  icon: Monitor,
                  title: 'Delivery',
                  text: 'Flexible, online, self-paced learning with dedicated student support from a Mentor by email or phone Monday–Friday, plus live chat seven days a week.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Duration',
                  text: 'This course takes approximately 310 study hours to complete. Study at your own pace with no deadlines. Enjoy the flexibility of online learning with lifetime access to our training resources throughout your study.'
                }
              ].map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-[#d4efe8] bg-[#f7f9fa] p-7">
                  <item.icon className="mb-5 h-8 w-8 text-[#f38669]" />
                  <h3 className="text-2xl font-black text-[#1d3b56]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-[#1d3b56]/65">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Bottom CTA Banner */}
        <section className="bg-[#1d3b56] px-5 py-14 text-center text-white sm:px-6 md:py-20">
          <div className="mx-auto max-w-4xl">
            <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ffdb71]">Ready when you are</span>
            <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl">Get Your Free Mental Health Course Guide</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/75">
              Download the comprehensive course syllabus, learning modules structure, payment plans, and active discounts guide in your email inbox immediately.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center mt-8">
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#e26e50]">
                Get Info Pack <ArrowRight className="h-4 w-4" />
              </a>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#1d3b56] shadow-xl transition hover:bg-[#fff0c0]">
                Book a Career Call <Calendar className="h-4 w-4 text-[#f38669]" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <OcaFooter bookCallHref={BOOK_CALL_URL} />
    </div>
  )
}
