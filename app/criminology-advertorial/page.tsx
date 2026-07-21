'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Menu,
  Shield,
  Star,
  X
} from 'lucide-react'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'

type LeadFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
}

const initialLeadFormState: LeadFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: ''
}

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
    lead_type: 'criminology_advertorial_info_pack_v1',
    form_title: formTitle,
    course: 'Criminology & Psychology Course Bundle'
  })

  trackingWindow.gtag?.('event', 'generate_lead', {
    event_category: 'lead',
    event_label: formTitle
  })

  trackingWindow.fbq?.('track', 'Lead', {
    content_name: formTitle,
    content_category: 'Criminology Advertorial Course Guide'
  })
}

// Reusable Lead Form Component
const InfoPackForm = ({ title = 'Get Your Free Criminology Course Guide', onSuccess }: { title?: string, onSuccess?: () => void }) => {
  const [formData, setFormData] = useState<LeadFormState>(initialLeadFormState)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const updateField = (field: keyof LeadFormState) => (
    event: React.ChangeEvent<HTMLInputElement>
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
          enquiryReason: 'Criminology Course Guide Request', // prefilled since enquiry reason field is simplified
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
      setMessage('Thank you! Your course guide request has been received. Please check your inbox.')
      setFormData(initialLeadFormState)
      trackLeadSubmission(title)
      if (onSuccess) {
        setTimeout(onSuccess, 3000)
      }
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="w-full bg-[#fff0c0] border border-[#ffdb71] p-6 rounded-[2rem] shadow-lg">
      <div className="mb-5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f38669] mb-1">Instant Guide Delivery</p>
        <h3 className="text-xl font-black text-[#1d3b56] tracking-tight">{title}</h3>
        <p className="text-xs font-semibold text-[#1d3b56]/75 mt-1.5">
          Enter your details below to receive the complete course guide directly to your inbox.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
          <p className="text-sm font-bold">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input name="company" type="text" value={formData.company} onChange={updateField('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="firstName" type="text" placeholder="First Name *" value={formData.firstName} onChange={updateField('firstName')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7] text-[#1d3b56] font-bold" required />
            <input name="lastName" type="text" placeholder="Last Name *" value={formData.lastName} onChange={updateField('lastName')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7] text-[#1d3b56] font-bold" required />
          </div>
          <input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={updateField('email')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7] text-[#1d3b56] font-bold" required />
          <div>
            <input name="phone" type="tel" placeholder="Best Contact Number *" value={formData.phone} onChange={updateField('phone')} className="w-full rounded-xl border border-white/80 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#a6d5c7] text-[#1d3b56] font-bold" required />
            <span className="text-[10px] text-gray-500 font-semibold block mt-1 px-1">
              A course adviser may contact you to discuss your enquiry.
            </span>
          </div>

          {status === 'error' && (
            <p className="text-xs font-bold text-red-655 text-center bg-red-50 p-2 rounded-lg border border-red-100">{message}</p>
          )}

          <div className="pt-2">
            <p className="text-[9px] text-gray-500 font-semibold text-center mb-3">
              By submitting, you agree to receive the requested course information and acknowledge the Privacy Policy.
            </p>
            <button type="submit" disabled={status === 'submitting'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f38669] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-lg transition hover:bg-[#e26e50] disabled:cursor-not-allowed disabled:opacity-75 sm:text-sm">
              {status === 'submitting' ? 'Sending...' : 'SEND MY COURSE GUIDE'}
              <ArrowRight className="h-4 w-4 text-[#1d3b56]" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default function CriminologyAdvertorialPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('Get Your Free Criminology Course Guide')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [showStickyBtn, setShowStickyBtn] = useState(false)

  // Listen to scroll to show sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const scrollPercent = (scrolled / docHeight) * 100
        setShowStickyBtn(scrollPercent > 20)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const openModal = (title: string) => {
    setModalTitle(title)
    setIsModalOpen(true)
  }

  const faqs = [
    {
      q: 'Do I need previous criminology experience?',
      a: 'No. The bundle is presented as entry-level and does not require prior experience.'
    },
    {
      q: 'Is the course online?',
      a: 'Yes. The course is delivered online and on demand, allowing learners to begin at any time and work through the material flexibly.'
    },
    {
      q: 'How long does it take?',
      a: 'The advertised course duration is approximately 47 study hours. Actual completion time may vary between learners.'
    },
    {
      q: 'Does this course make someone a qualified criminologist?',
      a: 'No. It is an introductory course bundle and professional-development credential. Becoming eligible for specific criminology, psychology, law-enforcement or justice roles may require additional formal qualifications, recruitment processes, licences or employer requirements.'
    },
    {
      q: 'What is included in the free info pack?',
      a: 'The landing page states exactly what is being sent. Based on the existing offer, this includes the complete course outline, topic list, study-delivery information, support details and pathway information.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1d3b56] font-sans selection:bg-[#a6d5c7] selection:text-[#1d3b56] overflow-x-clip pb-6">
      
      {/* Editorial Header */}
      <header className="border-b border-gray-200 bg-white/95 px-6 py-4 shadow-sm backdrop-blur sticky top-0 z-[80]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="relative w-36 h-9 md:w-40 md:h-10">
            <Image 
              src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png" 
              alt="OCA Logo" 
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 border px-3 py-1 rounded">
            Sponsored Education Feature
          </span>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="max-w-3xl mx-auto px-6 pt-10 md:pt-16">
        
        {/* Eyebrow / Disclosure tag */}
        <div className="text-center mb-4">
          <span className="text-xs md:text-sm font-black uppercase tracking-[0.22em] text-[#f38669]">
            CAREER EXPLORATION
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-center text-[#1d3b56] mt-2 mb-6 leading-[1.08] max-w-2xl mx-auto">
          Most People Stop at the Documentary. Here’s What Comes Next.
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-2xl font-serif italic text-gray-600 text-center leading-relaxed max-w-2xl mx-auto mb-8">
          True crime tells the story. Criminology examines the behaviour, systems and decisions behind it.
        </p>

        {/* Opening paragraph immediately beneath the subheading */}
        <div className="text-center mb-10">
          <p className="text-base md:text-xl leading-relaxed text-[#1d3b56]/90 font-medium max-w-2xl mx-auto">
            For people fascinated by crime, psychology and the justice system, criminology offers a way to explore the questions behind the headlines—and the careers connected to them.
          </p>
          <div className="mt-4">
            <button 
              onClick={() => openModal('Get Your Free Criminology Course Guide')}
              className="text-[#f38669] hover:text-[#e26e50] text-sm font-black underline underline-offset-4 decoration-2 hover:no-underline transition-all inline-flex items-center gap-1"
            >
              Already interested? See the free course guide &rarr;
            </button>
          </div>
        </div>

        {/* Hero Image - Recropped Landscape 16:9 */}
        <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden border-[8px] border-white shadow-xl mb-12 bg-gray-100">
          <Image
            src="/oca-assets/criminology-hero-v2.jpg"
            alt="Adult student studying criminology course files at a desk with a laptop"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Article content (Single Column Editorial Layout) */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-[#1d3b56]/90 font-medium">
          
          {/* Section 1: The questions behind the headlines */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1d3b56] mb-4">
              The questions behind the headlines
            </h2>
            <p>
              These are the kinds of questions criminology attempts to answer.
            </p>
            {/* Compact Question Cards (Desktop 3-cols, Mobile stacked) */}
            <div className="my-5 grid gap-3 sm:grid-cols-3">
              {[
                'What influences someone to offend?',
                'How do investigators and justice professionals interpret patterns of behaviour?',
                'What role do psychology, rehabilitation, policy and prevention play?'
              ].map((q, idx) => (
                <div key={idx} className="bg-white border border-[#d4efe8] p-4.5 rounded-2xl shadow-xs text-sm font-black text-[#1d3b56]/90 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#d4efe8] text-teal-700 flex items-center justify-center font-black shrink-0 text-xs">?</span>
                  <p className="leading-snug">{q}</p>
                </div>
              ))}
            </div>
            <p>
              Rather than concentrating only on individual crimes, criminology examines the wider picture: human behaviour, social influences, victims, justice systems and the different ways communities respond to offending.
            </p>
            <p className="mt-4">
              It is a field that brings together elements of psychology, sociology, law, policy and forensic investigation.
            </p>
          </div>

          {/* Section 2: Criminology is about more than crime scenes */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1d3b56] mb-4">
              Criminology is about more than crime scenes
            </h2>
            <p>
              Popular television programs tend to focus on dramatic investigations and forensic evidence. The real field is considerably broader.
            </p>
            <p className="mt-4">
              The Criminology component of this online bundle introduces topics including:
            </p>
            <ul className="mt-4 space-y-3.5 pl-1">
              {[
                'Crime classification and the justice system',
                'Criminal behaviour and profiling',
                'Victimology',
                'Crime-scene and forensic concepts',
                'Crime prevention',
                'Rehabilitation and society’s response to offending'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm md:text-base font-bold text-[#1d3b56]">
                  <CheckCircle2 className="w-5 h-5 text-[#f38669] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              The accompanying Psychology course explores behaviour, personality, mental health, social psychology and psychological research—providing another perspective on why people behave as they do.
            </p>
          </div>

          {/* First proper conversion block right after topics are introduced, featuring compact fact strip */}
          <div className="bg-white border border-gray-200/60 p-6 rounded-3xl shadow-sm my-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1">
              {/* Compact Fact Strip */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-[10px] font-black text-teal-800 uppercase tracking-widest bg-[#d4efe8]/50 py-1.5 px-3 rounded-lg border border-[#d4efe8] w-fit mx-auto sm:mx-0">
                <span>2 courses</span>
                <span>•</span>
                <span>Approx. 47 study hours</span>
                <span>•</span>
                <span>100% online</span>
                <span>•</span>
                <span>No prerequisites</span>
              </div>
              <h4 className="text-base md:text-lg font-black text-[#1d3b56] pt-1">Curious about what the course actually covers?</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Get the full Criminology and Psychology course outline, study information and possible pathways.
              </p>
            </div>
            <button 
              onClick={() => openModal('Get Your Free Criminology Course Guide')}
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-md hover:bg-[#e26e50] active:scale-95 transition-all"
            >
              GET THE FREE COURSE GUIDE <ArrowRight className="h-4 w-4 text-[#1d3b56]" />
            </button>
          </div>

          {/* Section 3: Why combine criminology with psychology? */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1d3b56] mb-4">
              Why combine criminology with psychology?
            </h2>
            <p>
              Crime cannot be understood through evidence alone.
            </p>
            <p className="mt-4">
              Understanding motivation, personality, social influence and mental health can help learners examine the human factors behind offending and the way individuals respond to intervention, punishment and rehabilitation.
            </p>
            <p className="mt-4">
              That combination makes the bundle particularly relevant to people interested in both the justice system and human behaviour.
            </p>
          </div>

          {/* Why the combination matters panel (Replaced repetitive pull quote) */}
          <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl my-6">
            <h4 className="text-xs font-black text-[#1d3b56] uppercase tracking-widest mb-1.5">Why the combination matters</h4>
            <p className="text-sm font-semibold text-gray-650 leading-relaxed">
              Criminology examines crime and justice systems. Psychology adds insight into behaviour, motivation and social influence.
            </p>
          </div>

          {/* Section 4: What kinds of pathways could the subject help you explore? */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1d3b56] mb-4">
              What kinds of pathways could the subject help you explore?
            </h2>
            <p>
              Knowledge of criminology and psychology may be relevant when exploring fields such as:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Justice & public-safety administration',
                'Youth & community services',
                'Rehabilitation & offender support',
                'Legal support services',
                'Policy & crime-prevention programs',
                'Research & analysis',
                'Further academic study'
              ].map((item, idx) => (
                <span key={idx} className="bg-[#1d3b56]/5 text-[#1d3b56] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-650 font-medium">
              The specific qualifications required will depend on the occupation, employer and jurisdiction. Regulated and specialist professions commonly require further education, training, screening or formal accreditation.
            </p>
            <p className="mt-2 text-sm text-gray-655 font-medium">
              It is best viewed as an introduction to the field and a way to explore possible next steps—not a direct qualification for a specific occupation.
            </p>
          </div>

          {/* Second CTA conversion card around the career pathways section */}
          <div className="bg-white border border-gray-200/60 p-6 rounded-3xl shadow-sm my-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-base md:text-lg font-black text-[#1d3b56]">Curious about what is actually included?</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Get the complete 2-in-1 course guide, including the module breakdown, delivery information, learner support and possible pathways to explore.
              </p>
            </div>
            <button 
              onClick={() => openModal('Get Your Free Criminology Course Guide')}
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-md hover:bg-[#e26e50] active:scale-95 transition-all"
            >
              GET THE FREE COURSE GUIDE <ArrowRight className="h-4 w-4 text-[#1d3b56]" />
            </button>
          </div>

          {/* Section 5: A flexible way to test a new direction (Combined flex study and testing sections) */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1d3b56] mb-4">
              A flexible way to test a new direction
            </h2>
            <p>
              Exploring a career change does not have to begin with resigning from a job or enrolling immediately in several years of full-time study. It can begin with structured exposure to the subject.
            </p>
            <p className="mt-4">
              Because the course is delivered online and on demand, adult learners can study flexibly around employment, family and other commitments rather than attending fixed classroom sessions. The relatively short study commitment also makes it possible to investigate the subject before deciding whether to pursue more extensive study.
            </p>
            <p className="mt-4">
              This is particularly useful for someone who is:
            </p>
            <ul className="space-y-3 pl-1 mb-6">
              {[
                'Interested in crime, psychology or human behaviour',
                'Exploring a possible career change',
                'Considering future justice or community-services study',
                'Looking for structured learning rather than entertainment alone',
                'Not yet ready to commit to a degree or longer qualification'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm md:text-base font-bold text-[#1d3b56]">
                  <CheckCircle2 className="w-5 h-5 text-teal-650 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              This bundle is designed as an entry-level introduction that currently includes:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                'Two courses covering Criminology and Psychology',
                'Approximately 47 study hours',
                'Fully online, on-demand delivery',
                'The ability to start at any time',
                'No prerequisite experience',
                'Learner and tutorial support',
                'CPD certification',
                'A course-completion credential'
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-[#ffdb71]/40 p-4 rounded-xl shadow-xs text-xs font-black text-[#1d3b56] flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-[#f38669] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500 italic">
              The bundle provides introductory learning and professional development. Qualification requirements vary between occupations, employers and jurisdictions.
            </p>
          </div>

        </div>

        {/* FAQs Accordion */}
        <section className="pt-14 border-t border-gray-200 mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-center text-[#1d3b56] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <div key={index} className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-xs transition-colors">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4.5 text-left text-sm md:text-base font-black text-[#1d3b56] hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#f38669] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs md:text-sm font-semibold leading-relaxed text-gray-600 border-t border-gray-50 pt-3.5 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-white border border-gray-200 rounded-[2.5rem] p-6 md:p-10 shadow-sm mt-16 max-w-3xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#f38669] block mb-2 leading-none">Instant course guide</span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1d3b56] tracking-tight leading-tight">
              An interest can become an informed next step.
            </h2>
            <p className="text-sm font-bold text-gray-550 leading-relaxed">
              You do not need to decide on an entirely new career today. Start by seeing what criminology actually involves, what the course covers and whether the subject feels worth exploring further.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mt-2">
              <Shield className="w-4 h-4 text-teal-650" />
              <span>Instant course-guide delivery. No obligation to enrol.</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <InfoPackForm title="Get Your Free Criminology Course Guide" />
          </div>
        </section>

      </main>

      {/* Simplified Trust Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-6 mt-16 text-[#1d3b56]/80 text-xs">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-3">
            <p className="font-bold">
              © Copyright 2026 Online Courses Australia. ACN 31 155 885 242. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 font-extrabold text-[#1d3b56]/60">
              <a href="https://www.onlinecoursesaustralia.edu.au/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[#f38669]">Privacy Policy</a>
              <span>•</span>
              <a href="https://www.onlinecoursesaustralia.edu.au/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-[#f38669]">Terms and Conditions</a>
              <span>•</span>
              <a href="https://student.onlinecoursesaustralia.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-[#f38669]">Student Login</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <img
              src="/oca-assets/footer/cpd-medium.png"
              alt="CPD Certified"
              className="h-14 w-auto object-contain"
            />
            <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 border-l pl-6 border-gray-200">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 fill-[#00b67a] text-[#00b67a]" />
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00b67a]">Trustpilot Excellent</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile/Desktop CTA Button (Triggers on 20% scroll) */}
      <div className={`fixed bottom-6 right-6 z-[90] transition-all duration-500 ${showStickyBtn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'}`}>
        <button
          onClick={() => openModal('Get Your Free Criminology Course Guide')}
          className="flex items-center gap-2 rounded-full bg-[#f38669] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#1d3b56] shadow-2xl hover:bg-[#e26e50] active:scale-95 transition-all"
        >
          GET THE FREE COURSE GUIDE <ArrowRight className="h-4 w-4 text-[#1d3b56]" />
        </button>
      </div>

      {/* Modal Lead Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1d3b56]/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-[440px] z-10 transition-transform transform scale-100 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border shadow flex items-center justify-center text-[#1d3b56] hover:text-[#f38669] z-20 hover:scale-105 active:scale-95 transition-transform"
              aria-label="Close form"
            >
              <X className="w-4 h-4" />
            </button>
            <InfoPackForm title={modalTitle} onSuccess={() => setIsModalOpen(false)} />
          </div>

        </div>
      )}

    </div>
  )
}
