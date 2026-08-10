'use client'

import React, { useState } from 'react'
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
  Sparkles
} from 'lucide-react'

// Mock Student Videos Data
const STUDENTS = [
  { id: 1, name: "Jessica", label: "What I chose this course", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Charlotte", label: "My first week studying", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sarah", label: "Graduation day!", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Michael", label: "How I changed careers", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Georgia", label: "Study setup tour", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "David", label: "I got my promotion", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" }
]

export default function GenericThankYouPage() {
  const [selectedDate, setSelectedDate] = useState<number>(10)

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
      <header className="border-b border-gray-150 bg-white px-6 py-5 sticky top-0 z-[100] shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-[#1d3b56] hover:opacity-80 transition">
            Online Courses Australia
          </Link>
          <div className="text-sm font-semibold text-gray-500 flex items-center gap-1">
            Questions? Call us <a href="tel:1300030900" className="font-extrabold text-[#f38669] hover:underline ml-1">1300 030 900</a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-[#d4efe8] px-6 py-12 md:py-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="space-y-6 md:space-y-7">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 shadow-sm border border-[#a6d5c7]/50">
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#f38669] text-white text-[10px] font-black">✓</span>
              <span className="text-xs font-black uppercase tracking-wider text-[#f38669]">Thanks for your enquiry</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.04] tracking-[-0.03em] text-[#1d3b56]">
              You&apos;re all set —<br />
              what happens <span className="text-[#f38669] lowercase font-black">next.</span>
            </h1>
            
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 sm:text-lg">
              We&apos;ve received your enquiry and one of our course advisors will be in touch shortly. In the meantime, here&apos;s how to keep moving — book a call for personalised advice, or lock in your spot now.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="https://hello.onlinecoursesaustralia.edu.au/Aged_Care_Course_Bundle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-block rounded-xl bg-[#a6d5c7] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#1d3b56] shadow-lg transition hover:bg-[#90c8ba] active:scale-95 text-center"
              >
                Access Your Info Pack
              </a>
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

          {/* Right Column Custom Photo Grid & Badges */}
          <div className="relative">
            {/* Unified rectangular image container */}
            <div className="relative w-full aspect-[1.5/1] overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl bg-slate-100">
              {/* Outer sunburst graphic element in background */}
              <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-radial-gradient rounded-full border-[16px] border-dashed border-[#f38669]/15" />
              
              {/* Caregiver and patient image */}
              <Image 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" 
                alt="Caregiver helping senior patient in wheelchair outside"
                fill
                className="object-cover"
                priority
              />
              
              {/* Stylized Sunburst Orange shape overlay behind senior lady */}
              <div className="absolute left-[65%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[8px] border-dashed border-[#f38669]/30 opacity-70 scale-125" />

              {/* Tag capsules in top right */}
              <div className="absolute top-4 right-4 flex gap-1.5 z-10 select-none">
                <span className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">Mental</span>
                <span className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">Psy</span>
              </div>

              {/* Overlaid rating card in bottom-right */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl max-w-[200px] border border-gray-100/50 z-20">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm font-black text-[#1d3b56]">4.9/5</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#00b67a] text-[#00b67a]" />)}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-500 leading-tight mb-2">More than 320+ Trustpilot reviews</p>
                <div className="border-t border-gray-150 pt-2 space-y-1.5 text-[9px] font-black text-[#1d3b56] uppercase tracking-wider">
                  <p className="flex items-center gap-1.5">
                    <span className="text-[#f38669] font-black">✓</span> CPD Accredited
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-[#f38669] font-black">✓</span> Australian Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Next Steps Split Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Your Next Steps</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-5xl">
              Two easy ways to keep going
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Card 1: Speak with an Advisor */}
            <div className="rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:shadow-md transition">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d4efe8] flex items-center justify-center text-[#1d3b56]">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#1d3b56]">Speak with an advisor</h3>
                <p className="text-sm font-semibold leading-relaxed text-gray-500">
                  Get personalised advice about your course, career outcomes and payment options — no obligation.
                </p>
                <a href="#booking" className="inline-flex items-center gap-1 text-sm font-black text-[#1d3b56] hover:text-[#f38669] underline uppercase tracking-wide transition">
                  Book a Call →
                </a>
              </div>
            </div>

            {/* Card 2: Ready to enrol now? */}
            <div className="rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:shadow-md transition">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d4efe8] flex items-center justify-center text-[#1d3b56]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#1d3b56]">Ready to enrol now?</h3>
                <p className="text-sm font-semibold leading-relaxed text-gray-500">
                  Choose a payment option that suits you and get instant access to your course today.
                </p>
                <a href="#pricing" className="inline-flex items-center gap-1 text-sm font-black text-[#1d3b56] hover:text-[#f38669] underline uppercase tracking-wide transition">
                  Pay Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Booking Calendar Section */}
      <section id="booking" className="py-16 md:py-24 bg-[#fffae6] border-y border-yellow-100">
        <div className="mx-auto max-w-5xl px-6">
          
          {/* Main White Card wrapping entire block */}
          <div className="rounded-[2.5rem] bg-white p-8 md:p-12 shadow-xl border border-gray-100/50">
            <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              
              {/* Left Column Description */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Want Answers Today?</span>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-4xl lg:text-5xl leading-tight">
                    Book a call with a course advisor
                  </h2>
                </div>
                
                <p className="text-base font-semibold leading-relaxed text-gray-505">
                  Get straight answers about your course, career outcomes and study options.
                </p>

                <div className="space-y-3.5 pt-2">
                  {[
                    "No obligation",
                    "Friendly, expert advice",
                    "Find the right course for your goals"
                  ].map((bullet) => (
                    <div key={bullet} className="flex items-center gap-3">
                      <span className="text-[#1d3b56] font-bold text-lg">✓</span>
                      <span className="text-sm font-extrabold text-[#1d3b56]">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Calendar Widget */}
              <div className="rounded-2xl border border-gray-150 bg-[#f7f9fa] p-5 shadow-sm">
                
                {/* Header arrows matching < Pick a time that suits you > */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-gray-200/55">
                  <button className="text-gray-400 hover:text-[#1d3b56] text-[10px] font-bold">◀</button>
                  <span className="text-xs font-black uppercase tracking-wider text-[#1d3b56]">Pick a time that suits you</span>
                  <button className="text-gray-400 hover:text-[#1d3b56] text-[10px] font-bold">▶</button>
                </div>

                {/* Day Header */}
                <div className="grid grid-cols-7 gap-1 text-center mb-3">
                  {daysOfWeek.map(day => (
                    <span key={day} className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{day}</span>
                  ))}
                </div>

                {/* Dates Grid */}
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {dates.map((date) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`h-9 w-9 mx-auto rounded-lg text-xs font-bold transition flex items-center justify-center ${
                        selectedDate === date 
                          ? 'bg-[#f38669] text-white font-black shadow-md shadow-[#f38669]/20' 
                          : 'hover:bg-gray-250/70 text-[#1d3b56]/80'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>

                {/* Book Call Button inside Calendar widget */}
                <button 
                  type="button" 
                  onClick={() => alert('Call Booking Submitted!')}
                  className="mt-5 w-full rounded-xl bg-[#f38669] py-3.5 text-center text-xs font-black uppercase tracking-widest text-white shadow-md transition hover:bg-[#e26e50] active:scale-95"
                >
                  Book a Call
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. Pricing Options Section */}
      <section id="pricing" className="py-16 md:py-24 bg-[#f7f9fa] border-b border-gray-200/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Ready to enrol</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-5xl">
              Choose the payment option that works for you
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_0.9fr] max-w-5xl mx-auto items-stretch">
            
            {/* Card 1: Pay in 4 (Popular) */}
            <div className="relative flex flex-col justify-between rounded-[2rem] border-2 border-[#f38669] bg-white p-7 shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f38669] px-4 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                Most Popular
              </span>
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4efe8] text-[#00b67a]">
                  <span className="text-sm font-black">N</span>
                </div>
                <h3 className="text-lg font-black text-[#1d3b56]">Pay in 4</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">
                  Pay upfront and split it interest-free.
                </p>
                <div className="my-6">
                  <p className="text-3xl font-black text-[#1d3b56]">$374</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-1">/ 4 payments</p>
                </div>
              </div>
              <button 
                type="button"
                className="w-full rounded-xl bg-[#f38669] py-3 text-center text-xs font-black uppercase tracking-widest text-white shadow-md transition hover:bg-[#e26e50] active:scale-95"
              >
                Choose Pay in 4
              </button>
            </div>

            {/* Card 2: Upfront Payment */}
            <div className="flex flex-col justify-between rounded-[2rem] border border-gray-200/50 bg-white p-7 shadow-sm">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4efe8] text-[#00b67a]">
                  <CreditCard className="w-4 h-4 fill-current" />
                </div>
                <h3 className="text-lg font-black text-[#1d3b56]">Upfront Payment</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">
                  Pay in full and get the best price.
                </p>
                <div className="my-6">
                  <p className="text-3xl font-black text-[#1d3b56]">$1,299</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-1">Single Payment</p>
                </div>
              </div>
              <button 
                type="button"
                className="w-full rounded-xl bg-[#1d3b56] py-3 text-center text-xs font-black uppercase tracking-widest text-white shadow-sm transition hover:bg-[#254d70] active:scale-95"
              >
                Pay Upfront
              </button>
            </div>

            {/* Card 3: Weekly Payment Plan */}
            <div className="flex flex-col justify-between rounded-[2rem] border border-gray-200/50 bg-white p-7 shadow-sm">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4efe8] text-[#00b67a]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black text-[#1d3b56]">Payment Plan</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">
                  Flexible weekly payments, cancel anytime.
                </p>
                <div className="my-6">
                  <p className="text-3xl font-black text-[#1d3b56]">$18</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-1">/ week</p>
                </div>
              </div>
              <button 
                type="button"
                className="w-full rounded-xl bg-[#1d3b56] py-3 text-center text-xs font-black uppercase tracking-widest text-white shadow-sm transition hover:bg-[#254d70] active:scale-95"
              >
                Choose Payment Plan
              </button>
            </div>

            {/* Card 4: Guarantees Info */}
            <div className="rounded-[2rem] border border-gray-200/50 bg-white p-6 flex flex-col justify-center space-y-5 shadow-sm">
              {[
                { icon: Lock, title: "Secure Checkout", text: "256-bit SSL encryption" },
                { icon: Check, title: "No Hidden Fees", text: "What you see is what you pay" },
                { icon: Clock, title: "14-Day Money-back", text: "Guarantee terms apply" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <span className="w-5 h-5 text-[#f38669] shrink-0 mt-0.5">
                    {item.title === 'Secure Checkout' ? <Lock className="w-4.5 h-4.5 text-[#1d3b56]" /> : item.title === 'No Hidden Fees' ? <span className="font-black text-[#1d3b56]">✓</span> : <Clock className="w-4.5 h-4.5 text-[#1d3b56]" />}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-[#1d3b56] uppercase tracking-wide leading-tight">{item.title}</p>
                    <p className="text-[10px] font-semibold text-gray-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. Student Stories Gallery */}
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
                {/* Portrait Image wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image 
                    src={student.img} 
                    alt={student.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-[#1d3b56]/20 transition-opacity group-hover:bg-[#1d3b56]/15" />
                  
                  {/* Glassmorphic Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition group-hover:scale-110 active:scale-95 shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Video description labels - Clean white bottom bar */}
                <div className="p-4 bg-white border-t border-gray-50 space-y-1">
                  <h4 className="text-[12px] font-black text-[#1d3b56] leading-tight">{student.label}</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">@{student.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-[#1d3b56] text-white py-8 text-center text-xs font-semibold">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="opacity-60">
            &copy; 2026 Online Courses Australia. All rights reserved.
          </p>
          <div className="flex gap-4 opacity-60">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
