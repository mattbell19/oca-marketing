'use client'

import React from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
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

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
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

const reasonOptions = [
  'Ready to Enrol',
  'Researching Study Options',
  'Need Price Information',
  'Looking To Get Advice',
  'Other'
]

const getOfferDeadline = () => {
  return new Date('2026-07-30T23:59:59+10:00') // July 30, 2026 AEST
}

const getOfferTimeLeft = (): TimeLeft => {
  const diff = getOfferDeadline().getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  }
}

const getOfferEndDateLabel = () => 'July 30'

const trackLeadSubmission = (formTitle: string) => {
  if (typeof window === 'undefined') return

  const trackingWindow = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }

  trackingWindow.dataLayer = trackingWindow.dataLayer || []
  trackingWindow.dataLayer.push({
    event: 'generate_lead',
    lead_type: 'mental_health_info_pack',
    form_title: formTitle,
    course: 'Mental Health, Psychology & Counselling Course Bundle'
  })

  trackingWindow.gtag?.('event', 'generate_lead', {
    event_category: 'lead',
    event_label: formTitle
  })

  trackingWindow.fbq?.('track', 'Lead', {
    content_name: formTitle,
    content_category: 'Mental Health Info Pack'
  })
}

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3 inline-flex rounded-full bg-[#f38669]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f38669] sm:px-4 sm:py-2 sm:text-[11px]">
    {children}
  </span>
)

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
      setMessage('Thanks. Your mental health course info pack request has been received.')
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

        <p className="text-center text-[10px] font-medium leading-relaxed text-[#1d3b56]/50">
          By submitting this form, you agree to receive relevant course information and occasional updates from us. You can unsubscribe at any time. View Online Courses Australia&apos;s terms of service and privacy policy for more information.
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
  ];

  return (
    <div className="w-full overflow-hidden">
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
    </div>
  )
}

