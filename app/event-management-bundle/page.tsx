'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Clock,
  Globe,
  Users,
  Award,
  ChevronDown,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react'
import OcaFooter from '../components/OcaFooter'
import { useOffer } from '../components/useOffer'

const CAMPAIGN_KEY = 'event-management-bundle'
const BOOK_CALL_URL = 'https://calendly.com/online-courses-aus/careercall'
const EVENTS_THANK_YOU_URL = '/thank-you?course=event-management-bundle'

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
          course: 'Event Management Course Bundle',
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
      window.location.assign(EVENTS_THANK_YOU_URL)
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

export default function EventManagementLandingPage() {
  const { offer, timeLeft } = useOffer(CAMPAIGN_KEY)
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>('learn')

  const microCredentials = [
    { title: 'Event Management Micro-Credential' },
    { title: 'Customer Service Skills Micro-Credential' },
    { title: 'Events & Hospitality Career Sampler' }
  ]

  const courseDetailsList = [
    {
      title: 'Credentials & Badges',
      icon: <Award className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'This bundle includes 3 industry-leading and CPD-endorsed courses in Events Management and Customer Service. You will gain an industry-endorsed micro-credential with a course completion document, plus a shareable & verifiable Digital Badge from Credly upon completion.'
    },
    {
      title: 'Delivery',
      icon: <Globe className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Flexible, online, self-paced learning with dedicated student support from a mentor by email or phone (Mon-Fri), or contact us through live chat 7 days a week.'
    },
    {
      title: 'Duration & Hours',
      icon: <Clock className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'This course takes approximately 180 study hours to complete. Study at your own pace with no deadlines. Enjoy the flexibility of online learning with lifetime access to our training resources throughout your study.'
    },
    {
      title: 'Payment Plans',
      icon: <Users className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />,
      desc: 'Upfront Payment, Afterpay, Latitude Pay or a flexible Payment Plan ($15 per week). Get more details in the course infopack.'
    }
  ]

  const accordionTabs = [
    {
      id: 'learn',
      title: 'What You Will Learn',
      content: (
        <div className="space-y-3">
          <p>As part of this course, you will learn about:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Project Management & Operational Planning:</strong> Event checklists, schedules, milestones, risk registers, and logistics logs.</li>
            <li><strong>Infrastructure & Staging:</strong> Managing event staging components, audio-visual layouts, layouts, and venue coordination.</li>
            <li><strong>Sponsorships & Marketing:</strong> Developing marketing campaigns, landing target sponsorships, and public relations tracks.</li>
            <li><strong>Customer Service & Suppliers:</strong> Establishing positive relationships with venue suppliers, caterers, security, and visitors.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'inclusions',
      title: 'Course Fees Include',
      content: (
        <div className="space-y-2">
          <p>Your enrollment covers all learning elements, with no hidden textbook fees:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Lifetime access to course learning portals</li>
            <li>Signed digital course credentials</li>
            <li>Direct email/phone support from industry mentors</li>
            <li>Digital Badge registration with Credly</li>
          </ul>
        </div>
      )
    },
    {
      id: 'outcomes',
      title: 'Career Outcomes',
      content: (
        <div className="space-y-2">
          <p>Graduates are prepared for entry-level and coordinator roles across events, corporate hospitality, and tourism:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Events Coordinator / Event Assistant</li>
            <li>Wedding Coordinator / Event Planner</li>
            <li>Venue Manager / Hospitality Coordinator</li>
            <li>Corporate Functions Manager</li>
          </ul>
        </div>
      )
    },
    {
      id: 'provider',
      title: 'Course Provider',
      content: (
        <p>
          Online Courses Australia (OCA) is a leading provider of online training and micro-credentials in Australia. Our courses are developed in collaboration with top industry experts, providing students with practical, career-relevant skills.
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-[#1d3b56] antialiased overflow-x-clip" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Import Outfit Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* 1. Dynamic Campaign Header Strip */}
      <div className="bg-[#1d3b56] py-3 text-center text-white px-4 relative z-50">
        <p className="text-xs font-bold uppercase tracking-wider">
          🎉 {offer.bannerText}
        </p>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="border-b border-gray-100 bg-white px-6 py-4 sticky top-0 z-[100] shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="https://onlinecoursesaustralia.edu.au" target="_blank" rel="noopener noreferrer" className="relative block h-8 w-24 sm:h-10 sm:w-28 focus:outline-none transition hover:opacity-85">
            <Image
              src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png"
              alt="OCA Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
          <div className="text-sm font-semibold text-gray-550">
            Questions? Call us <a href="tel:1300030900" className="font-extrabold text-[#f38669] hover:underline">1300 030 900</a>
          </div>
        </div>
      </header>

      {/* 3. Hero & Lead Capture Section */}
      <section className="relative overflow-hidden px-4 py-8 sm:px-6 md:py-12 lg:pt-12 lg:pb-16 bg-[#f7f9fa] border-b border-gray-150/40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:pt-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-block rounded-full bg-[#f38669] px-4.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm mb-6 select-none">
              A rewarding career starts here
            </span>
            <h1 className="text-4xl font-black tracking-tight text-[#1d3b56] sm:text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Make Your Mark in the <span className="font-serif italic text-emerald-800">Event Industry</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 md:text-lg">
              Ever dreamed of setting up a music festival, organising a red carpet event, or working behind the scenes at unforgettable parties? Take the first step with the Event Management Course, created in collaboration with Australia’s top events and hospitality experts.
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
                <span className="text-[10px] text-gray-550">({copiedCode ? 'Copied! ✔' : 'Click to Copy'})</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
              {['Self-paced', '100% online', '1:1 support', 'Real-world tutors', 'Interactive content'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1d3b56]/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="min-w-0">
            <div className="relative mx-auto max-w-[620px]">
              <div className="relative hidden aspect-[1.4/1] overflow-hidden rounded-[2.5rem] border-4 border-white bg-slate-100 lg:block shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
                  alt="Event Management setup"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-[#ffdb71] text-[#1d3b56] font-black uppercase text-[10px] px-3 py-1.5 rounded-full shadow-md select-none tracking-widest border border-white/20 animate-bounce">
                  $15 Per Week
                </div>
              </div>
              <div id="lead-form" className="relative z-10 mx-auto mt-4 lg:-mt-24 max-w-[470px] scroll-mt-28">
                <InfoPackForm title="Start planning and managing unforgettable events today." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Course Overview Bundle Strip */}
      <section className="bg-white py-12 px-5 border-b border-gray-100 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <SectionEyebrow>Event Management Course Bundle</SectionEyebrow>
            <h2 className="text-2xl font-black text-[#1d3b56] sm:text-3xl md:text-4xl tracking-tight leading-tight mt-2">
              This comprehensive bundle includes 3 industry-endorsed courses.
            </h2>
            <p className="mt-4 text-sm font-semibold text-gray-500 max-w-2xl mx-auto">
              Each course is designed to teach you the essential skills and knowledge every professional Events Manager or Venue Coordinator needs to plan and execute a wide range of events:
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {microCredentials.map((c, i) => (
              <div key={i} className="bg-slate-50 border border-gray-100 rounded-2xl p-6 text-center shadow-sm flex items-center justify-center">
                <p className="font-extrabold text-[#1d3b56] text-sm leading-snug">{c.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. You Will Learn Section (Split Layout matching Makeup page) */}
      <section id="topics" className="flex flex-col md:flex-row-reverse min-h-[500px] md:min-h-[600px] scroll-mt-20">
        <div className="w-full md:w-1/2 bg-[#d4efe8] p-6 sm:p-12 md:p-24 flex flex-col justify-center">
          <SectionEyebrow>Course Syllabus</SectionEyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#1d3b56]">You will learn:</h2>
          <p className="text-[#1d3b56]/80 my-6 leading-relaxed font-bold italic font-serif text-lg md:text-2xl px-4 md:px-8 border-l-4 border-[#a6d5c7]">
            As part of this course, you will learn about:
          </p>
          <ul className="space-y-4 md:space-y-6 mb-8">
            {[
              "Project management & operational planning",
              "Managing event staging components, venues, and infrastructure",
              "How to obtain sponsorships & develop marketing strategies",
              "Customer service and establishing relationships with suppliers, and many more"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-2 w-5 h-5 rounded-full bg-[#1d3b56] flex items-center justify-center text-white flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <span className="font-bold text-[#1d3b56] text-lg md:text-xl leading-tight">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xs font-black uppercase tracking-wider text-[#1d3b56]/60 leading-relaxed mb-4">
              View the full list of topics with the complete course outline in the info pack below:
            </p>
            <a href="#lead-form" className="inline-flex items-center gap-2 rounded-full bg-[#1d3b56] px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-sm hover:bg-[#f38669] transition">
              Download Course Guide <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative h-[450px] md:h-auto min-h-[400px]">
          <Image 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80" 
            alt="Practical Learning in Event Management"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </section>

      {/* 6. Course Details Grid */}
      <section id="details" className="bg-white px-5 py-14 sm:px-6 md:py-20 border-t border-gray-100 scroll-mt-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <SectionEyebrow>Delivery & Credentials</SectionEyebrow>
            <h2 className="text-3xl font-black leading-none tracking-[-0.03em] text-[#1d3b56] sm:text-4xl md:text-5xl mt-3">
              Event Management Course Inclusions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold text-[#1d3b56]/75 md:text-base">
              By the end of your study, you will have learned how to plan and execute weddings, conventions, concerts, and sporting events from start to finish.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {courseDetailsList.map((detail) => (
              <div key={detail.title} className="rounded-2xl border border-gray-100 bg-[#f7f9fa]/50 p-6 flex gap-4">
                {detail.icon}
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-[#1d3b56] tracking-tight">{detail.title}</h3>
                  <p className="text-xs font-semibold leading-relaxed text-gray-500">{detail.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Head Mentor Miranda Biography */}
      <section className="bg-slate-50 py-16 md:py-24 border-t border-gray-100 px-5 sm:px-6 scroll-mt-28" id="mentorship">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border-8 border-white bg-slate-100 shadow-xl">
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
                  I have a knack for breaking down complex concepts into real-world skills, helping you apply what you learn in a way that feels natural. Learning is easier when you know you’re not alone. I’m here to answer your questions, guide you through challenges, and connect you with the right resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive FAQs Accordion */}
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

      {/* 9. Scaled Down Trustpilot stars section */}
      <section className="py-12 md:py-20 bg-[#1d3b56] text-center text-white px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight uppercase tracking-wider">
            Your future <span className="font-serif italic text-[#ffdb71] lowercase font-normal">starts now</span>
          </h2>
          <div className="flex justify-center gap-1 mb-6 md:mb-8">
             {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 md:w-8 md:h-8 fill-[#ffdb71] text-[#ffdb71]" />)}
          </div>
          <p className="text-sm md:text-lg font-serif italic text-[#fff0c0] opacity-80 mb-8 md:mb-12">7-day Money Back Guarantee</p>
          <div className="bg-white/5 backdrop-blur-md p-6 xs:p-8 sm:p-12 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-inner">
             <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 tracking-tight uppercase tracking-[0.05em] md:tracking-[0.1em]">Trustpilot - Excellent</p>
             <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Based on student reviews</p>
          </div>
        </div>
      </section>

      {/* 10. Final Lead Generation Form (Confidence Section) */}
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

      {/* Footer */}
      <OcaFooter />
    </div>
  )
}
