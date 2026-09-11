'use client'

import React, { useState } from 'react'
import { useOffer } from '../components/useOffer'
import { motion } from 'motion/react'
import { 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Award, 
  Clock, 
  ChevronDown, 
  Menu, 
  X, 
  Sprout, 
  Calendar, 
  Leaf, 
  Sparkles,
  CreditCard,
  FileText,
  Phone,
  ShieldCheck
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import OcaFooter from '../components/OcaFooter'
import TrustpilotShowcase from '../components/TrustpilotShowcase'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'
const CALENDLY_URL = 'https://calendly.com/online-courses-aus/careercall'
const HORTICULTURE_THANK_YOU_URL = '/horticulture-thank-you'

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

const trackLeadSubmission = (formTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', 'Lead', {
      content_name: 'Horticulture Essentials Course Bundle',
      content_category: 'Lead Gen',
      value: 0.0,
      currency: 'AUD',
      form_title: formTitle
    })
  }
}

const InfoPackForm = ({ title = "Get a Free Course Info Pack" }) => {
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
          course: 'Horticulture Essentials Course Bundle',
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
      window.location.assign(HORTICULTURE_THANK_YOU_URL)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-[#fff0c0] p-6 md:p-10 lg:p-12 rounded-2xl shadow-sm border border-[#ffdb71] w-full max-w-[540px] mx-auto lg:mx-0">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-black text-[#1d3b56] mb-1.5 tracking-tight">{title}</h3>
        <p className="text-xs md:text-sm text-gray-600 font-medium leading-snug">Please fill out the details below to receive your free course info pack instantly!</p>
      </div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input name="company" type="text" value={formData.company} onChange={updateField('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input name="firstName" type="text" placeholder="First Name *" value={formData.firstName} onChange={updateField('firstName')} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm bg-white" required />
        <input name="lastName" type="text" placeholder="Last Name *" value={formData.lastName} onChange={updateField('lastName')} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm bg-white" required />
        <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={updateField('email')} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm bg-white" required />
        <input name="phone" type="tel" placeholder="Best Contact Number? *" value={formData.phone} onChange={updateField('phone')} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm bg-white" required />
        <div className="relative">
          <select name="enquiryReason" value={formData.enquiryReason} onChange={updateField('enquiryReason')} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none appearance-none bg-white font-medium text-gray-700 text-sm" required>
            <option value="" disabled>Reason for Enquiry *</option>
            <option value="Career Pathway">Career Pathway</option>
            <option value="Upskilling">Upskilling</option>
            <option value="Retraining">Retraining</option>
            <option value="Personal Growth">Personal Growth</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        <button disabled={status === 'submitting'} className="w-full py-4 bg-[#f38669] hover:bg-[#eb7454] disabled:bg-[#f38669]/60 disabled:cursor-not-allowed text-white font-black text-base rounded-md transition-all shadow-md active:scale-95 uppercase tracking-wide">
          {status === 'submitting' ? 'Sending...' : 'Send My Info Pack'}
        </button>
        {message && (
          <p className={`text-center text-sm font-bold ${status === 'success' ? 'text-[#1d3b56]' : 'text-red-600'}`} role="status">
            {message}
          </p>
        )}
        <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed max-w-[340px] mx-auto">
          By submitting this form, you agree to receive relevant course information from Online Courses Australia. View our <a href="https://www.onlinecoursesaustralia.edu.au/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f38669]">privacy policy</a>.
        </p>
      </form>
    </div>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-flex rounded-full bg-[#f38669]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f38669] sm:px-4 sm:py-2 sm:text-[11px]">
      {children}
    </span>
  )
}

const TrustpilotSlider = () => {
  const reviews = [
    { name: "Georgia M.", header: "Great practical horticulture units", text: "The plant biology and sustainable pest control modules were super clear and easy to follow.", stars: 5, date: "2 days ago" },
    { name: "Timothy B.", header: "Fantastic mentor support", text: "Whenever I needed feedback on soil testing or propagation, my mentor answered within hours.", stars: 5, date: "4 days ago" },
    { name: "Samantha P.", header: "Completed while working full-time", text: "The 100% self-paced structure made it realistic to study in the evenings without stress.", stars: 5, date: "6 days ago" },
    { name: "Luke D.", header: "Gave me confidence to start my business", text: "I landed my first garden maintenance clients before even finishing the entire course.", stars: 5, date: "1 week ago" },
    { name: "Rachel K.", header: "Credly digital badge verified my skills", text: "Shared my badge straight to LinkedIn. The CPD endorsement gives real credibility.", stars: 5, date: "2 weeks ago" }
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

export default function HorticultureLandingPage() {
  const { offer, timeLeft } = useOffer('horticulture')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<string | null>('learn')

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  const credentialsList = [
    {
      title: 'Credentials & Badges',
      icon: <Award className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Industry-endorsed course in Horticulture with short courses in Horticulture Science and Plant Management. You will gain an industry-endorsed micro-credential with a course completion document, plus a shareable & verifiable Digital Badge from Credly upon completion. Prior experience is NOT required.'
    },
    {
      title: 'Delivery',
      icon: <Sprout className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Flexible, online, self-paced learning with dedicated student support from a Mentor by email or phone (Mon-Fri), or contact us through live chat 7 days a week.'
    },
    {
      title: 'Duration & Hours',
      icon: <Clock className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'This course takes approximately 200 study hours to complete. Study at your own pace with no deadlines. Enjoy the flexibility of online learning with lifetime access to our training resources throughout your study.'
    },
    {
      title: 'Payment Options',
      icon: <Leaf className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Upfront Payment ($999), Afterpay (4x $249.75), or a flexible interest-free Weekly Payment Plan ($15 per week). Get more details in the course infopack.'
    }
  ]

  const accordionTabs = [
    {
      id: 'learn',
      title: 'What You Will Learn',
      content: (
        <div className="space-y-3">
          <p>This comprehensive course covers key elements to build your horticulture foundation, including:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Soil Health & Plant Biology:</strong> Soil taxonomy, nutrient profiling, pH management, organic composts, and cell biology.</li>
            <li><strong>Sustainable Gardening:</strong> Water conservation, eco-friendly pest control, native plant propagation, and biodiversity strategies.</li>
            <li><strong>Cultivation Techniques:</strong> Ornamental horticulture, flower beds, nursery cultivation, crop yields, and pruning tools.</li>
            <li><strong>Farming Technology:</strong> Introduction to smart farming, hydroponics, urban farming, and environmental stewardship.</li>
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
          <li>Exclusive movie-quality video masterclasses and screen-share mentor sessions.</li>
          <li>Dedicated 1-on-1 support and coaching sessions from experienced horticulture mentors.</li>
          <li>Verifiable and shareable Digital Badge issued by Credly to showcase on your professional profiles.</li>
          <li>CPD-endorsed certificate for each successfully completed module.</li>
          <li>7-Day Money Back Guarantee.</li>
        </ul>
      )
    },
    {
      id: 'outcomes',
      title: 'Career Outcomes',
      content: (
        <div className="space-y-3">
          <p>Gain the skills to pursue professional, in-demand horticulture and environment roles, or start your own gardening venture:</p>
          <div className="grid sm:grid-cols-2 gap-4 pl-2 mt-2">
            <div className="border-l-2 border-[#a6d5c7] pl-3">
              <h4 className="font-bold text-[#1d3b56]">Employment Roles</h4>
              <p className="text-xs text-[#1d3b56]/70 mt-1">Landscape Assistant, Plant Nursery Hand, Parks & Gardens Officer, Garden Maintenance Specialist, Eco-Tourism Guide.</p>
            </div>
            <div className="border-l-2 border-[#f38669] pl-3">
              <h4 className="font-bold text-[#1d3b56]">Entrepreneurial Paths</h4>
              <p className="text-xs text-[#1d3b56]/70 mt-1">Independent Gardener, Landscaping Business Owner, Nursery Founder, Sustainable Farming Consultant.</p>
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
  ]

  return (
    <div className="min-h-screen bg-white text-[#1d3b56] antialiased selection:bg-[#a6d5c7] selection:text-[#1d3b56] overflow-x-clip">
      {/* 1. Dynamic Promo Bar & Sticky Header */}
      <div className="sticky top-0 z-[120]">
        <div className="bg-[#a6d5c7] text-[#1d3b56] px-4 py-3 text-center text-xs font-bold sm:text-sm flex flex-wrap items-center justify-center gap-2 shadow-sm relative z-[100]">
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
                alt="Online Courses Australia Logo"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </Link>
            
            <nav className="hidden items-center gap-6 text-sm font-black text-[#1d3b56]/75 lg:flex">
              <a href="#course" className="transition hover:text-[#f38669]">Course</a>
              <a href="#topics" className="transition hover:text-[#f38669]">Topics</a>
              <a href="#details" className="transition hover:text-[#f38669]">Inclusions</a>
              <a href="#mentor" className="transition hover:text-[#f38669]">Mentor</a>
              <a href="#pricing" className="transition hover:text-[#f38669]">Pricing</a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a 
                href="tel:1300611404" 
                className="flex items-center gap-1.5 rounded-full border border-[#d4efe8] bg-white px-3.5 py-2 text-xs font-black text-[#1d3b56] hover:text-[#f38669] hover:border-[#f38669] transition shadow-sm"
              >
                <Phone className="h-3.5 w-3.5 text-[#f38669]" />
                <span>1300 611 404</span>
              </a>
              <div className="flex items-center gap-1 rounded-full bg-[#d4efe8]/70 px-3 py-2 text-[11px] font-black text-[#1d3b56]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-[#00b67a] text-[#00b67a]" />
                ))}
                <span className="ml-1">Trustpilot</span>
              </div>
              <a href="#lead-form" className="rounded-full bg-[#f38669] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-[#e26e50]">
                Get Info Pack
              </a>
            </div>

            <button type="button" onClick={toggleMenu} className="rounded-full bg-[#d4efe8]/80 p-2 text-[#1d3b56] md:hidden" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {isMobileMenuOpen && (
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-b border-[#d4efe8] bg-white px-5 py-5 shadow-xl md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 text-base font-black text-[#1d3b56]">
              <a href="#course" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Course</a>
              <a href="#topics" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Topics</a>
              <a href="#details" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Inclusions</a>
              <a href="#mentor" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Mentor</a>
              <a href="#pricing" onClick={closeMenu} className="rounded-xl bg-slate-50 px-4 py-3">Pricing</a>
              <a href="tel:1300611404" onClick={closeMenu} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-black text-[#1d3b56]">
                <Phone className="h-4 w-4 text-[#f38669]" />
                <span>Call 1300 611 404</span>
              </a>
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
                  Horticulture Essentials Course Bundle
                </span>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#f38669] sm:text-sm">A rewarding career starts here</p>
                <h1 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#1d3b56] sm:text-5xl md:text-6xl lg:text-7xl">
                  Ignite your passion for plants & nature
                </h1>
                
                <div className="relative mt-6 aspect-[1.33/1] overflow-hidden rounded-[2rem] bg-white border-4 border-white shadow-md lg:hidden">
                  <Image
                    src="/oca-assets/horticulture-hero.png"
                    alt="Horticulture essentials student"
                    fill
                    className="object-contain object-bottom"
                    priority
                    unoptimized
                  />
                </div>

                <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Ready to take your love for nature to the next level? This course will enhance your practical knowledge of sustainable gardening, plant biology, and environmental care.
                </p>
                <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
                  Take the first step today with the Horticulture Essentials Course Bundle — 100% online, self-paced, and developed in collaboration with Australia&apos;s leading horticulture mentors.
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
                  {offer.detailText || 'Download the course info pack for the latest pricing, modules, and discounts.'}
                </p>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 text-sm font-black text-[#1d3b56] sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Prior experience is NOT required</div>
                <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-white/70">Self-paced with 1:1 support</div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative mx-auto max-w-[620px]">
                <div className="relative hidden aspect-[1.33/1] overflow-hidden rounded-[2.5rem] border-4 border-white bg-[#eef9f6] lg:block shadow-md">
                  <Image
                    src="/oca-assets/horticulture-hero.png"
                    alt="Horticulture essentials student"
                    fill
                    className="object-contain object-bottom"
                    priority
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-[#ffdb71] text-[#1d3b56] font-black uppercase text-[10px] px-3 py-1.5 rounded-full shadow-md select-none tracking-widest border border-white/20">
                    $15 Per Week
                  </div>
                </div>
                <div id="lead-form" className="relative z-10 mx-auto mt-6 lg:-mt-12 max-w-[470px] scroll-mt-28">
                  <InfoPackForm title="Get a Free Course Info Pack" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trustpilot Social Proof Banner & Slider */}
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

        {/* 4. Course Overview Callout */}
        <section id="course" className="bg-white py-14 px-5 border-b border-gray-100 sm:px-6 md:py-20 scroll-mt-28">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>Horticulture Essentials Course</SectionEyebrow>
            <h2 className="mt-4 text-2xl font-black text-[#1d3b56] sm:text-3xl md:text-4xl tracking-tight leading-tight max-w-3xl mx-auto">
              This comprehensive course gives you the practical experience you need to thrive in the world of horticulture.
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/75 md:text-lg">
              Whether you’re working with ornamental plants, flowers, or crops, you’ll gain the skills to nurture a variety of plant life, manage pests, and implement eco-friendly practices that benefit both your garden and the environment.
            </p>
          </div>
        </section>

        {/* 5. Course Topics Section */}
        <section id="topics" className="flex flex-col md:flex-row-reverse min-h-[500px] md:min-h-[600px] scroll-mt-20">
          <div className="w-full md:w-1/2 bg-[#d4efe8] p-6 sm:p-12 md:p-20 flex flex-col justify-center">
            <SectionEyebrow>Course Topics</SectionEyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#1d3b56]">Course Topics:</h2>
            <p className="text-[#1d3b56]/80 my-6 leading-relaxed font-bold italic font-serif text-lg md:text-2xl px-4 md:px-8 border-l-4 border-[#a6d5c7]">
              This course covers key elements to build your horticulture foundation, including:
            </p>
            <ul className="space-y-4 md:space-y-5 mb-8">
              {[
                "Soil Health and Plant Biology",
                "Sustainable Gardening Practices",
                "Pest Control and Eco-Friendly Techniques",
                "Plant Growth and Cultivation Techniques",
                "Smart Farming and Nutrient Management",
                "Environmental Stewardship and Sustainability"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1.5 w-5 h-5 rounded-full bg-[#1d3b56] flex items-center justify-center text-white flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                  <span className="font-bold text-[#1d3b56] text-base md:text-lg leading-tight">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <p className="text-xs font-black uppercase tracking-wider text-[#1d3b56]/60 leading-relaxed mb-4">
                View the full list of topics with the complete course outline in the info pack below:
              </p>
              <a href="#lead-form" className="inline-flex items-center gap-2 rounded-full bg-[#1d3b56] px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-sm hover:bg-[#f38669] transition">
                Download Course Guide <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[350px] md:h-auto min-h-[350px]">
            <Image 
              src="/oca-assets/horticulture-syllabus.jpg" 
              alt="Practical Learning in Horticulture"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </section>

        {/* 6. Pricing & Payment Options */}
        <section id="pricing" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 border-t border-gray-200/60 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-4xl font-black tracking-tight text-[#1d3b56] sm:text-5xl md:text-6xl">
                Enrol Now
              </h2>
            </div>

            <div className="grid items-end gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Card 1: Buy Now Pay Later (Afterpay) */}
              <div className="flex flex-col justify-between rounded-xl bg-white border border-gray-200/80 shadow-md overflow-hidden text-center h-full">
                <div>
                  <div className="bg-[#1d3b56] text-white py-3.5 px-4 font-black text-sm md:text-base tracking-wide">
                    Buy Now Pay Later
                  </div>
                  <div className="p-6 md:p-7 flex flex-col items-center">
                    {/* Afterpay Logo */}
                    <div className="flex justify-center items-center h-10 mb-4">
                      <Image 
                        src="/oca-assets/footer/payment/afterpay.png" 
                        alt="Afterpay" 
                        width={140} 
                        height={28} 
                        className="h-7 w-auto object-contain"
                        unoptimized
                      />
                    </div>

                    {/* Checkmarks */}
                    <div className="space-y-2.5 mb-6 text-left w-full max-w-[210px]">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>Interest Free</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>Lifetime Access</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>Unlimited Support</span>
                      </div>
                    </div>

                    <div className="w-full border-t border-gray-100 my-4" />

                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1d3b56]/70 mb-1">
                      Fortnightly Payment
                    </p>
                    <div className="my-1.5">
                      <span className="inline-block -skew-x-12 bg-[#e4eef6] px-6 py-1.5 rounded transform">
                        <span className="inline-block skew-x-12 font-black text-3xl text-[#1d3b56] tracking-tight">
                          $249.75
                        </span>
                      </span>
                    </div>

                    <div className="w-full border-t border-gray-100 my-4" />

                    <div className="min-h-[72px] flex flex-col justify-center text-center">
                      <p className="text-xs font-black text-[#1d3b56] leading-tight">
                        Use Afterpay at Checkout. Eligibility Applies.
                      </p>
                      <p className="text-[11px] text-[#1d3b56]/80 mt-1 font-medium">
                        Make 4 interest free payments of $249.75 AUD fortnightly.
                      </p>
                      <a 
                        href="https://www.afterpay.com/en-AU/terms-of-service" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[11px] text-[#1d3b56] underline font-bold mt-1 inline-block"
                      >
                        Learn More
                      </a>
                    </div>

                    <p className="text-base font-black text-[#1d3b56] mt-4 mb-4">
                      Total Cost $999
                    </p>

                    <a 
                      href="https://www.onlinecoursesaustralia.edu.au/checkout?courseid=11129&paymenttype=afterpay" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full py-3.5 px-4 bg-[#1d3b56] hover:bg-[#152a3d] text-white text-center font-bold text-base rounded-lg transition shadow-md"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Pay Upfront + Save (MOST POPULAR) */}
              <div className="relative flex flex-col justify-between rounded-xl bg-white border-2 border-[#9ecfc3] shadow-xl overflow-hidden text-center md:-translate-y-2 h-full">
                <div>
                  <div className="bg-[#d4efe8] text-[#1d3b56] py-1.5 px-4 text-center font-black text-[11px] uppercase tracking-widest">
                    MOST POPULAR
                  </div>
                  <div className="bg-[#9ecfc3] text-[#1d3b56] py-3.5 px-4 font-black text-sm md:text-base tracking-wide">
                    Pay Upfront + Save
                  </div>
                  <div className="p-6 md:p-7 flex flex-col items-center">
                    <h3 className="text-3xl font-black text-[#1d3b56] text-center my-1 h-10 flex items-center justify-center">
                      Best Deal
                    </h3>

                    {/* Checkmarks */}
                    <div className="space-y-2.5 mb-6 text-left w-full max-w-[210px]">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>One Easy Payment</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>Lifetime Access</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>Unlimited Support</span>
                      </div>
                    </div>

                    <div className="w-full border-t border-gray-100 my-4" />

                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1d3b56]/70 mb-1">
                      Upfront Payment
                    </p>
                    <div className="flex items-center justify-center gap-3 my-1.5">
                      <span className="text-2xl font-bold text-gray-700 line-through">
                        $1450
                      </span>
                      <span className="inline-block -skew-x-12 bg-[#cbebe2] px-6 py-1.5 rounded transform">
                        <span className="inline-block skew-x-12 font-black text-3xl text-[#1d3b56] tracking-tight">
                          $999
                        </span>
                      </span>
                    </div>

                    <div className="w-full border-t border-gray-100 my-4" />

                    {/* Gift Card Promo Box */}
                    <div className="min-h-[72px] w-full flex items-center justify-center">
                      <div className="w-full rounded-xl border-2 border-[#a6d5c7] bg-[#eef8f5] p-2.5 flex items-center justify-center gap-3">
                        <div className="relative w-11 h-7 rounded bg-gradient-to-br from-blue-500 to-sky-400 p-1 flex flex-col justify-between shadow-sm overflow-hidden flex-shrink-0">
                          <div className="flex justify-between items-center">
                            <span className="text-[7px] font-black text-white italic tracking-tighter">OCA</span>
                            <span className="text-[6px] font-bold text-yellow-300">★</span>
                          </div>
                          <div className="text-[8px] font-black text-white italic text-right">VISA</div>
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-yellow-300/60" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-black text-[#1d3b56] flex items-center gap-1.5">
                            <span className="bg-[#f38669] text-white text-[9px] font-black px-1.5 py-0.5 rounded leading-none">FREE</span>
                            <span>$50 VISA E-Card!</span>
                          </p>
                          <p className="text-[10px] italic font-semibold text-[#1d3b56]/70">Hurry, while stocks last!</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-base font-black text-[#1d3b56] mt-4 mb-4">
                      Total Cost $999
                    </p>

                    <a 
                      href="https://www.onlinecoursesaustralia.edu.au/checkout?courseid=11129" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full py-3.5 px-4 bg-[#9ecfc3] hover:bg-[#8ec2b5] text-[#1d3b56] text-center font-black text-base rounded-lg transition shadow-md"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Weekly Payment Plan */}
              <div className="flex flex-col justify-between rounded-xl bg-white border border-gray-200/80 shadow-md overflow-hidden text-center h-full">
                <div>
                  <div className="bg-[#fed14d] text-[#1d3b56] py-3.5 px-4 font-black text-sm md:text-base tracking-wide">
                    Weekly Payment Plan
                  </div>
                  <div className="p-6 md:p-7 flex flex-col items-center">
                    <h3 className="text-3xl font-black text-[#1d3b56] text-center my-1 h-10 flex items-center justify-center">
                      Interest Free
                    </h3>

                    {/* Checkmarks */}
                    <div className="space-y-2.5 mb-6 text-left w-full max-w-[210px]">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>No Credit Check</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>Lifetime Access</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1d3b56]">
                        <div className="w-4 h-4 rounded-full bg-[#1d3b56] flex items-center justify-center text-white shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>Unlimited Support</span>
                      </div>
                    </div>

                    <div className="w-full border-t border-gray-100 my-4" />

                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1d3b56]/70 mb-1">
                      Weekly Payment
                    </p>
                    <div className="my-1.5">
                      <span className="inline-block -skew-x-12 bg-[#fef0be] px-8 py-1.5 rounded transform">
                        <span className="inline-block skew-x-12 font-black text-3xl text-[#1d3b56] tracking-tight">
                          $15
                        </span>
                      </span>
                    </div>

                    <div className="w-full border-t border-gray-100 my-4" />

                    <div className="min-h-[72px] flex flex-col justify-center text-center">
                      <p className="text-xs text-[#1d3b56] font-bold">
                        $15 per week flexible plan
                      </p>
                      <p className="text-[11px] text-[#1d3b56]/70 mt-1 font-medium">
                        Flexible first payment date (within 7 days)
                      </p>
                    </div>

                    <p className="text-base font-black text-[#1d3b56] mt-4 mb-4">
                      Total Cost $1450
                    </p>

                    <a 
                      href="https://www.onlinecoursesaustralia.edu.au/checkout?courseid=11129&paymenttype=debitsuccess" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full py-3.5 px-4 bg-[#fed14d] hover:bg-[#fec832] text-[#1d3b56] text-center font-black text-base rounded-lg transition shadow-md"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Day Cooling Off Guarantee Box */}
            <div className="mx-auto mt-14 max-w-4xl rounded-[2.5rem] border border-gray-200/80 bg-white p-8 sm:p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f38669]/10 text-[#f38669]">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h4 className="mb-3 text-xl sm:text-2xl font-black text-[#1d3b56] tracking-tight">
                We want you to love what you’re learning!
              </h4>
              <p className="mx-auto max-w-2xl text-sm sm:text-base font-semibold leading-relaxed text-[#1d3b56]/75">
                If your course isn&apos;t the right fit, we offer a 7-day cooling-off period so you can either switch to another course or get your money back. No pressure, no hassle — just real flexibility. It&apos;s why thousands of students choose OCA for their learning journey.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Course Inclusions & Delivery */}
        <section id="details" className="bg-white px-5 py-14 sm:px-6 md:py-20 border-t border-gray-100 scroll-mt-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <SectionEyebrow>Delivery & Credentials</SectionEyebrow>
              <h2 className="text-3xl font-black leading-none tracking-[-0.03em] text-[#1d3b56] sm:text-4xl md:text-5xl mt-3">
                How you will study
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-[#1d3b56]/75 md:text-base">
                All study materials were custom-designed with Australian leaders in their field. We don&apos;t rely on dense academic textbooks.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {credentialsList.map((item) => (
                <div key={item.title} className="rounded-3xl border border-gray-100 bg-slate-50 p-6 md:p-8 flex gap-4 hover:shadow-sm transition">
                  {item.icon}
                  <div className="space-y-2">
                    <h3 className="text-base font-black uppercase tracking-wider text-[#1d3b56]">{item.title}</h3>
                    <p className="text-xs font-semibold leading-relaxed text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Head Mentor Miranda Biography */}
        <section id="mentor" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 border-t border-gray-100 scroll-mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="relative lg:col-span-5">
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] border-[8px] border-white shadow-xl aspect-[3/4]">
                  <Image
                    src="/oca-assets/miranda.jpg"
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
                <div className="space-y-4 text-sm font-semibold leading-relaxed text-[#1d3b56]/85">
                  <p>
                    Hello, I’m Miranda—I’m here to guide, support, and empower you every step of the way. My passion has always been helping others unlock their potential. With years of experience across coaching, business, and mentoring, I understand the challenges of starting something new.
                  </p>
                  <p>
                    That’s why I’m committed to making your learning journey feel achievable, inspiring, and—most importantly—supported. Success isn’t just about knowledge—it’s about confidence. That’s why I take a hands-on, personalised approach, ensuring you feel encouraged, capable, and connected.
                  </p>
                  <p>
                    I have a knack for breaking down complex concepts into real-world skills, helping you apply what you learn in a way that feels natural. Learning is easier when you know you’re not alone. I’ll be with you every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Interactive FAQs Accordion */}
        <section className="bg-white border-y border-gray-200/60 py-12 px-5 scroll-mt-28" id="inclusions-accordion">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {accordionTabs.map((tab) => {
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
        <TrustpilotShowcase courseName="Horticulture" />

        {/* 11. Final Form Area */}
        <section className="bg-[#fffae6] py-12 px-5 sm:px-6 md:py-24 scroll-mt-20">
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
                  src="/oca-assets/horticulture-syllabus.jpg" 
                  alt="Horticulture student holding petunias" 
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
