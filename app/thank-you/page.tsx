'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Check,
  Star, 
  Phone, 
  CreditCard, 
  ArrowRight, 
  Play,
  Lock,
  Clock,
  Sparkles,
  BookOpen,
  Calendar,
  ChevronDown
} from 'lucide-react'
import OcaFooter from '../components/OcaFooter'

// Mock Student Videos Data
const STUDENTS = [
  { id: 1, name: "Jessica", label: "Why I chose this course", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Charlotte", label: "My first week studying", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sarah", label: "Graduation day!", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Michael", label: "How I changed careers", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Georgia", label: "Study setup tour", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "David", label: "I got my promotion", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" }
]

type CourseConfig = {
  name: string
  infoPackUrl: string
  upfrontPrice: string
  fullUpfrontPrice: string
  weeklyPrice: string
  afterpayPrice: string
  checkoutUpfront: string
  checkoutWeekly: string
  checkoutAfterpay: string
  tagCapsules: string[]
  heroImage: string
}

const COURSE_DATA: Record<string, CourseConfig> = {
  'horticulture': {
    name: 'Horticulture Essentials Course Bundle',
    infoPackUrl: 'https://canva.link/yfy8q6iltpkht1w',
    upfrontPrice: '$950',
    fullUpfrontPrice: '$1,450',
    weeklyPrice: '$15',
    afterpayPrice: '$237.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=5432&salescode=SAVEBIG&utm_source=horticulture-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=5432&paymenttype=debitsuccess&salescode=SAVEBIG&utm_source=horticulture-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=5432&paymenttype=afterpay&salescode=SAVEBIG&utm_source=horticulture-thankyou',
    tagCapsules: ['Horticulture', 'Greenhouse', 'CPD Certified'],
    heroImage: '/oca-assets/horticulture-hero.jpg'
  },
  'dog-grooming': {
    name: 'Animal Care & Dog Grooming Bundle',
    infoPackUrl: 'https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle',
    upfrontPrice: '$990',
    fullUpfrontPrice: '$1,490',
    weeklyPrice: '$15',
    afterpayPrice: '$247.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=4539&utm_source=dog-grooming-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=4539&paymenttype=debitsuccess&utm_source=dog-grooming-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=4539&paymenttype=afterpay&utm_source=dog-grooming-thankyou',
    tagCapsules: ['Animal Care', 'Dog Grooming', 'CPD Certified'],
    heroImage: '/oca-assets/dog-hero.jpg'
  },
  'criminology': {
    name: 'Criminology & Criminal Profiling Bundle',
    infoPackUrl: 'https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle',
    upfrontPrice: '$950',
    fullUpfrontPrice: '$1,450',
    weeklyPrice: '$25',
    afterpayPrice: '$237.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=9410&salescode=SAVEBIG&utm_source=criminology-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=9410&paymenttype=debitsuccess&salescode=SAVEBIG&utm_source=criminology-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=9410&paymenttype=afterpay&salescode=SAVEBIG&utm_source=criminology-thankyou',
    tagCapsules: ['Criminology', 'Criminal Profiling', 'CPD Certified'],
    heroImage: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=600'
  },
  'business-bundle': {
    name: 'Business Management & Leadership Bundle',
    infoPackUrl: 'https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle',
    upfrontPrice: '$950',
    fullUpfrontPrice: '$1,450',
    weeklyPrice: '$15',
    afterpayPrice: '$237.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=8831&salescode=SAVEBIG&utm_source=business-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=8831&paymenttype=debitsuccess&salescode=SAVEBIG&utm_source=business-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=8831&paymenttype=afterpay&salescode=SAVEBIG&utm_source=business-thankyou',
    tagCapsules: ['Business Management', 'Leadership', 'CPD Certified'],
    heroImage: '/oca-assets/miranda.jpg'
  },
  'social-media': {
    name: 'Social Media Essentials Course Bundle',
    infoPackUrl: 'https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle',
    upfrontPrice: '$950',
    fullUpfrontPrice: '$1,450',
    weeklyPrice: '$25',
    afterpayPrice: '$237.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=7724&salescode=SAVEBIG&utm_source=socialmedia-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=7724&paymenttype=debitsuccess&salescode=SAVEBIG&utm_source=socialmedia-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=7724&paymenttype=afterpay&salescode=SAVEBIG&utm_source=socialmedia-thankyou',
    tagCapsules: ['Social Media', 'Marketing', 'CPD Certified'],
    heroImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  'makeup': {
    name: 'Makeup Artistry Course Bundle',
    infoPackUrl: 'https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle',
    upfrontPrice: '$950',
    fullUpfrontPrice: '$1,450',
    weeklyPrice: '$15',
    afterpayPrice: '$237.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2219&salescode=SAVEBIG&utm_source=makeup-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2219&paymenttype=debitsuccess&salescode=SAVEBIG&utm_source=makeup-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2219&paymenttype=afterpay&salescode=SAVEBIG&utm_source=makeup-thankyou',
    tagCapsules: ['Makeup Artistry', 'Beauty Science', 'CPD Certified'],
    heroImage: '/oca-assets/makeup-beauty-bundle.png'
  },
  'mental-health': {
    name: 'Mental Health, Psychology & Counselling Bundle',
    infoPackUrl: 'https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle',
    upfrontPrice: '$990',
    fullUpfrontPrice: '$1,490',
    weeklyPrice: '$15',
    afterpayPrice: '$247.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2211&utm_source=mental-health-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2211&paymenttype=debitsuccess&utm_source=mental-health-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2211&paymenttype=afterpay&utm_source=mental-health-thankyou',
    tagCapsules: ['Mental Health', 'Psychology', 'CPD Certified'],
    heroImage: '/oca-assets/dr-golly.png'
  },
  'mental-health-leads': {
    name: 'Mental Health, Psychology & Counselling Bundle',
    infoPackUrl: 'https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle',
    upfrontPrice: '$990',
    fullUpfrontPrice: '$1,490',
    weeklyPrice: '$15',
    afterpayPrice: '$247.50',
    checkoutUpfront: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2211&utm_source=mental-health-thankyou',
    checkoutWeekly: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2211&paymenttype=debitsuccess&utm_source=mental-health-thankyou',
    checkoutAfterpay: 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=2211&paymenttype=afterpay&utm_source=mental-health-thankyou',
    tagCapsules: ['Mental Health', 'Psychology', 'CPD Certified'],
    heroImage: '/oca-assets/dr-golly.png'
  }
}

export default function GenericThankYouPage() {
  const [selectedDate, setSelectedDate] = useState<number>(10)
  const [courseKey, setCourseKey] = useState<string>('horticulture')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const courseParam = params.get('course')
      if (courseParam && COURSE_DATA[courseParam.toLowerCase()]) {
        setCourseKey(courseParam.toLowerCase())
      }
    }
  }, [])

  const currentCourse = COURSE_DATA[courseKey] || COURSE_DATA['horticulture']

  // Booking Calendar Dates (Mon-Sun Grid)
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const dates = Array.from({ length: 21 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-white text-[#1d3b56] selection:bg-[#a6d5c7] selection:text-[#1d3b56] antialiased overflow-x-clip" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Import Outfit Google Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* 1. Header Navigation */}
      <header className="border-b border-[#d4efe8] bg-white px-6 py-5 sticky top-0 z-[100] shadow-sm">
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
          <div className="text-sm font-semibold text-gray-500 flex items-center gap-1">
            Questions? Call us <a href="tel:1300030900" className="font-extrabold text-[#f38669] hover:underline ml-1">1300 030 900</a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section - Access Your Info Pack is the HERO */}
      <section className="bg-[#d4efe8] px-6 py-12 md:py-20 border-b border-[#a6d5c7]/30">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Left Column Text & LOUDEST Pop Info Pack Button */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 shadow-sm border border-[#a6d5c7]/50 select-none">
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#f38669] text-white text-[10px] font-black">✓</span>
              <span className="text-xs font-black uppercase tracking-wider text-[#f38669]">Enquiry Received</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.04] tracking-[-0.03em] text-[#1d3b56]">
              You&apos;re all set —<br />
              what happens <span className="text-[#f38669] lowercase font-black">next.</span>
            </h1>
            
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 sm:text-lg">
              We&apos;ve received your enquiry and one of our course advisors will be in touch shortly. In the meantime, here&apos;s how to keep moving — book a call for personalised advice, or lock in your spot now.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
              <a 
                href="#booking" 
                className="w-full sm:w-auto inline-block rounded-xl bg-[#1d3b56] px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#254d70] active:scale-95 text-center"
              >
                Book a Call
              </a>
              <a 
                href="#pricing" 
                className="w-full sm:w-auto inline-block rounded-xl bg-[#f38669] px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#e26e50] active:scale-95 text-center"
              >
                Pay Now & Enrol
              </a>
            </div>
          </div>

          {/* Right Column Image Container */}
          <div className="relative">
            <div className="relative w-full aspect-[1.5/1] overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl bg-slate-100">
              <Image 
                src={currentCourse.heroImage}
                alt={currentCourse.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              
              {/* Tag capsules in top right */}
              <div className="absolute top-4 right-4 flex gap-1.5 z-10 select-none">
                {currentCourse.tagCapsules.map((tag) => (
                  <span key={tag} className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Overlaid Trustpilot rating card */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl max-w-[200px] border border-gray-100/50 z-20">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm font-black text-[#1d3b56]">4.8/5</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#00b67a] text-[#00b67a]" />)}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-500 leading-tight mb-2">More than 320+ reviews</p>
                <div className="border-t border-gray-150 pt-2 space-y-1.5 text-[9px] font-black text-[#1d3b56] uppercase tracking-wider">
                  <p className="flex items-center gap-1.5">
                    <span className="text-[#f38669] font-black">✓</span> CPD Accredited
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-[#f38669] font-black">✓</span> Live Expert Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Booking Calendar Section - Calendly Call scheduler */}
      <section id="booking" className="py-16 md:py-24 bg-[#fffae6] border-b border-yellow-100 scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[2.5rem] bg-white p-8 md:p-12 shadow-xl border border-gray-150/40">
            <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Schedule Your Advice Session</span>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-4xl lg:text-5xl leading-tight">
                    Book a call with a course advisor
                  </h2>
                </div>
                
                <p className="text-base font-semibold leading-relaxed text-gray-500">
                  Speak with an advisor to get answers about modules, payment calculators, and careers in <strong className="text-emerald-800">{currentCourse.name}</strong>.
                </p>

                <div className="space-y-3.5 pt-2">
                  {[
                    "No-obligation support call",
                    "Friendly, Australian-based expert advisors",
                    "Choose a date and time that matches your schedule"
                  ].map((bullet) => (
                    <div key={bullet} className="flex items-center gap-3">
                      <span className="text-[#1d3b56] font-bold text-lg">✓</span>
                      <span className="text-sm font-extrabold text-[#1d3b56]">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* simulated Calendly widget */}
              <div className="rounded-2xl border border-gray-200 bg-[#f7f9fa] p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-gray-200">
                  <button className="text-gray-400 hover:text-[#1d3b56] text-[10px] font-bold">◀</button>
                  <span className="text-xs font-black uppercase tracking-wider text-[#1d3b56]">Select booking date</span>
                  <button className="text-gray-400 hover:text-[#1d3b56] text-[10px] font-bold">▶</button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-3">
                  {daysOfWeek.map(day => (
                    <span key={day} className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{day}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {dates.map((date) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`h-9 w-9 mx-auto rounded-lg text-xs font-bold transition flex items-center justify-center ${
                        selectedDate === date 
                          ? 'bg-[#f38669] text-white font-black shadow-md shadow-[#f38669]/20' 
                          : 'hover:bg-gray-200 text-[#1d3b56]/80'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>

                <a 
                  href="https://bit.ly/ocachat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block w-full rounded-xl bg-[#f38669] hover:bg-[#e26e50] py-3.5 text-center text-xs font-black uppercase tracking-widest text-white shadow-md transition active:scale-95"
                >
                  Book Call Now
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Enrol Yourself Pricing/Checkout Section (Redesigned like squeeze pages) */}
      <section id="pricing" className="py-16 md:py-24 bg-[#f7f9fa] border-b border-gray-150">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Enrol Yourself</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-5xl">
              Lock in your spot today
            </h2>
            <p className="mt-4 text-base font-semibold text-gray-500 max-w-xl mx-auto">
              Select one of the flexible and secure payment pathways below to get immediate, lifetime access to your modules.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto items-stretch">
            
            {/* Card 1: Pay in 4 (Afterpay) */}
            <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition">
              <div>
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider mb-6 inline-block leading-none">Afterpay Smart Plan</span>
                
                <h3 className="text-3xl font-black text-[#1d3b56] tracking-tight mb-2">Split in 4</h3>
                
                <ul className="space-y-2 mb-6 text-xs font-bold text-[#1d3b56]/70">
                  <li className="flex items-center gap-2">✔️ Split payments into 4 terms</li>
                  <li className="flex items-center gap-2">✔️ 100% interest-free schedule</li>
                  <li className="flex items-center gap-2">✔️ Immediate full course activation</li>
                </ul>

                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-150 text-center mb-6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1 font-bold leading-none">4 Fortnightly Payments of</span>
                  <p className="text-3xl font-black text-[#1d3b56]">{currentCourse.afterpayPrice} <span className="text-xs text-gray-400">/fn</span></p>
                  <p className="text-[9px] text-gray-550 mt-2 font-semibold">Interest-free payment plan powered by Afterpay.</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-[#1d3b56] text-center mb-4">Total Cost Model: <strong className="text-[#f38669]">{currentCourse.upfrontPrice}</strong></p>
                <a 
                  href={currentCourse.checkoutAfterpay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#1d3b56] text-white hover:bg-[#152a3d] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-auto focus:outline-none text-center"
                >
                  Buy Now - Afterpay
                </a>
              </div>
            </div>

            {/* Card 2: Upfront Deal (MOST POPULAR & SQUEEZE STYLE HIGHLIGHT) */}
            <div className="bg-[#feaf9d]/30 rounded-[2.5rem] border-2 border-[#f38669] p-8 flex flex-col justify-between relative shadow-lg transform md:-translate-y-2 hover:scale-[1.01] transition-all">
              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f38669] text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                ⭐ MOST POPULAR & BEST DEAL
              </div>

              <div className="pt-2">
                <span className="bg-[#f38669] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider mb-6 inline-block leading-none">Pay Upfront & Save</span>
                
                <h3 className="text-3xl font-black text-[#1d3b56] tracking-tight mb-2">Upfront Deal</h3>
                
                <ul className="space-y-2 mb-6 text-xs font-bold text-[#1d3b56]/80">
                  <li className="flex items-center gap-2">✔️ One Easy Smart Payment</li>
                  <li className="flex items-center gap-2">✔️ Instant Course Enrolment</li>
                  <li className="flex items-center gap-2">✔️ 7-Day Money Back Guarantee</li>
                </ul>

                <div className="bg-white p-4 rounded-2xl border border-[#feaf9d]/60 text-center mb-6">
                  <span className="text-[10px] text-red-400 line-through block font-bold leading-none mb-1">WAS {currentCourse.fullUpfrontPrice} FULL PRICE</span>
                  <p className="text-4xl font-black text-[#f38669]">{currentCourse.upfrontPrice} <span className="text-xs text-emerald-800 font-medium">AUD</span></p>
                  <p className="text-[9px] text-gray-500 mt-2 font-semibold">Single payment. Best available discounted rate.</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-[#1d3b56] text-center mb-4">Total Cost Model: <strong className="text-[#f38669]">{currentCourse.upfrontPrice}</strong></p>
                <a 
                  href={currentCourse.checkoutUpfront}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#f38669] text-white hover:bg-[#e26e50] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-auto focus:outline-none text-center"
                >
                  Buy Now - Upfront
                </a>
              </div>
            </div>

            {/* Card 3: Weekly Installment Plan */}
            <div className="bg-amber-50/75 rounded-[2.5rem] border border-amber-200 p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition">
              <div>
                <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider mb-6 inline-block leading-none">Weekly Installments</span>
                
                <h3 className="text-3xl font-black text-[#1d3b56] tracking-tight mb-2">Weekly Plan</h3>
                
                <ul className="space-y-2 mb-6 text-xs font-bold text-[#1d3b56]/70">
                  <li className="flex items-center gap-2">✔️ Interest Free Term</li>
                  <li className="flex items-center gap-2">✔️ No Credit Check Required</li>
                  <li className="flex items-center gap-2">✔️ Lifetime Student Support</li>
                </ul>

                <div className="bg-white p-4 rounded-2xl border border-amber-200 text-center mb-6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1 font-bold leading-none">Weekly Installment</span>
                  <p className="text-3xl font-black text-gray-800">{currentCourse.weeklyPrice} <span className="text-xs text-gray-400">/wk</span></p>
                  <p className="text-[9px] text-gray-500 mt-2 font-semibold">Flexible weekly payments. No hidden interest charges.</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-[#1d3b56] text-center mb-4">Total Cost Model: <strong className="text-[#f38669]">{currentCourse.upfrontPrice}</strong></p>
                <a 
                  href={currentCourse.checkoutWeekly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#1d3b56] text-white hover:bg-[#152a3d] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-auto focus:outline-none text-center"
                >
                  Choose Weekly Plan
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Student Stories Gallery */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Real Students. Real Stories.</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-5xl">
              Hear from our students
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {STUDENTS.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => alert(`Starting student story video play for ${student.name}`)}
                className="group relative flex flex-col items-stretch overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-md transition text-left"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image 
                    src={student.img} 
                    alt={student.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1d3b56]/20 transition-opacity group-hover:bg-[#1d3b56]/15" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition group-hover:scale-110 active:scale-95 shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-gray-50 space-y-1">
                  <h4 className="text-[12px] font-black text-[#1d3b56] leading-tight">{student.label}</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">@{student.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. Info Pack Callout Block */}
      <section className="bg-slate-50 border-t border-gray-100 py-10 px-6 text-center select-none">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1.5">
            <h4 className="text-lg font-black text-[#1d3b56] uppercase tracking-wide">Course Info Pack & Syllabus</h4>
            <p className="text-sm font-semibold text-gray-500">
              Download the complete guide with module topics, credit options, and schedules.
            </p>
          </div>
          <a 
            href={currentCourse.infoPackUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1d3b56] hover:bg-[#254d70] px-6 py-4.5 text-xs font-black uppercase tracking-widest text-white shadow-md transition-all active:scale-95 text-center"
          >
            <span>Download Info Pack (PDF)</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 6. Unified Footer */}
      <OcaFooter showLinks={false} bookCallHref="#booking" />

    </div>
  )
}
