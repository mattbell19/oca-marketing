'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Award,
  Clock,
  MapPin,
  CreditCard,
  Mail,
  ChevronDown,
  Menu,
  X,
  Users,
  Monitor,
  Sparkles,
  BookOpen,
  Calendar,
  Lock,
  ChevronRight,
  TrendingUp,
  Shield,
  Briefcase,
  HelpCircle,
  ShoppingCart,
  Percent,
  Video,
  FileText
} from 'lucide-react'
import Image from 'next/image'
import OcaFooter from '../components/OcaFooter'

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

const OFFER_DEADLINE_LABEL = 'Thursday'
const BOOK_CALL_URL = 'https://bit.ly/ocachat'
const CRIMINOLOGY_UPFRONT_CHECKOUT_URL = 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=9410&utm_source=criminology-newlp'
const CRIMINOLOGY_WEEKLY_CHECKOUT_URL = 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=9410&paymenttype=debitsuccess&utm_source=criminology-newlp'
const CRIMINOLOGY_AFTERPAY_CHECKOUT_URL = 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=9410&paymenttype=afterpay&utm_source=criminology-newlp'
const CRIMINOLOGY_CTA_URL = CRIMINOLOGY_UPFRONT_CHECKOUT_URL

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const getWeeklyOfferDeadline = () => {
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

const getTimeLeft = () => {
  const diff = getWeeklyOfferDeadline().getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

export default function CriminologyLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Keep the EOFY timer aligned with the live campaign copy.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft())
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

  // State for accordions
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  // State for pricing accordions & custom tabs
  const [activeWhyUs, setActiveWhyUs] = useState<number | null>(0)

  // State for cart drawer & interactive checkout
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    details: string;
    price: number;
    initial: number;
    url: string;
    installments: string;
  } | null>(null)
  const [checkoutCode, setCheckoutCode] = useState('')
  const [isCodeApplied, setIsCodeApplied] = useState(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  // Info pack form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: ''
  })
  const [infoSuccess, setInfoSuccess] = useState(false)

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInfoSuccess(true)
    setTimeout(() => {
      setInfoSuccess(false)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', reason: '' })
    }, 6000)
  }

  const openCheckout = (plan: typeof selectedPlan) => {
    setSelectedPlan(plan)
    setIsCartOpen(true)
    setIsOrderPlaced(false)
  }

  const handleApplyCode = () => {
    if (checkoutCode.trim().toUpperCase() === 'EOFY') {
      setIsCodeApplied(true)
    } else {
      alert("Invalid code! Try entering 'EOFY' for special discounts.")
    }
  }

  return (
    <div id="criminology-bundle-page" className="min-h-screen bg-white text-[#1d3b56] font-sans selection:bg-[#a6d5c7] selection:text-[#1d3b56] overflow-x-clip">
      
      {/* 1. Header Promotion Ribbon */}
      <div className="bg-[#a6d5c7] text-[#1d3b56] py-3 px-4 text-center font-bold text-xs sm:text-sm relative z-50 shadow-sm flex flex-wrap gap-2 items-center justify-center">
        <Sparkles className="w-4 h-4 animate-bounce text-[#f38669]" />
        <span className="flex items-center gap-1.5 ml-1">
          Code: <span className="bg-[#1d3b56] text-white px-2 py-0.5 rounded font-mono text-xs tracking-wider">EOFY</span>
        </span>
        <div className="flex items-center gap-2 bg-[#1d3b56]/10 px-3 py-0.5 rounded text-xs">
          <span>⏰ Ends in:</span>
          <span>{timerValue.days}d : {timerValue.hours}h : {timerValue.minutes}m : {timerValue.seconds}s</span>
        </div>
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="bg-white/95 backdrop-blur py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-[100] border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="relative w-36 h-9 md:w-44 md:h-11">
            <Image 
              src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png" 
              alt="OCA Logo" 
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex gap-6 text-sm font-bold text-[#1d3b56]/80">
            <a href="#about-bundle" className="hover:text-[#f38669] transition-colors">Course Info</a>
            <a href="#why-oca" className="hover:text-[#f38669] transition-colors">Why Study Us?</a>
            <a href="#course-topics" className="hover:text-[#f38669] transition-colors">Topics</a>
            <a href={CRIMINOLOGY_CTA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#f38669] transition-colors">Buy Now</a>
          </nav>
        </div>

        {/* Action Button & Contact Details wrapper */}
        <div className="hidden md:flex items-center gap-6 text-xs text-right">
          <div className="flex flex-col gap-0.5 border-r border-gray-100 pr-5">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Admissions & Questions</span>
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-end gap-1 font-black text-[#1d3b56] hover:text-[#f38669] transition-colors">
              <Calendar className="w-3 h-3 text-[#f38669]" /> Book A Call
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href={CRIMINOLOGY_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f38669] text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-[#e26e50] active:scale-95 transition-all text-xs uppercase tracking-wide"
            >
              Buy Now
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#1d3b56] p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Interactive Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 bg-white z-[90] flex flex-col justify-between p-6 border-b border-gray-100 shadow-xl overflow-y-auto"
          >
            <div className="space-y-8 py-4">
              <nav className="flex flex-col gap-4 text-base font-bold text-[#1d3b56]">
                <a 
                  href="#about-bundle" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50"
                >
                  Criminology Course Bundle
                </a>
                <a 
                  href="#why-oca" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50"
                >
                  Why Students Love US
                </a>
                <a 
                  href="#course-topics" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50"
                >
                  Course Topics
                </a>
                <a 
                  href={CRIMINOLOGY_CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50"
                >
                  Buy Now
                </a>
              </nav>
              
              <div className="border-t border-gray-100 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1d3b56]/40 mb-3">Questions & Support</p>
                <div className="space-y-3 font-bold text-sm text-[#1d3b56]/95">
                  <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#f38669]" />
                    <span>Book A Call With OCA</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-gray-100 pb-8">
              <div className="bg-[#d4efe8]/40 p-4 rounded-xl flex items-center justify-between border border-[#a6d5c7]/50">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1d3b56]">Trustpilot Excellent</span>
                  <span className="text-[10px] text-gray-500">Based on 2,500+ Reviews</span>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#00b67a] text-[#00b67a]" />)}
                </div>
              </div>
              <a 
                href={CRIMINOLOGY_CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-4 bg-[#f38669] text-center text-white font-bold rounded-xl shadow-md uppercase tracking-wide text-xs"
              >
                Buy Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Layout (Visual & High-Converting) */}
      <section className="relative px-6 md:px-12 py-10 md:py-20 lg:py-28 bg-[#d4efe8] overflow-hidden">
        
        {/* Swerving background circle elements from MUA branding */}
        <div className="hidden md:block absolute top-1/2 left-1/2 lg:left-[80%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-15 pointer-events-none">
          <div className="w-full h-full relative">
            {[...Array(18)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 left-1/2 w-[55%] h-[120px] bg-[#a6d5c7] origin-left -translate-y-1/2" 
                style={{ transform: `translate(-50%, -50%) rotate(${i * 20}deg)` }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] bg-[#d4efe8] rounded-full"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span className="bg-[#f38669] text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest inline-flex items-center gap-1.5 mb-5 shadow-sm">
              <Award className="w-3.5 h-3.5" /> Course Bundle
            </span>
            
            {/* Highlighter block text similar to MUA page but with Criminology Course Bundle */}
            <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black text-[#1d3b56] leading-[0.98] mb-6 tracking-tighter">
              <span className="relative inline-block px-3 py-0 mb-2">
                <span className="absolute inset-0 bg-[#f38669] -skew-x-3 transform rounded-md"></span>
                <span className="relative text-white font-bold block">Criminology</span>
              </span>
              <br/>
              <span className="font-serif italic font-normal text-[#1d3b56]/95 leading-none">Course Bundle</span>
            </h1>

            {/* Sub-Badges Matrix */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#f38669]" />
                <span className="text-xs font-bold text-[#1d3b56]">47 Study Hours</span>
              </div>
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-[#00b67a] text-[#00b67a]" />)}
                </div>
                <span className="text-xs font-bold text-[#1d3b56]">Trustpilot Excellent</span>
              </div>
            </div>

            {/* Main description paragraph */}
            <p className="text-[#1d3b56]/90 text-sm sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-8">
              Explore the justice system, understand criminal behaviour and build real-world insight into why people offend. This entry-level bundle brings criminology and psychology together so you can investigate career pathways, theory and practical concepts – <strong className="text-[#f38669]">without needing prior experience.</strong>
            </p>

            {/* Quick Pricing Summary Banner */}
            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white inline-flex mb-8 shadow-sm">
              <div className="text-left select-none">
                <p className="text-[10px] uppercase font-black tracking-widest text-[#1d3b56]/50">Bundle Deal Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#1d3b56]">$999</span>
                  <span className="text-sm text-red-400 line-through font-bold">$1450</span>
                </div>
              </div>
              <div className="border-l border-[#a6d5c7]/50 pl-4">
                <p className="text-xs text-[#1d3b56]/80 font-bold leading-tight">7-Day Money Back Guarantee Included</p>
                <p className="text-[10px] text-gray-500">Risk-free cooling off period details below</p>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative w-full max-w-md mx-auto">
              
              {/* Overlapping graphics */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#ffdb71] rounded-full filter blur-xl opacity-60 mix-blend-multiply animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#fff0c0] rounded-full filter blur-xl opacity-70 mix-blend-multiply animate-pulse"></div>
              
              {/* Outer frame matching typography styling of MUA layout but adapted to high-vis criminology focus */}
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative border-[10px] border-white shadow-2xl z-20 group">
                <Image 
                  src="/oca-assets/criminology-hero-police.webp" 
                  alt="Police officer representing criminology and justice career pathways" 
                  fill 
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                  unoptimized
                />
                
                {/* Visual Label Sticker On Photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ffdb71] rounded-full flex items-center justify-center text-[#1d3b56]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#1d3b56] tracking-tight leading-none mb-1">Criminology & Psychology</p>
                      <p className="text-[10px] text-gray-500">2-in-1 Affiliated Bundles</p>
                    </div>
                  </div>
                  <div className="h-10 w-16 rounded-lg bg-[#1d3b56] border border-[#1d3b56]/10 shadow-sm flex flex-col items-center justify-center text-white leading-none">
                    <span className="text-[10px] font-black tracking-tight">CPD</span>
                    <span className="text-[7px] font-bold uppercase tracking-wider opacity-80">Certified</span>
                  </div>
                </div>
              </div>
              
              {/* Rounded Price Floating Badge */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-[#f38669] rounded-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-center text-white z-30 transform rotate-6 hover:scale-110 transition-transform cursor-default">
                <span className="text-[9px] uppercase tracking-widest font-bold leading-none">Only</span>
                <span className="text-2xl font-black leading-tight">$999</span>
                <span className="text-[8px] uppercase line-through opacity-75">$1450</span>
                <span className="text-[8px] bg-white text-[#f38669] px-1.5 rounded-full font-bold tracking-tight mt-1">SAVE $450</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Quick Sticky EOFY Timer / Notice Banner */}
      <section className="bg-amber-50 border-b border-amber-200 py-4 px-6 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#f38669] animate-spin" />
          <span className="text-sm font-bold text-[#1d3b56]">
            ❤️ WEEKLY SPECIAL PRICE ENDS {OFFER_DEADLINE_LABEL.toUpperCase()}!
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white border border-amber-300 px-3 py-1 rounded shadow-sm text-sm font-mono font-bold text-[#1d3b56]">
            <span>{timerValue.days}</span>
            <span className="text-[10px] text-gray-400 font-sans">Days</span>
            <span className="text-amber-300">:</span>
            <span>{timerValue.hours}</span>
            <span className="text-[10px] text-gray-400 font-sans">Hrs</span>
            <span className="text-amber-300">:</span>
            <span>{timerValue.minutes}</span>
            <span className="text-[10px] text-gray-400 font-sans">Min</span>
            <span className="text-amber-300">:</span>
            <span>{timerValue.seconds}</span>
            <span className="text-[10px] text-gray-400 font-sans">Sec</span>
          </div>
        </div>
      </section>

      {/* 6. Main Detailed Course Info & Stats Block */}
      <section id="about-bundle" className="py-16 md:py-28 bg-white relative">
        <span id="topics" className="absolute -top-24" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Right Block - Course value and descriptions */}
            <div className="lg:col-span-7 space-y-8">
              <div className="text-center md:text-left">
                <span className="text-[#f38669] text-xs font-extrabold uppercase tracking-widest block mb-2 leading-none">Your Criminology & Psychology Bundle</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1d3b56] tracking-tight leading-none mb-4">
                  2 Comprehensive Courses,<br className="hidden sm:block"/>1 Affordable Price
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  Make the smart move with two industry-led courses designed to help you understand crime, behaviour, justice systems and the human mind.
                </p>
              </div>

              {/* Value list cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#fff0c0]/40 p-5 rounded-2xl border border-[#ffdb71] relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="bg-[#f38669] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-3 leading-none">Course Item 1</span>
                    <h3 className="font-black text-[#1d3b56] text-lg leading-tight mb-1">Criminology Course Bundle</h3>
                    <p className="text-xs text-gray-500 mb-6">Explore crime classification, crime scenes, profiling, victimology, forensic science and how society responds to offending.</p>
                  </div>
                  <span className="text-sm font-bold text-[#1d3b56]">Valued at <strong className="text-[#f38669] font-black">$899</strong></span>
                </div>

                <div className="bg-[#d4efe8]/40 p-5 rounded-2xl border border-[#a6d5c7] relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <span className="bg-[#1d3b56] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-3 leading-none">Course Item 2</span>
                    <h3 className="font-black text-[#1d3b56] text-lg leading-tight mb-1">Psychology Course</h3>
                    <p className="text-xs text-gray-500 mb-6">Build a practical foundation in behaviour, personality, mental health, social psychology and psychological research.</p>
                  </div>
                  <span className="text-sm font-bold text-[#1d3b56] block">Valued at <strong className="text-teal-600 font-black">$499</strong></span>
                </div>
              </div>

              {/* Highlighting total savings */}
              <div className="bg-[#feaf9d]/30 rounded-3xl p-6 border-2 border-dashed border-[#f38669]/60 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="text-base font-black text-[#1d3b56] mb-1">Bundle more learning for less</h4>
                  <p className="text-xs text-[#1d3b56]/80 font-medium">Purchase both as a unified bundle and start practical criminology and psychology learning in one place.</p>
                </div>
                <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-sm tracking-tight inline-block text-center whitespace-nowrap">
                  <span className="text-[10px] text-gray-400 font-bold block leading-none">TOTAL VALUE: $1,398</span>
                  <span className="text-xl font-black text-[#f38669]">$999 Complete</span>
                </div>
              </div>

              {/* Australian Government JobOutlook Widget */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="bg-[#1d3b56] p-3.5 rounded-2xl text-white">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-[#1d3b56] mb-2">High Projected Job Growth</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      According to the Australian Government’s JobOutlook website, over <strong>28,000 job openings</strong> are projected in related fields over the next five years — across law enforcement, legal services, policy, and community support.
                    </p>
                    {/* Visual Salary Metric Slider */}
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1d3b56]/40 leading-none block mb-1">Criminology Career Salary Range</span>
                        <span className="text-sm font-black text-[#1d3b56]">$85,000 - $126,000 per year</span>
                      </div>
                      <div className="w-full sm:w-44 h-2 bg-gray-100 rounded-full relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-[25%] right-[15%] bg-[#f38669] rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-left font-medium text-gray-700 space-y-4">
                <p>
                  This course is designed to help you explore this industry whilst developing real-world skills. From understanding criminal behaviour to learning how society responds, you’ll gain insight into the role criminologists play in:
                </p>
                <ul className="grid sm:grid-cols-2 gap-3.5 pt-2">
                  {[
                    "Analysing patterns of crime and behaviour",
                    "Supporting rehabilitation and prevention efforts",
                    "Shaping policy and community safety strategies",
                    "Advising in legal, government, and justice settings"
                  ].map((task, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-gray-700 leading-snug">{task}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-4 text-xs sm:text-sm text-gray-500 leading-normal">
                  Whether you’re a true crime lover or considering a future in justice, youth work, legal support, or further study, this course is your first step towards making a meaningful impact. No prerequisites. Flexible, real-world learning to help you explore your potential.
                </p>
                
                <div className="pt-6 text-center flex flex-col items-center">
                  <a 
                    href={CRIMINOLOGY_CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-[#f38669] text-white font-black rounded-full uppercase text-sm tracking-widest shadow-xl hover:bg-[#e26e50] active:scale-95 transition-all w-full sm:w-auto justify-center"
                  >
                    Buy Now & Get Instant Access <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[#1d3b56]/40 text-[10px] font-black uppercase tracking-widest mt-4">AFTERPAY & INTEREST FREE PAYMENT PLAN AVAILABLE</p>
                </div>
              </div>
            </div>

            {/* Right Block - Sidebar Info & Info Form */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              {/* Floating Quick Info Card */}
              <div className="bg-[#fff0c0] p-6 rounded-3xl border border-[#ffdb71] shadow-sm space-y-5">
                <span className="bg-[#f38669] text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded inline-block leading-none">FAST STATS INFO pack</span>
                
                <div className="space-y-4 pt-1 divide-y divide-[#ffdb71]/50">
                  <div className="flex gap-4 items-start pt-1">
                    <Calendar className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-black uppercase text-[#1d3b56]/40 mb-1 leading-none">Course Delivery & Start</h4>
                      <p className="text-sm font-bold text-gray-800 leading-tight">Start anytime, flexible 100% study on demand</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start pt-3">
                    <TrendingUp className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-black uppercase text-[#1d3b56]/40 mb-1 leading-none">Career Salary Range</h4>
                      <p className="text-sm font-bold text-gray-800 leading-tight">$85,000 - $126,000</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start pt-3">
                    <Users className="w-5 h-5 text-[#f38669] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-black uppercase text-[#1d3b56]/40 mb-1 leading-none">Course Mentor</h4>
                      <p className="text-sm font-bold text-gray-800 leading-tight">Real-world expert mentor with active industry experience</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#ffdb71] pt-4 flex gap-4 items-center justify-between">
                  <span className="text-xs text-[#1d3b56]/70 font-semibold">Have Questions? Call us:</span>
                  <a href="tel:1300611404" className="font-extrabold text-[#1d3b56] bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-sm text-xs hover:text-[#f38669] transition-colors leading-none">1300 611 404</a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. Free Info Pack Dedicated Section */}
      <section className="hidden py-20 bg-slate-50 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffdb71] opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a6d5c7] opacity-5 translate-y-1/2 -translate-x-1/2 rounded-full"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#f38669] text-xs font-black uppercase tracking-widest block mb-3 leading-none underline decoration-[#ffdb71] decoration-2 underline-offset-4">START YOUR JOURNEY</span>
                <h3 className="text-3xl md:text-4xl font-black text-[#1d3b56] mb-4 tracking-tight leading-none">
                  Get Your Free <span className="text-[#f38669]">Course Outline</span>
                </h3>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed font-medium">
                  Discover the full Topics, career outcomes, and flexible study options. Download the detailed 2-in-1 Criminology & Psychology bundle guide instantly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#d4efe8] flex items-center justify-center text-teal-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#1d3b56]">Instant Course Outline PDF Download</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fff0c0] flex items-center justify-center text-amber-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#1d3b56]">Career Salary Guide Included</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-gray-100">
                {infoSuccess ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-[#d4efe8] rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-[#1d3b56]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#1d3b56] mb-2">Check Your Inbox!</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">We have sent the detailed Course Pack to your email address.</p>
                    <div className="bg-[#1d3b56] text-white p-3 rounded-xl text-xs font-mono inline-block">
                      <span>CourseOutline_Download.pdf</span>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInfoSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold uppercase text-[#1d3b56]/40 leading-none mb-1.5 block">First Name</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full bg-white px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm text-gray-700 font-medium transition-all"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold uppercase text-[#1d3b56]/40 leading-none mb-1.5 block">Last Name</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full bg-white px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm text-gray-700 font-medium transition-all"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold uppercase text-[#1d3b56]/40 leading-none mb-1.5 block">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-white px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm text-gray-700 font-medium transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold uppercase text-[#1d3b56]/40 leading-none mb-1.5 block">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        className="w-full bg-white px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm text-gray-700 font-medium transition-all"
                        placeholder="0400 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <button className="w-full py-4 bg-[#f38669] hover:bg-[#e26e50] text-white font-black rounded-xl transition-all uppercase text-xs tracking-wider shadow-lg active:scale-[0.98]">
                      Download Info Pack
                    </button>
                    <p className="text-[10px] text-[#1d3b56]/30 text-center leading-normal">
                      Instant delivery to your inbox.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Students Love learning with Us (Features, Accordions / Toggles) */}
      <section id="why-oca" className="py-20 bg-slate-50 border-y border-gray-200/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#f38669] text-xs font-black uppercase tracking-widest block mb-2 leading-none">NO DENSE TEXTBOOKS</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1d3b56] tracking-tight leading-none mb-6">
              Why Students Love Learning With Us
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-semibold">
              We design digestible step-by-step modules and high-quality video sessions, backed by 24/7 tutorial support. The lessons are all taught on demand, and assessments are generally short answer or multiple-choice and can be re-taken as many times as needed. They’re perfect for people with busy lives and families who want to better themselves while unlocking better opportunities.
            </p>
          </div>

          <div id="course-topics" className="mb-14 scroll-mt-32 rounded-[2rem] border border-[#d4efe8] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-2 text-center md:text-left">
              <span className="text-[#f38669] text-xs font-black uppercase tracking-widest leading-none">Course Topics</span>
              <h3 className="text-2xl md:text-4xl font-black text-[#1d3b56] tracking-tight leading-none">What you&apos;ll cover inside the bundle</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                'Criminological science and the justice system',
                'Criminal psychology and behaviour analysis',
                'Modern forensic investigation concepts',
                'Prevention, policy and rehabilitation pathways'
              ].map((topic, index) => (
                <div key={topic} className="rounded-2xl bg-[#d4efe8]/45 p-5 text-left">
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3b56] text-xs font-black text-white">{index + 1}</span>
                  <p className="text-sm font-black leading-snug text-[#1d3b56]">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left interactive segment mapping the bullet points */}
            <div className="lg:col-span-6 space-y-4">
              {[
                {
                  title: 'Fully CPD Certified',
                  text: 'Our Criminology Course Bundle holds CPD certification, helping you show ongoing professional development and credible learning progress.',
                  color: 'hover:bg-[#ffdb71]/20 border-l-4 border-yellow-400 bg-white'
                },
                {
                  title: '100% online and on-demand',
                  text: 'Self-paced flexible lessons mean you can learn anytime of night or day. Designed around your busy calendar commitments.',
                  color: 'hover:bg-[#d4efe8]/20 border-l-4 border-emerald-400 bg-white'
                },
                {
                  title: 'Dedicated round-the-clock support',
                  text: 'Access student mentors 24/7. Never feel stuck with difficult concepts - we provide instant explanations and helpful guidance.',
                  color: 'hover:bg-red-50 border-l-4 border-rose-400 bg-white'
                },
                {
                  title: 'Real world, industry-led learning',
                  text: 'Built in alignment with current legal professionals, and policy analysts. Gain practical knowledge with absolute real relevance.',
                  color: 'hover:bg-blue-50 border-l-4 border-blue-400 bg-white'
                },
                {
                  title: 'Professional industry-led learning',
                  text: 'Gain knowledge built in alignment with current legal professionals, and policy analysts. Practical expertise with absolute real relevance.',
                  color: 'hover:bg-[#fff0c0]/35 border-l-4 border-[#ffdb71] bg-white'
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`p-5 rounded-2xl shadow-sm cursor-pointer transition-all border border-gray-100 ${item.color} ${activeWhyUs === index ? 'ring-2 ring-indigo-500/20 shadow-md' : 'opacity-85'}`}
                  onClick={() => setActiveWhyUs(index)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-[#1d3b56] text-base sm:text-lg flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1d3b56]"></span>
                      {item.title}
                    </h4>
                    <span className="text-[10px] uppercase tracking-widest text-[#1d3b56]/40 font-black">
                      {activeWhyUs === index ? 'Active details' : 'Click to view'}
                    </span>
                  </div>
                  {activeWhyUs === index && (
                    <p className="text-xs text-gray-600 mt-2.5 leading-relaxed font-semibold">
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Right side information display block */}
            <div className="lg:col-span-6">
              <div className="bg-[#1d3b56] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                
                {/* Decorative circle graphic */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full border border-white/10"></div>
                
                <h3 className="text-white text-3xl font-black mb-6 tracking-tight font-serif italic flex items-center gap-2">
                  <Award className="w-8 h-8 text-[#ffdb71]" /> Industry Aligned
                </h3>
                
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
                  Upon successful completion of this course you will receive an official course completion acknowledgement and short form credential for: <strong>Criminology Course Bundle</strong>.
                </p>

                <div id="course-outline-accordions" className="bg-white/10 p-5 rounded-3xl border border-white/10 space-y-4">
                  <h4 className="text-[#ffdb71] font-bold text-xs uppercase tracking-widest leading-none">Interactive Course Outline Accordions</h4>
                  
                  {/* Detailed Interactive Accordions */}
                  <div className="space-y-2">
                    {[
                      {
	                        id: 'careers',
	                        label: 'Career Pathways & Roles',
	                        content: 'Explore pathways in youth justice support, community safety programs, legal administration, policy and research assistance, victim advocacy, loss prevention, security support and further forensic or social science study.'
	                      },
                      {
                        id: 'delivery',
                        label: 'Course Delivery & Learner Support',
                        content: 'Your study portal is accessible 24/7 from laptop, tablet or phone. You are allocated an industry mentor who is available through virtual meetings and live chat, answering all assignment questions.'
                      },
                      {
                        id: 'topics',
                        label: 'Course Topics & Modules',
                        content: 'Module 1: Criminological Science (Sociology & Justice System) • Module 2: The Criminal Psyche (Cognitive and behavior analysis) • Module 3: Modern Forensic Investigations • Module 4: Preventive and Policy Rehabilitation Programs.'
                      }
                    ].map((acc) => (
                      <div key={acc.id} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                        <button 
                          onClick={() => toggleAccordion(acc.id)}
                          className="w-full px-5 py-3 text-left font-bold text-xs uppercase tracking-wider flex justify-between items-center text-white hover:bg-white/5 transition-colors focus:outline-none"
                        >
                          <span>{acc.label}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-[#ffdb71] transform transition-transform ${activeAccordion === acc.id ? 'rotate-180' : ''}`} />
                        </button>
                        {activeAccordion === acc.id && (
                          <div className="p-5 text-xs text-white/70 leading-relaxed border-t border-white/5 bg-[#1d3b56]/80 font-medium">
                            {acc.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>

                {/* Simulated EOFY Badge */}
                <span className="absolute bottom-5 right-5 text-[9px] font-mono text-white/30 tracking-widest uppercase">
                  OCA ACCREDITED © 2026
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Pricing & Enrolment Section (Three Column Options) */}
      <section id="pricing" className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#f38669] text-xs font-black uppercase tracking-widest block mb-2 leading-none">INVEST IN YOURSELF</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#1d3b56] tracking-tight leading-none mb-4">
              Buy Now
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Choose the perfect plan to match your lifestyle budget. All payment plans are 100% interest-free.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            
            {/* Card 1: Afterpay (Buy Now Pay Later) */}
            <div className="bg-slate-50 rounded-[2.5rem] border border-gray-100 p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="bg-[#1d3b56] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider mb-6 inline-block leading-none">Buy Now Pay Later</span>
                
                <h3 className="text-3xl font-black text-[#1d3b56] tracking-tight mb-2">Afterpay Plan</h3>
                
                <ul className="space-y-2 mb-6 text-xs font-bold text-[#1d3b56]/70">
                  <li className="flex items-center gap-2">✔️ Interest Free Terms</li>
                  <li className="flex items-center gap-2">✔️ Lifetime Portal Access</li>
                  <li className="flex items-center gap-2">✔️ Unlimited Tutor Support</li>
                </ul>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center mb-6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1 font-bold leading-none">Fortnightly Payment</span>
                  <p className="text-3xl font-black text-[#1d3b56]">$249.75</p>
                  <p className="text-[9px] text-gray-500 mt-2 font-semibold">Make 4 interest-free fortnightly payments.</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-[#1d3b56] text-center mb-4">Total Cost Model: <strong className="text-[#f38669]">$999</strong></p>
                <a 
                  href={CRIMINOLOGY_AFTERPAY_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#1d3b56] text-white hover:bg-[#152a3d] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-auto focus:outline-none text-center"
                >
                  Buy Now - Afterpay
                  <span className="block text-[9px] tracking-normal opacity-80 mt-1">Afterpay & Interest Free Payment Plan</span>
                </a>
              </div>
            </div>

            {/* Card 2: Upfront + Save (Best Deal - MOST POPULAR) */}
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
                  <span className="text-[10px] text-red-400 line-through block font-bold leading-none mb-1">WAS $1450 FULL PRICE</span>
                  <p className="text-4xl font-black text-[#f38669]">$999 <span className="text-xs text-slate-400 font-medium">AUD</span></p>
                  <p className="text-[9px] text-gray-500 mt-2 font-semibold">Single payment. Best available discounted rate.</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-[#1d3b56] text-center mb-4">Total Cost Model: <strong className="text-[#f38669]">$999</strong></p>
                <a 
                  href={CRIMINOLOGY_UPFRONT_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#f38669] text-white hover:bg-[#e26e50] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-auto focus:outline-none text-center"
                >
                  Buy Now - Upfront
                  <span className="block text-[9px] tracking-normal opacity-80 mt-1">Afterpay & Interest Free Payment Plan</span>
                </a>
              </div>
            </div>

            {/* Card 3: Weekly Installment Plan */}
            <div className="bg-amber-100/50 rounded-[2.5rem] border border-amber-200 p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow">
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
                  <p className="text-3xl font-black text-gray-800">$25 <span className="text-xs text-gray-400">/wk</span></p>
                  <p className="text-[9px] text-gray-500 mt-2 font-semibold">Paid weekly for 58 weeks. No hidden interest.</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-[#1d3b56] text-center mb-4">Total Cost Model: <strong className="text-[#f38669]">$1450</strong></p>
                <a 
                  href={CRIMINOLOGY_WEEKLY_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-amber-500 text-white hover:bg-amber-600 font-bold text-xs uppercase tracking-wide rounded-xl transition-all shadow-md mt-auto focus:outline-none text-center"
                >
                  Buy Now - Interest Free
                  <span className="block text-[9px] tracking-normal opacity-80 mt-1">Afterpay & Interest Free Payment Plan</span>
                </a>
              </div>
            </div>
          </div>

          {/* Guarantee board underneath prices */}
          <div className="mt-16 bg-slate-50 border border-gray-100 p-8 rounded-[2.5rem] text-center max-w-4xl mx-auto">
            <h4 className="text-lg font-black text-[#1d3b56] mb-3">We want you to love what you&apos;re learning!</h4>
            <p className="text-sm text-gray-650 leading-relaxed max-w-2xl mx-auto font-medium">
              If your course isn&apos;t the right fit, we offer a <strong>7-day cooling-off period</strong> so you can either switch to another course or get your money back. No pressure, no hassle — just real flexibility. It&apos;s why thousands of students choose OCA for their learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Related Categories & Drops Sector (Be Inspired) */}
      <section id="blog-section" className="hidden py-20 bg-slate-50 border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-xs font-black uppercase tracking-widest block mb-1">STAY INSPIRED</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1d3b56] tracking-tight leading-none mb-3">
              Be inspired with industry led-content dropping weekly
            </h2>
            <div className="flex justify-center gap-2 mt-4 select-none">
              <span className="bg-[#a6d5c7] text-[#1d3b56] font-bold text-xs px-4 py-1 rounded-full uppercase">Criminology</span>
            </div>
          </div>

          {/* Blog columns as given in the screenshots */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Story 1 */}
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=600" 
                    alt="Study Criminology Ambitions Online" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 bg-[#1d3b56] text-white px-2.5 py-1 rounded-lg font-mono text-[10px]">
                    November 16
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-lg text-[#1d3b56] tracking-tight mb-3 leading-snug">
                    The Benefits of Using a Criminology Course Online to Realise Your Career Ambitions
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    Unlock a criminology career through online courses, offering flexible learning and practical skills. Embrace a convenient pathway to diverse opportunities in the field. Realize your ambitions on your own terms.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a href="#about-bundle" className="text-xs font-black uppercase text-[#f38669] hover:underline flex items-center gap-1">
                  Read More <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1453733190148-c44698c26588?auto=format&fit=crop&q=80&w=600" 
                    alt="Applying Criminology Knowledge" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 bg-[#1d3b56] text-white px-2.5 py-1 rounded-lg font-mono text-[10px]">
                    November 13
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-lg text-[#1d3b56] tracking-tight mb-3 leading-snug">
                    Applying the Knowledge From Criminology Course Online in the Real World
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    Bringing the virtual into reality, this article delves into the practical application of criminology course knowledge gained online. Discover valuable insights on translating theory into action...
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a href="#about-bundle" className="text-xs font-black uppercase text-[#f38669] hover:underline flex items-center gap-1">
                  Read More <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" 
                    alt="Strategies for criminological course success" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 bg-[#1d3b56] text-white px-2.5 py-1 rounded-lg font-mono text-[10px]">
                    November 9
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-lg text-[#1d3b56] tracking-tight mb-3 leading-snug">
                    Strategies For Success On a Criminology Course Online
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    Embarking on an online criminology course? Success is within your reach. In this article, we&apos;ll share key strategies to help you thrive in your virtual learning environment.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a href="#about-bundle" className="text-xs font-black uppercase text-[#f38669] hover:underline flex items-center gap-1">
                  Read More <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9b. Final CTA */}
      <section className="py-16 md:py-24 bg-[#1d3b56] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[#ffdb71] text-xs font-black uppercase tracking-widest block mb-3">Ready when you are</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6">
            Start your Criminology Course Bundle today
          </h2>
          <p className="text-white/75 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Lock in this week&apos;s offer and get instant access to practical, self-paced criminology and psychology learning.
          </p>
          <a href={CRIMINOLOGY_CTA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl hover:bg-[#e26e50] active:scale-95 transition-all">
            Buy Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 10. Partner Logos Carousel Block (Aesthetic trust seals) */}
      <section className="hidden bg-white border-t border-gray-150 py-12 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-mono">Endorsements, memberships and partnerships</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
            <div className="h-12 w-24 bg-[#1d3b56] border border-[#1d3b56]/10 rounded-lg select-none flex flex-col items-center justify-center text-white leading-none">
              <span className="text-sm font-black tracking-tight">CPD</span>
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">Certified</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-lg text-xs font-black text-slate-500 select-none">ICOES Accreditation</div>
            <div className="bg-teal-50 border border-teal-200 text-[#1d3b56] px-5 py-2.5 rounded-lg text-xs font-black select-none">Validated Learner Credential</div>
            <div className="bg-amber-50 border border-amber-200 text-amber-600 px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 select-none">⭐⭐⭐⭐⭐ Trustpilot</div>
          </div>
        </div>
      </section>

      {/* 11. Custom Interactive Checkout Modal Drawer (Adding dynamic quality) */}
      <AnimatePresence>
        {isCartOpen && selectedPlan && (
          <React.Fragment>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-[1000]"
            />
            {/* Modal Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[1001] p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#f38669]" />
                    <h3 className="text-lg font-black text-[#1d3b56]">Your Checkout Cart</h3>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full text-slate-400 hover:text-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isOrderPlaced ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-[#d4efe8] rounded-full flex items-center justify-center text-teal-600 mx-auto mb-4 border border-teal-300">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h4 className="text-xl font-black text-[#1d3b56] mb-2">Registration Confirmed!</h4>
                    <p className="text-sm text-gray-550 leading-relaxed mb-6">Your student portal login details and intro pack has been sent to your email.</p>
                    
                    <div className="bg-[#fff0c0] p-4 rounded-2xl border border-[#ffdb71] text-left text-xs mb-8">
                      <p className="font-extrabold text-[#1d3b56] mb-1">Registration Summary:</p>
                      <ul className="space-y-1 font-semibold text-gray-700">
                        <li>🎯 Course: Criminology Course Bundle</li>
                        <li>💳 Plan: {selectedPlan.name}</li>
                        <li>💰 Paid Initial: ${isCodeApplied ? (selectedPlan.initial * 0.5).toFixed(2) : selectedPlan.initial}</li>
                        <li>🕒 Access Limits: Permanent Lifetime</li>
                      </ul>
                    </div>

                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-4 bg-[#1d3b56] text-white font-bold rounded-xl shadow-md uppercase tracking-wide text-xs focus:outline-none"
                    >
                      Return to Learning
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {/* Course Item Row */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 flex gap-3.5">
                      <div className="h-16 w-16 bg-[#d4efe8] rounded-xl shrink-0 border relative flex items-center justify-center text-[#1d3b56]">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-sm text-[#1d3b56] leading-tight">Criminology Course Bundle</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Includes Psychology + Mentor Support</p>
                        <span className="text-xs font-extrabold text-[#f38669] block mt-1">Price model: ${selectedPlan.price}</span>
                      </div>
                    </div>

                    {/* Cost Summary Box */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 text-sm space-y-2.5">
                      <h5 className="font-black text-gray-450 uppercase text-[10px] tracking-wide mb-1 block">Checkout Cost Pricing</h5>
                      <div className="flex justify-between font-medium">
                        <span>Selected Payment:</span>
                        <span className="font-bold">{selectedPlan.name}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Original Pricing:</span>
                        <span className="font-mono">${selectedPlan.price} AUD</span>
                      </div>
                      
                      {isCodeApplied && (
                        <div className="flex justify-between text-emerald-600 font-bold bg-white p-2 rounded border border-emerald-200 text-xs">
                          <span>EOFY 50% discount:</span>
                          <span className="font-mono">-${(selectedPlan.price * 0.5).toFixed(2)} AUD</span>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-2.5 flex justify-between items-baseline font-black text-base text-[#1d3b56]">
                        <span>Today&apos;s Initial:</span>
                        <span className="text-xl text-[#f38669] font-mono">
                          ${isCodeApplied ? (selectedPlan.initial * 0.5).toFixed(2) : selectedPlan.initial}
                        </span>
                      </div>
                    </div>

                    {/* Promo checkout coupon */}
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Do you have EOFY Promo Code?</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="e.g. EOFY" 
                          className="flex-1 bg-white px-3 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-[#a6d5c7] outline-none font-bold placeholder:font-normal uppercase"
                          value={checkoutCode}
                          onChange={(e) => setCheckoutCode(e.target.value)}
                        />
                        <button 
                          onClick={handleApplyCode}
                          className="px-4 py-2 bg-slate-100 hover:bg-[#a6d5c7] text-[#1d3b56] hover:text-[#1d3b56] font-bold text-xs rounded-lg transition-colors border"
                        >
                          Apply
                        </button>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-1">Hint: Type EOFY to simulate applying the EOFY 50% promo discount.</p>
                    </div>

                    {/* Security Seals */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-dashed flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#ffdb71]" />
                      <span className="text-[10px] text-gray-500 font-semibold leading-none">Safe payment backed by 256-bit secure SSL standards.</span>
                    </div>

                    {/* Mock payment actions */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => setIsOrderPlaced(true)}
                        className="w-full py-4 bg-[#f38669] hover:bg-[#e26e50] text-white font-bold rounded-xl shadow-md uppercase tracking-wider text-xs focus:outline-none flex items-center justify-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" /> Confirm & Activate Course
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {!isOrderPlaced && (
                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400">
                    By clicking confirm you activate immediate access to OCA student guidelines & support mentors. Guaranteed safety under our 7-day cooling program.
                  </p>
                </div>
              )}
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      <OcaFooter bookCallHref={BOOK_CALL_URL} showLinks={false} />

    </div>
  )
}
