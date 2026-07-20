'use client'

import React from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Award,
  BookOpen,
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
  Star,
  Users,
  X
} from 'lucide-react'
import Image from 'next/image'
import OcaFooter from '../components/OcaFooter'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'
const CALENDLY_URL = 'https://calendly.com/online-courses-aus/careercall'

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

const courseTopics = [
  'Introduction to Criminology and Profiling',
  'Classification of Crime',
  'Violent Crimes',
  'The Crime Scene',
  'And many more...'
]

const studyFeatures = [
  'Self-paced',
  '100% online',
  '1:1 support',
  'Real-world tutors',
  'Interactive content'
]

const careerOutcomes = [
  'Criminologist',
  'Crime Analyst',
  'Forensic Psychology Pathway',
  'Probation and Community Control Officer',
  'Correctional Treatment Specialist',
  'Crime Scene Investigator',
  'Juvenile Justice Specialist',
  'Policy Advisor',
  'Private Investigator',
  'Legal Advisor',
  'Researcher',
  'Lecturer or Academic',
  'Community Outreach Coordinator',
  'Loss Prevention Specialist',
  'Victim Advocate'
]

const feeInclusions = [
  'Lifetime access to course resources',
  'All required study materials and notes',
  'Tutor support for course and career questions',
  'Course completion document',
  'Shareable and verifiable Digital Badge from Credly',
  'Student-friendly video sessions, quizzes and case studies'
]

const reasonOptions = [
  'Ready to Enrol',
  'Researching Study Options',
  'Need Price Information',
  'Looking To Get Advice',
  'Other'
]

const getOfferDeadline = () => {
  const now = new Date()
  const deadline = new Date(now)
  const daysUntilThursday = (4 - now.getDay() + 7) % 7
  deadline.setDate(now.getDate() + daysUntilThursday)
  deadline.setHours(23, 59, 59, 999)

  if (deadline.getTime() <= now.getTime()) {
    deadline.setDate(deadline.getDate() + 7)
  }

  return deadline
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

const getOfferEndDateLabel = () =>
  new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(getOfferDeadline())

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
    lead_type: 'criminology_info_pack',
    form_title: formTitle,
    course: 'Criminology & Psychology Course Bundle'
  })

  trackingWindow.gtag?.('event', 'generate_lead', {
    event_category: 'lead',
    event_label: formTitle
  })

  trackingWindow.fbq?.('track', 'Lead', {
    content_name: formTitle,
    content_category: 'Criminology Info Pack'
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
          course: 'Criminology & Psychology Course Bundle',
          sourcePage: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : ''
        })
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed')
      }

      setStatus('success')
      setMessage('Thanks. Your criminology info pack request has been received.')
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
          Please fill out the details below to receive your free course into pack instantly!
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

