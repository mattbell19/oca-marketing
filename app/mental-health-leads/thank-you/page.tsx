'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  CheckCircle2, 
  Star, 
  Phone, 
  CreditCard, 
  ArrowRight, 
  Award, 
  Monitor, 
  ShieldCheck, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Play,
  Clock,
  Sparkles
} from 'lucide-react'

// Mock Student Videos Data
const STUDENTS = [
  { id: 1, name: "Jessica", label: "Why I chose this course", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Charlotte", label: "My first week studying", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sarah", label: "Graduation day!", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Michael", label: "How I changed careers", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Georgia", label: "Study setup tour", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "David", label: "I got my promotion", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" }
]

export default function ThankYouPage() {
  const [selectedDate, setSelectedDate] = useState<number>(10)
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  // Booking Calendar Dates (Mon-Sun Grid)
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const dates = Array.from({ length: 21 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-white text-[#1d3b56] font-sans selection:bg-[#a6d5c7] selection:text-[#1d3b56] overflow-x-clip">
      
      {/* 1. Header Navigation */}
      <header className="border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur-md sticky top-0 z-[100] shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/mental-health-leads" className="text-lg font-black tracking-tight text-[#1d3b56] hover:opacity-85">
            Online Courses Australia
          </Link>
          <div className="text-xs sm:text-sm font-bold text-gray-500 flex items-center gap-1.5">
            Questions? Call us <a href="tel:1300030900" className="font-black text-[#f38669] hover:underline">1300 030 900</a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-gradient-to-br from-[#d4efe8]/70 via-[#d4efe8]/30 to-white px-6 py-12 md:py-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm border border-[#a6d5c7]/30">
              <CheckCircle2 className="h-4 w-4 text-[#f38669]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#f38669]">Thanks for your enquiry</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.04] tracking-[-0.03em] text-[#1d3b56]">
              You&apos;re all set —<br />
              what happens <span className="text-[#f38669]">next.</span>
            </h1>
            
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/80 sm:text-lg">
              We&apos;ve received your enquiry and one of our course advisors will be in touch shortly. In the meantime, here&apos;s how to keep moving — book a call for personalised advice, or lock in your spot now.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#booking" 
                className="flex items-center justify-center rounded-xl bg-[#1d3b56] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#254d70] active:scale-95 text-center"
              >
                Book a Call
              </a>
              <a 
                href="#pricing" 
                className="flex items-center justify-center rounded-xl bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:bg-[#e26e50] active:scale-95 text-center"
              >
                Pay Now & Enrol
              </a>
            </div>
          </div>

          {/* Right Column Custom Photo Grid & Badges */}
          <div className="relative flex justify-center">
            {/* Background elements */}
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#ffdb71] opacity-40 blur-xl animate-pulse" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[#a6d5c7] opacity-40 blur-xl animate-pulse" />

            <div className="relative grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4 w-full max-w-lg">
              {/* Left small window image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80" 
                  alt="Professional nurse consultant conversation"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right main caregiver image with orange sunburst */}
              <div className="relative w-full aspect-square overflow-hidden rounded-[3rem] border-8 border-white shadow-2xl">
                <div className="absolute inset-0 bg-[#f38669]/10 mix-blend-multiply" />
                <Image 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" 
                  alt="Nursing caregiver and elderly wheelchair support"
                  fill
                  className="object-cover"
                />
                
                {/* Visual Sunburst Circle Background effect */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-radial-gradient rounded-full border-[16px] border-dashed border-[#f38669]/25 animate-[spin_40s_linear_infinite]" />
              </div>

              {/* Trustpilot / Credential Badge Card */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 p-4 shadow-xl max-w-[200px] space-y-2 select-none z-20">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-black text-[#1d3b56]">4.9/5</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-[#00b67a] text-[#00b67a]" />)}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-500 leading-tight">Based on 320+ Trustpilot student reviews</p>
                <div className="border-t border-gray-100 pt-2 space-y-1 text-[10px] font-black text-[#1d3b56] uppercase tracking-wider">
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f38669]" /> CPD Accredited
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f38669]" /> Australian Support
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
            <div className="rounded-[2.5rem] border border-[#d4efe8] bg-[#f7f9fa] p-8 shadow-sm flex gap-6 hover:shadow-md transition">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d4efe8] flex items-center justify-center text-[#1d3b56]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#1d3b56]">Speak with an advisor</h3>
                <p className="text-sm font-semibold leading-relaxed text-gray-600">
                  Get personalised advice about your course, career outcomes and payment options — no obligation.
                </p>
                <a href="#booking" className="inline-flex items-center gap-1 text-sm font-black text-[#f38669] hover:underline uppercase tracking-wide">
                  Book a Call <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: Ready to enrol now? */}
            <div className="rounded-[2.5rem] border border-[#d4efe8] bg-[#f7f9fa] p-8 shadow-sm flex gap-6 hover:shadow-md transition">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fff0c0] flex items-center justify-center text-[#1d3b56]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#1d3b56]">Ready to enrol now?</h3>
                <p className="text-sm font-semibold leading-relaxed text-gray-600">
                  Choose a payment option that suits you and get instant access to your course today.
                </p>
                <a href="#pricing" className="inline-flex items-center gap-1 text-sm font-black text-[#f38669] hover:underline uppercase tracking-wide">
                  Pay Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Booking Calendar Section */}
      <section id="booking" className="py-16 md:py-24 bg-[#fff0c0]/40 border-y border-[#fff0c0]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:items-center">
            
            {/* Left Info Column */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Want Answers Today?</span>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-5xl">
                  Book a call with a course advisor
                </h2>
              </div>
              
              <p className="text-base font-semibold leading-relaxed text-[#1d3b56]/75">
                Get straight answers about your course syllabus, career pathways, payment options and study requirements.
              </p>

              <div className="space-y-3.5 pt-4">
                {[
                  "No obligation, casual conversation",
                  "Friendly, expert advice from Australia-based mentors",
                  "Find the right course pathway for your career goals"
                ].map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#f38669] shrink-0" />
                    <span className="text-sm font-extrabold text-[#1d3b56]">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Booking Calendar Widget */}
            <div className="rounded-3xl border border-gray-200/60 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <button type="button" className="p-1.5 hover:bg-slate-50 transition rounded-full">
                  <ChevronLeft className="w-5 h-5 text-[#1d3b56]" />
                </button>
                <span className="text-sm font-black uppercase tracking-wider text-[#1d3b56]">Pick a time that suits you</span>
                <button type="button" className="p-1.5 hover:bg-slate-50 transition rounded-full">
                  <ChevronRight className="w-5 h-5 text-[#1d3b56]" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map(day => (
                  <span key={day} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{day}</span>
                ))}
              </div>

              {/* Date cells grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {dates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`h-10 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                      selectedDate === date 
                        ? 'bg-[#f38669] text-white font-black shadow-md shadow-[#f38669]/20' 
                        : 'hover:bg-slate-50 text-[#1d3b56]/80'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* Booking CTA */}
              <button 
                type="button" 
                onClick={() => alert('Booking confirmation logic can be connected here.')}
                className="mt-6 w-full rounded-xl bg-[#f38669] py-4 text-center text-sm font-black uppercase tracking-widest text-white shadow-md transition hover:bg-[#e26e50] active:scale-95"
              >
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Options Section */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Ready to enrol?</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-5xl">
              Choose the payment option that works for you
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 max-w-5xl mx-auto items-stretch">
            
            {/* Card 1: Pay in 4 (Popular) */}
            <div className="relative flex flex-col justify-between rounded-[2rem] border-2 border-[#f38669] bg-white p-7 shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f38669] px-4 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                Most Popular
              </span>
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f38669]/10 text-[#f38669]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#1d3b56]">Pay in 4</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">
                  Pay upfront and split your payments interest-free.
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
            <div className="flex flex-col justify-between rounded-[2rem] border border-[#d4efe8] bg-slate-50 p-7 shadow-sm">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#a6d5c7]/20 text-[#a6d5c7]">
                  <CreditCard className="w-5 h-5 text-[#1d3b56]" />
                </div>
                <h3 className="text-lg font-black text-[#1d3b56]">Upfront Payment</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">
                  Pay in full upfront to get the lowest possible price.
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
            <div className="flex flex-col justify-between rounded-[2rem] border border-[#d4efe8] bg-slate-50 p-7 shadow-sm">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0c0] text-[#1d3b56]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#1d3b56]">Payment Plan</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">
                  Flexible weekly payments, cancel or pause anytime.
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
            <div className="rounded-[2rem] border border-[#d4efe8] bg-slate-50/50 p-6 flex flex-col justify-center space-y-4">
              {[
                { icon: ShieldCheck, title: "Secure Checkout", text: "256-bit SSL encryption" },
                { icon: CheckCircle2, title: "No Hidden Fees", text: "What you see is what you pay" },
                { icon: Clock, title: "14-Day Money-back", text: "Guarantee terms apply" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <item.icon className="w-5 h-5 text-[#f38669] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-[#1d3b56] uppercase tracking-wide">{item.title}</p>
                    <p className="text-[10px] font-semibold text-gray-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. Student Stories Gallery */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Real Students, Real Stories</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#1d3b56] md:text-5xl">
              Hear from our students
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {STUDENTS.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => {
                  setActiveVideo(student.id)
                  alert(`Starting student story video play for ${student.name}`)
                }}
                className="group relative flex flex-col items-stretch overflow-hidden rounded-[2rem] border-4 border-white bg-white p-2 shadow-sm hover:shadow-md transition text-left"
              >
                {/* Portrait Image wrapper */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem]">
                  <Image 
                    src={student.img} 
                    alt={student.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-[#1d3b56]/20 transition-opacity group-hover:bg-[#1d3b56]/15" />
                  
                  {/* Glassmorphic Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition group-hover:scale-110 active:scale-95 shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Video description labels */}
                <div className="p-3 space-y-1">
                  <h4 className="text-[13px] font-black text-[#1d3b56] truncate leading-tight">{student.label}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">@{student.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-[#1d3b56] text-white py-8 text-center text-xs font-bold border-t border-white/5">
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
