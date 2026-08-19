'use client'

import React, { useState, useEffect } from 'react'
import { useOffer } from '../components/useOffer'
import { motion } from 'motion/react'
import { 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Award,
  Clock,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  Users,
  Sprout,
  Calendar,
  Leaf,
  Sun
} from 'lucide-react'
import Image from 'next/image'
import OcaFooter from '../components/OcaFooter'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'
const HORTICULTURE_THANK_YOU_URL = '/thank-you?course=horticulture'

// --- Brand Constants ---
const COLORS = {
  navy: '#1d3b56',
  yellow: '#ffdb71',
  teal: '#a6d5c7',
  mint: '#d4efe8',
  coral: '#f38669',
  cream: '#fff0c0',
  text: '#1d3b56'
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

const trackLeadSubmission = (formTitle: string) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    ;(window as any).dataLayer.push({
      event: 'lead_submission',
      event_category: 'Lead Generation',
      event_action: 'Form Submit',
      event_label: formTitle,
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
    <div className="bg-[#fff0c0] p-6 md:p-12 lg:p-14 rounded-2xl shadow-sm border border-[#ffdb71] w-full max-w-[540px] mx-auto lg:mx-0">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-3xl font-bold text-[#1d3b56] mb-2 tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 font-medium leading-snug">Please fill out the details below to receive your free course info pack instantly!</p>
      </div>
      <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
        <input name="company" type="text" value={formData.company} onChange={updateField('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input name="firstName" type="text" placeholder="First Name *" value={formData.firstName} onChange={updateField('firstName')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <input name="lastName" type="text" placeholder="Last Name *" value={formData.lastName} onChange={updateField('lastName')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={updateField('email')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <input name="phone" type="tel" placeholder="Best Contact Number? *" value={formData.phone} onChange={updateField('phone')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <div className="relative">
          <select name="enquiryReason" value={formData.enquiryReason} onChange={updateField('enquiryReason')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none appearance-none bg-white font-medium text-gray-700 text-sm md:text-base" required>
            <option value="" disabled>Reason for Enquiry *</option>
            <option value="Career Pathway">Career Pathway</option>
            <option value="Upskilling">Upskilling</option>
            <option value="Retraining">Retraining</option>
            <option value="Personal Growth">Personal Growth</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 pointer-events-none" />
        </div>
        <button disabled={status === 'submitting'} className="w-full py-4 md:py-5 bg-[#f38669] hover:bg-[#eb7454] disabled:bg-[#f38669]/60 disabled:cursor-not-allowed text-white font-bold text-lg md:text-xl rounded-md transition-all shadow-md active:scale-95 uppercase tracking-wide">
          {status === 'submitting' ? 'Sending...' : 'Send My Info Pack'}
        </button>
        {message && (
          <p className={`text-center text-sm font-bold ${status === 'success' ? 'text-[#1d3b56]' : 'text-red-600'}`} role="status">
            {message}
          </p>
        )}
        <p className="text-[10px] md:text-[11px] text-gray-400 text-center mt-4 md:mt-6 leading-relaxed max-w-[340px] mx-auto">
          By submitting this form, you agree to receive relevant course information and occasional updates from us. You can unsubscribe at any time. View Online Courses Australia's <a href="https://www.onlinecoursesaustralia.edu.au/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f38669]">terms of service</a> and <a href="https://www.onlinecoursesaustralia.edu.au/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f38669]">privacy policy</a> for more information.
        </p>
      </form>
    </div>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-[#d4efe8] px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#1d3b56] shadow-sm select-none">
      {children}
    </span>
  )
}

export default function HorticultureLandingPage() {
  const { offer, timeLeft } = useOffer('horticulture')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<string | null>(null)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  const courseSyllabus = [
    { title: 'Soil Health and Plant Biology', desc: 'Understanding soil taxonomy, pH profile management, composts, plant cell biology, and nutrient cycles.' },
    { title: 'Sustainable Gardening Practices', desc: 'Implementing eco-friendly water management, bio-diversity principles, native flora selections, and organic gardening.' },
    { title: 'Pest Control and Eco-Friendly Techniques', desc: 'Managing weeds, insects, and plant diseases using environment-safe organic sprays and bio-controls.' },
    { title: 'Plant Growth and Cultivation Techniques', desc: 'Mastering seed propagation, cuttings, nursery greenhouse care, ornamental styling, and pruning methods.' },
    { title: 'Smart Farming and Nutrient Management', desc: 'Introduction to automated hydroponic set ups, vertical crop farming, and precision fertilisation.' },
    { title: 'Environmental Stewardship and Sustainability', desc: 'Conserving resources, urban greening, forest management, and land rehabilitation frameworks.' }
  ]

  const credentialsList = [
    {
      title: 'Credentials',
      icon: <Award className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Industry-endorsed course in Horticulture with short courses in Horticulture Science and Plant Management. You will gain an industry-endorsed micro-credential with a course completion document, plus a shareable & verifiable Digital Badge from Credly upon completion. Prior experience is NOT required to enrol in this course.'
    },
    {
      title: 'Delivery',
      icon: <Sprout className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Flexible, online, self-paced learning with dedicated student support from a tutor by email or phone (Mon-Fri), or contact us through live chat 7 days a week.'
    },
    {
      title: 'Duration',
      icon: <Clock className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'This course takes approximately 200 study hours to complete. Study at your own pace with no deadlines. Enjoy the flexibility of online learning with lifetime access to our training resources throughout your study.'
    },
    {
      title: 'Payment Options',
      icon: <Leaf className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Upfront Payment, Afterpay, Latitude Pay or a flexible Payment Plan ($15 per week). Our August Intake Sale is on now! Get $500 OFF this course or enrol from just $15/week. Sale ends 20 August 2026. Get more details in the course infopack.'
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
          <li>Exclusive movie-quality video masterclasses and screen-share tutorials.</li>
          <li>Dedicated 1-on-1 support and coaching sessions from digital horticultural specialists.</li>
          <li>Verifiable and shareable Digital Badge issued by Credly to showcase on your professional profiles.</li>
          <li>CPD-endorsed certificate for each successfully completed module.</li>
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
    <div className="min-h-screen bg-gradient-to-b from-[#eef9f6] to-white font-sans text-[#1d3b56] antialiased selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
      {/* Dynamic Promo Bar */}
      <div className="sticky top-0 z-[120]">
        <div className="bg-[#a6d5c7] text-[#1d3b56] px-4 py-2 text-center text-xs font-black tracking-wide sm:text-sm flex flex-wrap items-center justify-center gap-2 shadow-sm border-b border-[#90c8ba]">
          <Sun className="w-4 h-4 animate-spin text-[#f38669]" />
          <span className="font-black uppercase tracking-wide">
            {offer.bannerText}
          </span>
          <span className="bg-[#1d3b56]/10 px-3 py-0.5 rounded text-xs">
            Ends {offer.endDateLabel}: {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
          </span>
        </div>

        <header className="border-b border-[#d4efe8] bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="https://onlinecoursesaustralia.edu.au" target="_blank" rel="noopener noreferrer" className="relative block h-8 w-24 sm:h-10 sm:w-28 focus:outline-none transition hover:opacity-85">
              <Image
                src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png"
                alt="Online Courses Australia Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </a>
            
            <div className="hidden items-center gap-6 md:flex">
              <a href="#topics" className="text-xs font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669] transition">Syllabus</a>
              <a href="#details" className="text-xs font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669] transition">Details</a>
              <a href="#mentor" className="text-xs font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669] transition">Mentor</a>
              <a href="#inclusions-accordion" className="text-xs font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669] transition">Inclusions</a>
              
              <div className="flex items-center gap-1.5 border-l border-gray-200 pl-6 select-none">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1b4332]">Trustpilot Excellent 4.8</span>
              </div>
            </div>

            <button type="button" onClick={toggleMenu} className="rounded-lg p-2 hover:bg-slate-100 md:hidden focus:outline-none" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[110px] z-50 bg-white p-6 shadow-xl border-b border-gray-100 md:hidden">
          <nav className="flex flex-col gap-4 text-center">
            <a href="#topics" onClick={closeMenu} className="text-sm font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669]">Syllabus</a>
            <a href="#details" onClick={closeMenu} className="text-sm font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669]">Details</a>
            <a href="#mentor" onClick={closeMenu} className="text-sm font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669]">Mentor</a>
            <a href="#inclusions-accordion" onClick={closeMenu} className="text-sm font-bold uppercase tracking-wider text-[#1d3b56]/80 hover:text-[#f38669]">Inclusions</a>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex items-center justify-center gap-1.5 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-black uppercase tracking-widest text-[#1b4332]">Trustpilot Excellent 4.8</span>
            </div>
          </nav>
        </div>
      )}

      {/* 2. Hero & Lead Capture Section */}
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-block rounded-full bg-[#f38669] px-4.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm mb-6 select-none">
              A rewarding career starts here
            </span>
            <h1 className="text-4xl font-black tracking-tight text-[#1d3b56] sm:text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Ignite Your Passion <span className="font-serif italic text-emerald-800">for Plants</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
              Ready to take your love for nature to the next level? This course will enhance your knowledge of sustainable gardening, plant biology, and environmental care.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
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
                <span>Use Coupon Code <strong className="font-mono text-[#1d3b56]">{offer.promoCode}</strong> for $500 Off!</span>
                <span className="text-[10px] text-gray-500">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
              {['Self-paced', '100% online', '1:1 support', 'Real-world tutors', 'Interactive content'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1d3b56]/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 animate-pulse" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="min-w-0">
            <div className="relative mx-auto max-w-[620px]">
              <div className="relative hidden aspect-[1.2/1] overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-[#e9f5f1] lg:block shadow-2xl">
                <Image
                  src="/oca-assets/horticulture-hero.jpg"
                  alt="Horticulture essentials greenhouse setup"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-[#ffdb71] text-[#1d3b56] font-black uppercase text-[10px] px-3 py-1.5 rounded-full shadow-md select-none tracking-widest border border-white/20 animate-bounce">
                  $15 Per Week
                </div>
              </div>
              <div id="lead-form" className="relative z-10 mx-auto mt-6 lg:-mt-12 max-w-[470px] scroll-mt-28">
                <InfoPackForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. Accent Highlight Callout */}
      <section className="bg-white py-12 px-5 border-y border-gray-100 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow>Horticulture Essentials Course</SectionEyebrow>
          <h2 className="mt-4 text-2xl font-black text-[#1d3b56] sm:text-3xl md:text-4xl tracking-tight leading-tight max-w-3xl mx-auto">
            This comprehensive course gives you the practical experience you need to thrive in the world of horticulture.
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/75 md:text-lg">
            Whether you’re working with ornamental plants, flowers, or vegetables, you’ll gain the skills to nurture a variety of plant life, manage pests, and implement eco-friendly practices that benefit both your garden and the environment.
          </p>
        </div>
      </section>

      {/* 3. Syllabus Section */}
      <section id="topics" className="bg-[#f7f9fa] px-5 py-14 sm:px-6 md:py-20 scroll-mt-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <SectionEyebrow>Course Credentials</SectionEyebrow>
            <h2 className="text-3xl font-black leading-none tracking-[-0.03em] text-[#1d3b56] sm:text-4xl md:text-5xl mt-3">
              You will learn
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-[#1d3b56]/75 md:text-base">
              This course covers key elements to build your horticulture foundation, including:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courseSyllabus.map((module) => (
              <div key={module.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4efe8] text-[#1b4332] mb-4">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1d3b56] tracking-tight">{module.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">{module.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs font-black uppercase tracking-wider text-[#1d3b56]/60">
              View the full list of topics with the complete course outline in the info pack
            </p>
            <a href="#lead-form" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1d3b56] px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-sm hover:bg-[#f38669] transition">
              Download Course Guide <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Credentials & Delivery Inclusions Grid */}
      <section id="details" className="bg-white px-5 py-14 sm:px-6 md:py-20 border-t border-gray-100 scroll-mt-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <SectionEyebrow>Delivery & Credentials</SectionEyebrow>
            <h2 className="text-3xl font-black leading-none tracking-[-0.03em] text-[#1d3b56] sm:text-4xl md:text-5xl mt-3">
              How you will study
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-[#1d3b56]/75 md:text-base">
              All study materials were custom-designed with Australian leaders in their field. We don’t rely on dense academic textbooks.
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

      {/* 5. Mentor Bio Section */}
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

      {/* 7. Dropdown navigation links (Interactive Accordion) */}
      <section className="bg-[#f7f9fa] border-y border-gray-200/60 py-12 px-5 scroll-mt-28" id="inclusions-accordion">
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
      <section className="bg-[#fffae6] py-12 px-5 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-[#1d3b56] sm:text-4xl md:text-6xl leading-[0.95]">
              Build Your <span className="font-serif italic text-emerald-800">Confidence</span>
            </h2>
            <p className="text-sm font-semibold leading-relaxed text-[#1d3b56]/75 sm:text-base">
              Take the first step today. Receive the comprehensive course syllabus, learning modules structure, payment plans, and active discounts guide in your email inbox immediately.
            </p>
            <div className="relative aspect-[1.33/1] rounded-[2rem] overflow-hidden border-8 border-white bg-slate-100 shadow-xl hidden md:block">
              <Image 
                src="/oca-assets/info-pack-images.png" 
                alt="Download your free horticulture info pack" 
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

      {/* Footer */}
      <OcaFooter />
    </div>
  )
}