export default function MentalHealthLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const offerEndDate = getOfferEndDateLabel()

  React.useEffect(() => {
    const updateCountdown = () => setTimeLeft(getOfferTimeLeft())
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  const timerValue = {
    days: timeLeft?.days ?? '--',
    hours: timeLeft?.hours ?? '--',
    minutes: timeLeft?.minutes ?? '--',
    seconds: timeLeft?.seconds ?? '--'
  }

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#1d3b56] selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
      <div className="sticky top-0 z-[120]">
        <div className="bg-[#a6d5c7] text-[#1d3b56] py-3 px-4 text-center font-bold text-xs sm:text-sm relative z-[100] shadow-sm flex flex-wrap gap-2 items-center justify-center">
          <Sparkles className="w-4 h-4 animate-bounce text-[#f38669]" />
          <span className="font-black uppercase tracking-wide">
            July Intake Closing 50% Off Sitewide
          </span>
          <span className="bg-[#1d3b56]/10 px-3 py-0.5 rounded text-xs">
            Ends July 30: {timerValue.days}d : {timerValue.hours}h : {timerValue.minutes}m : {timerValue.seconds}s
          </span>
        </div>

        <header className="border-b border-[#d4efe8] bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <a href="#top" className="relative h-9 w-36 shrink-0 md:h-10 md:w-44" aria-label="Online Courses Australia">
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
              <a href="#topics" className="transition hover:text-[#f38669]">Topics</a>
              <a href="#outcomes" className="transition hover:text-[#f38669]">Outcomes</a>
              <a href="#details" className="transition hover:text-[#f38669]">Details</a>
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
              <a href="#topics" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Topics</a>
              <a href="#outcomes" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Outcomes</a>
              <a href="#lead-form" onClick={closeMenu} className="rounded-xl bg-[#f38669] px-4 py-3 text-center text-white">Get Info Pack</a>
            </div>
          </motion.nav>
        )}
      </div>

      <main id="top">
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
                    navigator.clipboard.writeText('LAST100')
                    setCopiedCode(true)
                    setTimeout(() => setCopiedCode(false), 2000)
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#f38669] bg-[#feaf9d]/10 px-3 py-1.5 text-xs font-bold text-[#1d3b56] transition hover:bg-[#feaf9d]/20"
                >
                  <span>Promo Code: <code className="font-mono text-[#f38669]">LAST100</code></span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy & Apply'})</span>
                </button>
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#1d3b56]/70">Limited Time Offer</p>

              <div className="mt-5 max-w-xl rounded-2xl border border-[#f38669]/20 bg-white/70 p-4">
                <p className="text-sm font-black text-[#1d3b56]">July Intake Closing 50% Off Sitewide</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[#1d3b56]/70">
                  Download the course info pack for the latest pricing and discounts.
                </p>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 text-sm font-black text-[#1d3b56] sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Prior experience is NOT required</div>
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Self-paced with 1:1 support</div>
              </div>
            </div>

            <div id="lead-form" className="min-w-0 scroll-mt-28">
              <div className="relative mx-auto max-w-[620px]">
                <div className="absolute right-3 top-3 z-10 hidden items-center gap-1 rounded-full bg-white/90 px-3 py-2 text-[11px] font-black text-[#1d3b56] shadow-sm sm:flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-[#00b67a] text-[#00b67a]" />
                  ))}
                  <span className="ml-1">Trustpilot</span>
                </div>
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
                <div className="relative z-10 mx-auto -mt-7 max-w-[470px] md:-mt-12">
                  <InfoPackForm />
                </div>
              </div>
            </div>
          </div>
        </section>

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
                You’ll also develop a deeper understanding of your own mental well-being and learn strategies to support others.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                To ensure your success, all topics and study materials for the topics above were custom-made by mental health experts and are endorsed by Community Work Australia.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                We also don’t use dense academic textbooks. Instead, we design easy to follow student-friendly modules with exclusive movie-quality video sessions and tutorials, backed by Mentor support by email or phone Monday–Friday, plus live chat seven days a week.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                By the end of your study, you will have gained practical on-the-job skills and training that employers in the industry are looking for right now.
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

        <section className="bg-slate-50 border-y border-gray-200/60 py-12">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
              <div className="flex-shrink-0 text-center md:text-left">
                <span className="text-[10px] md:text-xs font-bold text-[#1d3b56]/40 uppercase tracking-[0.2em]">Trustpilot</span>
                <h3 className="text-xl md:text-3xl font-black text-[#1d3b56] mt-1 tracking-tight">What our students say</h3>
              </div>
              <div className="h-px w-full md:w-px md:h-10 bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-2xl font-bold text-[#1d3b56]">Excellent 4.8</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center text-white rounded-sm" title="5 star"><Star className="w-3.5 h-3.5 fill-current text-white" /></div>)}
                </div>
              </div>
            </div>
            <TrustpilotSlider />
          </div>
        </section>

        <section className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
            <div>
              <SectionEyebrow>Get 50% Off and Get Lifetime Access</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Get 50% Off and Get Lifetime Access
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                This course is currently 50% off for a limited time, with interest-free payment plan options available.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                You can also pay through a single payment upfront and get a discount so you won’t have to fork out thousands of dollars to upgrade your skills. We also offer Afterpay and Latitude Pay as alternatives.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                July Intake Closing is on now! Get 50% Off Sitewide. Enrol before the intake closes on July 30.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('LAST100')
                    setCopiedCode(true)
                    setTimeout(() => setCopiedCode(false), 2000)
                  }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#f38669] bg-[#feaf9d]/15 px-4 py-2 text-xs font-bold text-[#1d3b56] transition hover:bg-[#feaf9d]/25"
                >
                  <span>Use Coupon Code <strong className="font-mono text-[#f38669]">LAST100</strong> for 50% Off!</span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
                </button>
              </div>
              <h3 className="mt-8 text-2xl font-black tracking-[-0.02em] text-[#1d3b56]">Payment Options</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ['Upfront Payment', 'One easy upfront payment. Get our best available rate with no ongoing costs.'],
                  ['Afterpay', 'Four simple interest-free fortnightly instalments. Gain immediate access to your courses.'],
                  ['Weekly Payment Plan', 'Flexible interest-free weekly instalments starting from just $25 per week.']
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
              <h3 className="mt-3 text-3xl font-black leading-none">50% OFF</h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-white/75">
                July Intake Closing is on now! Get 50% Off Sitewide. Enrol before the intake closes on July 30.
              </p>
              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffdb71]">Offer ends</p>
                <p className="mt-1 text-lg font-black">{offerEndDate}</p>
                <p className="mt-1 font-mono text-sm">{timerValue.days}d : {timerValue.hours}h : {timerValue.minutes}m : {timerValue.seconds}s</p>
              </div>
              <a href="#lead-form" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f38669] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-[#e26e50]">
                Get more details in the course infopack. <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="topics" className="bg-[#1d3b56] px-5 py-14 text-white sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ffdb71]">6 Comprehensive Courses</span>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl">6 Comprehensive Courses, 1 Affordable Price</h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-white/75">
                You will learn skills and techniques every professional counsellor needs to build strong therapeutic relationships, and support individual well-being across a wide range of topics such as:
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
              <a href="#bottom-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#e26e50]">
                Get Full Topic List <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[2rem] bg-[#1d3b56] p-5 text-white shadow-xl sm:p-7">
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#d4efe8]">
                {isVideoPlaying ? (
                  <iframe
                    src="https://player.vimeo.com/video/511529141?autoplay=1"
                    title="Course preview video"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
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
              <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[#ffdb71]">Course preview</p>
            </div>

            <div>
              <SectionEyebrow>Take a quick look at what you can expect in this course</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Take a quick look at what you can expect in this course
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">Satisfaction Guaranteed!</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Exclusive movie-quality video sessions', 'Interactive content', 'Tutorials', 'Mentor support Monday–Friday', 'Live chat support 7 days a week'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#d4efe8]/45 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f38669]" />
                    <span className="text-sm font-black leading-snug text-[#1d3b56]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="bg-[#fff0c0] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionEyebrow>+ Career Outcomes</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                By the end of your study, you will have gained practical on-the-job skills and training that employers in the industry are looking for right now.
              </h2>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-[#1d3b56]/10 md:p-8">
              <h3 className="mb-5 text-2xl font-black text-[#1d3b56]">Career Outcomes</h3>
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

        <section className="bg-white px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
            <div>
              <SectionEyebrow>+ Course Fees Include</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Course Fees Include
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

        <section id="details" className="bg-white px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <SectionEyebrow>Course Details</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">Course Details</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Award,
                  title: 'Credentials',
                  text: 'This bundle includes 6 industry-endorsed courses in Counselling, Psychology, and Mental Health. You may choose the individual courses you need, or get the full bundle for the complete counselling skill set. You will gain an industry-endorsed micro-credential with a Course Completion Acknowledgement and shareable digital Industry Credential, plus a shareable & verifiable Digital Badge upon completion. Prior experience is NOT required to enrol in this course.'
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

        <section className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-7 shadow-sm lg:col-span-2">
              <SectionEyebrow>+ Course Provider</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl">
                Online Courses Australia
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                ONLINE COURSES AUSTRALIA 2026
              </p>
              <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-[#1d3b56]/55">PRIVACY POLICY | TERMS OF SERVICE</p>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70">Stay Connected</p>
              <p className="mt-2 text-sm font-bold text-[#1d3b56]/65">Instagram Facebook Tiktok Youtube</p>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70">Stay Informed</p>
              <p className="mt-2 text-sm font-bold text-[#1d3b56]/65">About Us · Contact Us · Online Courses · FAQs</p>
            </div>
            <div className="rounded-[2rem] bg-[#fff0c0] p-7 shadow-sm">
              <ShieldCheck className="mb-4 h-9 w-9 text-[#f38669]" />
              <h3 className="text-2xl font-black text-[#1d3b56]">7-day Money Back Guarantee</h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[#1d3b56]/70">7-day Money Back Guarantee</p>
            </div>
          </div>
        </section>

        <section className="bg-[#d4efe8] px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-[#1d3b56]/10 md:grid-cols-[0.85fr_1.15fr] md:p-10">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm overflow-hidden rounded-[2rem] bg-[#1d3b56] p-3 shadow-xl">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={MENTAL_HEALTH_IMAGES.counselling}
                    alt="One-to-one counselling support conversation"
                    fill
                    className="object-cover"
                    unoptimized
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
                Dr Golly is a Melbourne-based paediatrician and father of three. Specialising in anxiety, parental mental health, post-natal depression and unsettled babies and poor sleep.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                You have likely watched Dr Golly on TV; he has had many appearances across The Morning Show and Channel 9.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                Dr Golly currently runs two businesses: his private practice Cabrini and The Dr Golly Sleep Program specialising in unsettled babies and poor sleep.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                After a distinguished AFL career spanning 14 years with the North Melbourne and Sydney Swans Football Clubs, Wayne Schwass founded PukaUp, a social enterprise that focuses on mental health, emotional wellbeing and suicide prevention.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                Wayne has also become a leading mental health advocate after speaking publicly about his own experiences with mental health conditions in 2006.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                In April 2016, Jade Hameister became the youngest person in history to ski to the North Pole from anywhere outside the Last Degree. Her journey was captured in a National Geographic documentary that aired in 170 countries. In the 2019 Queen’s Birthday Honours, Jade was awarded an Order of Australia Medal for service to Polar Exploration.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                Jade is passionate about shifting the focus for young people from how they appear to the possibilities of what they can do.
              </p>
              <a href="#lead-form" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg transition hover:bg-[#e26e50]">
                Send Me The Info Pack <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#1d3b56] px-5 py-14 text-center text-white sm:px-6 md:py-20">
          <div className="mx-auto max-w-4xl">
            <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ffdb71]">Ready when you are</span>
            <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl">Get a Free Course Info Pack</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/75">
              Download the course info pack for the latest pricing and discounts.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start mt-8">
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#e26e50]">
                Get Info Pack <ArrowRight className="h-4 w-4" />
              </a>
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#1d3b56] shadow-xl transition hover:bg-[#fff0c0]">
                Book Call <Calendar className="h-4 w-4 text-[#f38669]" />
              </a>
            </div>
            <div className="mt-4 flex justify-center lg:justify-start items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('LAST100')
                  setCopiedCode(true)
                  setTimeout(() => setCopiedCode(false), 2000)
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#f38669] bg-[#feaf9d]/10 px-3 py-1.5 text-xs font-bold text-[#1d3b56] transition hover:bg-[#feaf9d]/20"
              >
                <span>Promo Code: <code className="font-mono text-[#f38669]">LAST100</code></span>
                <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <OcaFooter bookCallHref={BOOK_CALL_URL} showLinks={false} />
      <span className="sr-only">
        Endorsements, memberships and partnerships. CPD Accreditation. Training Excellence. Trustpilot - Excellent.
        Payment Methods + Secure Transactions. AfterpayApplePayVISAMastercardPayPalNortonPayRightCentrepay.
      </span>
    </div>
  )
}
