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
const BUSINESS_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  endorsed: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  miranda: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
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

const reasonOptions = [
  'Start My Own Business',
  'Advance Corporate Career',
  'Upskill & Personal Growth',
  'Retraining / Career Change'
]

const studyFeatures = [
  '9 In-Demand Courses Included',
  'Interest-Free Payment Plans',
  'Dedicated Head Mentor Miranda',
  'Study At Your Own Pace'
]

const courseInclusions = [
  'How to Lead and Manage People',
  'Support Staff Recruitment, Selection & Induction',
  'Effective Meeting Management',
  'Managing Quality Customer Service',
  'Continuous Improvement Processes',
  'Budget Preparation and Monitoring',
  'Marketing & Sales Strategies',
  'Business Administration & Writing Plans'
]

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-[#f38669]">
    + {children}
  </span>
)

const trackLeadSubmission = (formTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', 'Lead', {
      content_name: 'Business Course Bundle',
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
          course: 'Business Course Bundle',
          sourcePage: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : ''
        })
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed')
      }

      setStatus('success')
      setMessage('Thanks. Your business bundle course info pack request has been received.')
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
          <a 
            key={i} 
            href="https://au.trustpilot.com/review/onlinecoursesaustralia.edu.au"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-72 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition cursor-pointer"
          >
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
          </a>
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