export default function CriminologyLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(null)
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
        <div className="bg-[#1d3b56] px-4 py-2.5 text-white shadow-sm">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 text-center text-[10px] font-black uppercase tracking-[0.1em] sm:justify-between sm:text-xs">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#ffdb71]" />
              Code: <span className="rounded bg-[#ffdb71] px-2 py-1 text-[#1d3b56]">EOFY</span>
            </span>
            <span className="font-mono normal-case tracking-normal">
              Ends {offerEndDate}: {timerValue.days}d : {timerValue.hours}h : {timerValue.minutes}m : {timerValue.seconds}s
            </span>
          </div>
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

          <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-10">
            <div className="min-w-0">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-sm sm:px-4 sm:text-xs">
                  <Award className="h-4 w-4 text-[#f38669]" />
                  Criminology & Psychology Bundle
                </span>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#f38669] sm:text-sm">A rewarding career starts here</p>
                <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#1d3b56] sm:text-5xl md:text-6xl lg:text-7xl">
                  Upgrade Your Knowledge in <span className="font-serif italic font-normal">Criminology</span>
                </h1>
                <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Are you fascinated by true crime or investigative mysteries, and want to level up your knowledge?
                </p>
                <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Leverage your analytical mind and curiosity by diving into the world of criminology, and taking the first step of gaining an industry-leading credential.
                </p>
              </motion.div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-xl transition hover:bg-[#e26e50] sm:text-sm">
                  Get Info Pack <ArrowRight className="h-4 w-4" />
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-sm transition hover:bg-[#fff0c0] sm:text-sm">
                  Book a Call <Calendar className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#1d3b56]/70">Afterpay Available</p>

              <div className="mt-5 max-w-xl rounded-2xl border border-[#f38669]/20 bg-white/70 p-4">
                <p className="text-sm font-black text-[#1d3b56]">Tax Back Sale: Get $500 off this course.</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[#1d3b56]/70">
                  Download the course info pack for the latest pricing and discounts.
                </p>
              </div>

              <div className="mt-8 hidden max-w-xl items-center gap-4 rounded-[2rem] bg-white/60 p-3 shadow-sm ring-1 ring-white/70 md:flex">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl">
                  <Image
                    src="/oca-assets/criminology-hero-police.webp"
                    alt="Police officer representing criminology and justice pathways"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f38669]">No prior experience required</p>
                  <p className="mt-1 text-sm font-bold leading-relaxed text-[#1d3b56]/75">Start anytime with flexible online learning and support.</p>
                </div>
              </div>
            </div>

            <div id="lead-form" className="min-w-0">
              <div className="relative mx-auto mb-5 aspect-[16/9] w-full max-w-[430px] overflow-hidden rounded-[1.75rem] border-[7px] border-white shadow-xl md:hidden">
                <Image
                  src="/oca-assets/criminology-hero-police.webp"
                  alt="Police officer representing criminology and justice pathways"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#f38669]">No prior experience required</p>
                  <p className="mt-1 text-xs font-black text-[#1d3b56]">Start anytime with flexible online learning.</p>
                </div>
              </div>
              <InfoPackForm />
            </div>
          </div>
        </section>

        <section id="course" className="bg-white px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionEyebrow>Course bundle</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Criminology & Psychology Course Bundle
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                This course will give you practical skills whether you&apos;re looking to level up your knowledge in criminology, or want to start a career in crime analysis, psychological profiling, or policy research.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                We designed this course with Aussie experts to develop your analytical mind into skills that can make an impact in society and your community.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                When you complete this course, you will be ready to take on roles in law enforcement agencies, government bodies, community programs, and research organisations.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                We also don’t use thick academic textbooks.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                Instead, we design easy to follow student-friendly modules with exclusive movie-quality video sessions and tutorials, backed by 24/7 student support.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {studyFeatures.map((feature) => (
                <div key={feature} className="rounded-[1.5rem] border border-[#d4efe8] bg-[#f7f9fa] p-6">
                  <CheckCircle2 className="mb-4 h-7 w-7 text-[#f38669]" />
                  <h3 className="text-xl font-black text-[#1d3b56]">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
            <div>
              <SectionEyebrow>Start Learning Today</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Start Learning Today
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                Multiple payment options available. You can pay through a single payment upfront and get a discount so you won’t have to fork out thousands of dollars to upgrade your skills. We also offer Afterpay and Latitude Pay as alternatives.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                Our Tax Back Sale is on now! Get $500 off this course. Enrol now before 9 July 2026.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                Download the course info pack for the latest pricing and discounts.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ['Upfront Payment', 'Upfront Payment, Afterpay or Latitude Pay.'],
                  ['Afterpay', 'Upfront Payment, Afterpay or Latitude Pay.'],
                  ['Latitude Pay', 'Upfront Payment, Afterpay or Latitude Pay.']
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
              <h3 className="mt-3 text-3xl font-black leading-none">Save $500</h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-white/75">
                Our Tax Back Sale is on now! Get $500 off this course. Enrol now before 9 July 2026.
              </p>
              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffdb71]">Offer ends</p>
                <p className="mt-1 text-lg font-black">{offerEndDate}</p>
                <p className="mt-1 font-mono text-sm">{timerValue.days}d : {timerValue.hours}h : {timerValue.minutes}m : {timerValue.seconds}s</p>
              </div>
              <a href="#lead-form" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f38669] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-[#e26e50]">
                Get more details in the course infopack <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="topics" className="bg-[#1d3b56] px-5 py-14 text-white sm:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <span className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ffdb71]">+ What You Will Learn</span>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl">You will learn:</h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-white/75">
                View the full list of topics with the complete course outline in the info pack below:
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
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#e26e50]">
                Get Full Topic List <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[2rem] bg-[#1d3b56] p-5 text-white shadow-xl sm:p-7">
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#d4efe8]">
                <Image
                  src="/oca-assets/criminology-hero-police.webp"
                  alt="Preview of criminology course experience"
                  fill
                  className="object-cover opacity-80"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#1d3b56]/45" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#f38669] shadow-2xl">
                  <PlayCircle className="h-11 w-11" />
                </div>
              </div>
              <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[#ffdb71]">Course preview</p>
            </div>

            <div>
              <SectionEyebrow>What to expect</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Take a quick look at what you can expect in this course.
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">Satisfaction Guaranteed!</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Movie-quality video sessions', 'Interactive content and quizzes', 'Case-study style learning', '24/7 student support'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#d4efe8]/45 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f38669]" />
                    <span className="text-sm font-black leading-snug text-[#1d3b56]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="bg-[#fff0c0] px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionEyebrow>Career pathways</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Build knowledge for justice, research and community-focused roles.
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">+ Career Outcomes</p>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-[#1d3b56]/10 md:p-8">
              <h3 className="mb-5 text-2xl font-black text-[#1d3b56]">Potential outcomes include:</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {careerOutcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 rounded-xl bg-[#d4efe8]/45 p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f38669]" />
                    <span className="text-sm font-black leading-snug text-[#1d3b56]">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
            <div>
              <SectionEyebrow>+ Course Fees Include</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Everything you need to study with confidence.
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

            <InfoPackForm title="Send Me The Full Course Outline" />
          </div>
        </section>

        <section id="details" className="bg-white px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <SectionEyebrow>Course Details</SectionEyebrow>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">Everything you need to know.</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Award,
                  title: 'Credentials',
                  text: 'This bundle includes industry-leading and CPD-endorsed courses in Criminology and Criminal Psychology. You will gain an industry-endorsed micro-credential with a course completion document, plus a shareable & verifiable Digital Badge from Credly upon completion. Prior experience is NOT required to enrol in this course.'
                },
                {
                  icon: Monitor,
                  title: 'Delivery',
                  text: 'Flexible, online, self-paced learning with dedicated student support from a tutor by email or phone (Mon-Fri), or contact us through live chat 7 days a week.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Duration',
                  text: 'This course takes approximately 47 study hours to complete. Study at your own pace with no deadlines. Enjoy the flexibility of online learning with lifetime access to our training resources throughout your study.'
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
              <h3 className="text-2xl font-black text-[#1d3b56]">7-day money back guarantee</h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[#1d3b56]/70">
                7-day Money Back Guarantee
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#d4efe8] px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-[#1d3b56]/10 md:grid-cols-[0.85fr_1.15fr] md:p-10">
            <div className="flex items-center justify-center">
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-[#1d3b56] p-6 text-center text-white shadow-xl">
                <BookOpen className="mb-3 h-9 w-9 text-[#ffdb71]" />
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffdb71]">Head mentor</p>
                <p className="mt-1 text-3xl font-black">Miranda</p>
              </div>
            </div>
            <div>
              <SectionEyebrow>Meet Your Head Mentor, Miranda</SectionEyebrow>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] text-[#1d3b56] md:text-4xl">Meet Your Head Mentor, Miranda</h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                Hello, I’m Miranda—I’m here to guide, support, and empower you every step of the way. My passion has always been helping others unlock their potential. With years of experience across coaching, business, and mentoring, I understand the challenges of starting something new. That’s why I’m committed to making your learning journey feel achievable, inspiring, and—most importantly—supported.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#1d3b56]/70">
                Success isn’t just about knowledge—it’s about confidence. That’s why I take a hands-on, personalised approach, ensuring you feel encouraged, capable, and connected. I have a knack for breaking down complex concepts into real-world skills, helping you apply what you learn in a way that feels natural. Learning is easier when you know you’re not alone. I’m here to answer your questions, guide you through challenges, and connect you with the right resources when you need them. Whether you’re transitioning careers, upskilling, or igniting your passion, I’ll be with you every step of the way.
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
            <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl">Get the full Criminology Course Bundle guide.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-white/75">
              See the complete topic list, course details, payment options and study support before you decide.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl transition hover:bg-[#e26e50]">
                Get Info Pack <ArrowRight className="h-4 w-4" />
              </a>
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#1d3b56] shadow-xl transition hover:bg-[#fff0c0]">
                Book a Call <Calendar className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <OcaFooter bookCallHref={BOOK_CALL_URL} showLinks={false} />
      <span className="sr-only">Payment Methods + Secure Transactions</span>
    </div>
  )
}