export default function BusinessLandingPage() {
  const { offer, timeLeft } = useOffer('business-bundle')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>('topics')

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#1d3b56] selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
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
            <a href="https://onlinecoursesaustralia.edu.au" target="_blank" rel="noopener noreferrer" className="relative h-9 w-36 shrink-0 md:h-10 md:w-44" aria-label="Online Courses Australia">
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
                  Business Course Bundle
                </span>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#f38669] sm:text-sm">Learn from Leading Industry Experts</p>
                <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#1d3b56] sm:text-5xl md:text-6xl lg:text-7xl">
                  Ready to maximise your potential & gain in-demand business skills?
                </h1>
                <div className="relative mt-6 aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[#e9f5f1] shadow-sm lg:hidden">
                  <Image
                    src={BUSINESS_IMAGES.hero}
                    alt="Professional business student"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Whether you’re looking to launch your own business or secure a top executive position, this comprehensive course is designed for you.
                </p>
                <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Master the core principles of business planning, management, marketing, and administration, while gaining the essential knowledge to upskill and succeed.
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
                  className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#a6d5c7] bg-[#d4efe8] px-3 py-1.5 text-xs font-bold text-[#1d3b56] transition hover:bg-[#d4efe8]/70 shadow-sm"
                >
                  <span>Promo Code: <code className="font-mono text-[#1d3b56]">{offer.promoCode}</code></span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy & Apply'})</span>
                </button>
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#1d3b56]/70">Limited Time Offer</p>

              <div className="mt-5 max-w-xl rounded-2xl border border-[#f38669]/20 bg-white/70 p-4">
                <p className="text-sm font-black text-[#1d3b56]">Start for Only $15/Week and Get Lifetime Access</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[#1d3b56]/70">
                  Download the course info pack for the latest pricing, discounts and flexible payment plans.
                </p>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 text-sm font-black text-[#1d3b56] sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Prior experience is NOT required</div>
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Self-paced with 1:1 support</div>
              </div>
            </div>

            <div id="lead-form" className="min-w-0 scroll-mt-28">
              <div className="relative mx-auto max-w-[620px]">
                <div className="relative hidden aspect-[1.05/1] overflow-hidden rounded-[2rem] bg-[#e9f5f1] lg:block">
                  <Image
                    src={BUSINESS_IMAGES.hero}
                    alt="Professional business student"
                    fill
                    className="object-cover"
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
                Business Course Bundle
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">
                Master the core principles of business planning, management, marketing, and administration, while gaining the essential knowledge to upskill.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                Whether you’re launching your own business or advancing your corporate career, this bundle provides a well-rounded foundation for success.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                We also don’t use thick, dense academic textbooks. Instead, we design easy-to-follow, student-friendly modules with exclusive movie-quality video sessions and tutorials, backed by Mentor support by email or phone Monday–Friday, plus live chat seven days a week.
              </p>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#1d3b56]/65">
                By the end of your study, you will have gained practical on-the-job skills and training that employers in the industry are looking for right now.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#d4efe8] bg-[#f7f9fa] p-3 shadow-xl shadow-[#1d3b56]/10">
              <div className="relative aspect-[1.24/1] overflow-hidden rounded-[1.6rem]">
                <Image
                  src={BUSINESS_IMAGES.endorsed}
                  alt="Business planning and execution"
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

        <section id="topics" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <SectionEyebrow>Course Syllabus</SectionEyebrow>
              <h2 className="text-3xl font-black leading-none tracking-[-0.03em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                What you will learn
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-relaxed text-gray-500 sm:text-base">
                This comprehensive short course bundle includes 9 courses covering 32 essential topics.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courseInclusions.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#f38669]" />
                  <span className="text-sm font-bold leading-normal text-[#1d3b56]">{topic}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <a href="#lead-form" className="inline-flex items-center gap-2 rounded-full bg-[#1d3b56] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-[#f38669]">
                Download Outline PDF <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="outcomes" className="bg-white px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionEyebrow>Course Credentials</SectionEyebrow>
              <h2 className="text-3xl font-black leading-none tracking-[-0.03em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Course breakdown
              </h2>
            </div>

            <div className="mt-10 space-y-4">
              {[
                {
                  id: 'topics',
                  label: '32 Essential Learning Topics',
                  content: 'Learn how to lead and manage people, support staff recruitment, manage meetings, budgets, and marketing. Delves deep into 32 key areas to ensure you are fully prepared.'
                },
                {
                  id: 'credentials',
                  label: 'Verifiable Credentials & Digital Badge',
                  content: 'Upon completion, you will gain an industry-endorsed micro-credential with a course completion acknowledgement, plus a shareable & verifiable Digital Badge from Credly to display on LinkedIn.'
                },
                {
                  id: 'delivery',
                  label: 'Delivery & Dedicated Mentor Support',
                  content: 'Flexible, 100% online, self-paced learning with dedicated student support from a mentor by email or phone (Mon-Fri), or contact us through live chat 7 days a week.'
                },
                {
                  id: 'duration',
                  label: 'Duration & Study Hours',
                  content: 'This course takes approximately 300 study hours to complete. Study at your own pace with no deadlines. Enjoy the flexibility of online learning with lifetime access.'
                }
              ].map((acc) => (
                <div key={acc.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-[#f7f9fa]">
                  <button
                    type="button"
                    onClick={() => setActiveAccordion((curr) => (curr === acc.id ? null : acc.id))}
                    className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-black text-[#1d3b56] transition hover:bg-slate-50"
                  >
                    <span>{acc.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${activeAccordion === acc.id ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === acc.id && (
                    <div className="px-6 pb-5 text-sm font-semibold leading-relaxed text-gray-500">
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="mentor" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="relative lg:col-span-5">
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] border-[8px] border-white shadow-xl aspect-[3/4]">
                  <Image
                    src={BUSINESS_IMAGES.miranda}
                    alt="Head Mentor Miranda"
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <SectionEyebrow>Meet Your Head Mentor</SectionEyebrow>
                  <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] text-[#1d3b56] md:text-4xl">
                    Miranda — Head Mentor
                  </h2>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-gray-600 sm:text-base">
                  Hello, I’m Miranda. I’m here to guide, support, and empower you every step of the way. My passion has always been helping others unlock their potential. With years of experience across coaching, business, and mentoring, I understand the challenges of starting something new.
                </p>
                <p className="text-sm font-semibold leading-relaxed text-gray-600 sm:text-base">
                  Success isn’t just about knowledge, it’s about confidence. That’s why I take a hands-on, personalised approach, ensuring you feel encouraged, capable, and connected. I have a knack for breaking down complex concepts into real-world skills, helping you apply what you learn in a way that feels natural. I&apos;m here to answer your questions, guide you through challenges, and connect you with resources.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    '1:1 Study Support',
                    'Direct Mentor Feedback',
                    'Real-World Coaching Expertise',
                    'Always Support, Never Alone'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f38669]" />
                      <span className="text-sm font-bold text-[#1d3b56]">{item}</span>
                    </div>
                  ))}
                </div>
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
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black uppercase tracking-widest text-[#00b67a]">Excellent 4.8</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center text-white rounded-sm">
                      <Star className="w-3.5 h-3.5 fill-current text-white" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <TrustpilotSlider />
          </div>
        </section>

        <section id="details" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <SectionEyebrow>Pricing Plans</SectionEyebrow>
              <h2 className="mb-4 text-4xl font-black leading-none tracking-tight text-[#1d3b56] md:text-6xl">Choose your payment option</h2>
              <p className="text-sm font-medium text-gray-500">All options include lifetime access, unlimited support and instant course enrolment.</p>
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
                  <span>Use Coupon Code <strong className="font-mono text-[#1d3b56]">{offer.promoCode}</strong> for 50% Off!</span>
                  <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
                </button>
              </div>
            </div>

            <div className="grid items-stretch gap-8 md:grid-cols-3">
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
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">$15 / week</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>Flexible Payment Plan</li>
                    <li>Lifetime Access</li>
                    <li>Unlimited Support</li>
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
                <Image src="/oca-assets/info-pack-images.png" alt="Download your free business info pack" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
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
