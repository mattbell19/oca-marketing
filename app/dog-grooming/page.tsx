'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  Menu,
  PawPrint,
  PlayCircle,
  Scissors,
  Shield,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  X
} from 'lucide-react'
import OcaFooter from '../components/OcaFooter'

const BOOK_CALL_URL = 'https://bit.ly/ocachat'
const DOG_UPFRONT_CHECKOUT_URL = 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=4539'
const DOG_WEEKLY_CHECKOUT_URL = 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=4539&paymenttype=debitsuccess'
const DOG_AFTERPAY_CHECKOUT_URL = 'https://www.onlinecoursesaustralia.edu.au/checkout?courseid=4539&paymenttype=afterpay'
const DOG_CTA_URL = DOG_UPFRONT_CHECKOUT_URL
const DOG_HERO_IMAGE = 'https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/courseImages/webp/4539-category-page.webp'
const DOG_CATEGORY_IMAGE = 'https://d1yg2ddo8j5qoh.cloudfront.net/media/600332/dog-grooming-banner-image-mobile.webp'
const DOG_OFFER_IMAGE = 'https://www.onlinecoursesaustralia.edu.au/cf-img-resized/1920/media/602333/3-july-course-300off-wk2a.webp'

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

const getTimeLeft = (): TimeLeft => {
  const diff = getWeeklyOfferDeadline().getTime() - Date.now()

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

const bundleCourses = [
  'Dog Grooming Advanced Course',
  'NEW! Dog Grooming Instructor Video Series',
  'Pet Care',
  'Animal Health + Dr Kate Masterclass from Bondi Vet',
  'Business Management',
  'Business Administration',
  'How to Start a Business',
  'How to Write a Business Plan',
  'Entrepreneurship Skills',
  'Advanced Sales & Customer Service Skills'
]

const studentBenefits = [
  {
    title: 'Fully CPD endorsed',
    text: 'Completing CPD-endorsed learning gives you CPD points and evidence on your course completion acknowledgement and digital badge.'
  },
  {
    title: '100% online and on-demand',
    text: 'Enrol anytime and study on your own terms. Assessments are designed to improve comprehension, not catch you out.'
  },
  {
    title: 'Dedicated round-the-clock support',
    text: 'Access expert support from a tutor by email or phone, plus live chat support 7 days a week.'
  },
  {
    title: 'Real world, industry-led learning',
    text: 'Learn practical grooming, pet care and business skills designed with industry experts and employers.'
  },
  {
    title: 'Flexible payment options',
    text: 'Pay upfront, use Afterpay, or choose a flexible weekly payment plan.'
  }
]

const pathways = [
  'Dog Groomer at a salon or spa',
  'Pet Groomer at a veterinary clinic',
  'Pet Stylist at a pet store',
  'Mobile pet grooming business owner',
  'Pet Care Assistant at an animal shelter',
  'Pet Sitter or dog walker',
  'Pet care tech at a boarding facility',
  'Animal Assistant at a daycare',
  'Pet grooming business owner',
  'Pet product sales representative'
]

const courseTopics = [
  '8+ Hours of Dog Grooming & Clipping Instruction',
  'Meet Your Mentor Emily Myatt Master Groomer',
  'Your Dog Grooming Equipment',
  'Setting Up Your Grooming Station',
  'Creating a Grooming Plan',
  'Dog Handling Techniques',
  'Full Groom & Clip demonstrations',
  'Nail Clipping Techniques',
  'Dog Breeds and Anatomy',
  'Coat Types and Breeds',
  'Pet First Aid',
  'BONUS Dr Kate Bondi Vet Celebrity Series',
  'Business planning and administration',
  'Sales and customer service skills'
]

export default function DogGroomingLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('topics')
  const [activeWhyUs, setActiveWhyUs] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

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

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <div id="dog-grooming-page" className="min-h-screen overflow-x-clip bg-white text-[#1d3b56] selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
      <div className="relative z-50 flex flex-wrap items-center justify-center gap-2 bg-[#a6d5c7] px-4 py-3 text-center text-xs font-bold text-[#1d3b56] shadow-sm sm:text-sm">
        <Sparkles className="h-4 w-4 animate-bounce text-[#f38669]" />
        <span>Tax Back Sale</span>
        <span className="rounded bg-[#1d3b56] px-2 py-0.5 font-mono text-xs tracking-wider text-white">TAXBACK</span>
        <span className="rounded bg-[#1d3b56]/10 px-3 py-0.5 text-xs">
          Ends in: {timerValue.days}d : {timerValue.hours}h : {timerValue.minutes}m : {timerValue.seconds}s
        </span>
      </div>

      <header className="sticky top-0 z-[100] flex items-center justify-between border-b border-gray-100 bg-white/95 px-6 py-4 shadow-sm backdrop-blur md:px-12">
        <div className="flex items-center gap-6">
          <a href="#top" className="relative h-9 w-36 md:h-11 md:w-44" aria-label="Online Courses Australia">
            <Image
              src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png"
              alt="Online Courses Australia"
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </a>

          <nav className="hidden gap-6 text-sm font-bold text-[#1d3b56]/80 lg:flex">
            <a href="#about-bundle" className="transition-colors hover:text-[#f38669]">Course Info</a>
            <a href="#why-oca" className="transition-colors hover:text-[#f38669]">Why OCA</a>
            <a href="#course-topics" className="transition-colors hover:text-[#f38669]">Topics</a>
            <a href="#pricing" className="transition-colors hover:text-[#f38669]">Buy Now</a>
          </nav>
        </div>

        <div className="hidden items-center gap-6 text-right text-xs md:flex">
          <div className="flex flex-col gap-0.5 border-r border-gray-100 pr-5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Questions?</span>
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-end gap-1 font-black text-[#1d3b56] transition-colors hover:text-[#f38669]">
              <Calendar className="h-3 w-3 text-[#f38669]" /> Book A Call
            </a>
          </div>
          <a href={DOG_CTA_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#f38669] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-[#e26e50] active:scale-95">
            Buy Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="rounded-full p-2 text-[#1d3b56] transition-colors hover:bg-gray-100 md:hidden"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 bottom-0 top-[112px] z-[90] flex flex-col justify-between overflow-y-auto border-b border-gray-100 bg-white p-6 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-4 text-base font-bold text-[#1d3b56]">
              <a href="#about-bundle" onClick={closeMenu} className="border-b border-gray-50 py-2">Course Info</a>
              <a href="#why-oca" onClick={closeMenu} className="border-b border-gray-50 py-2">Why OCA</a>
              <a href="#course-topics" onClick={closeMenu} className="border-b border-gray-50 py-2">Course Topics</a>
              <a href="#pricing" onClick={closeMenu} className="border-b border-gray-50 py-2">Buy Now</a>
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="border-b border-gray-50 py-2">Book A Call</a>
            </nav>
            <a href={DOG_CTA_URL} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="mt-8 block w-full rounded-xl bg-[#f38669] py-4 text-center text-xs font-bold uppercase tracking-wide text-white shadow-md">
              Buy Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="relative overflow-hidden bg-[#d4efe8] px-6 py-10 md:px-12 md:py-20 lg:py-28">
          <div className="pointer-events-none absolute left-[58%] top-1/2 hidden h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 opacity-15 md:block">
            {[...Array(18)].map((_, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 h-[105px] w-[55%] origin-left -translate-y-1/2 bg-[#a6d5c7]"
                style={{ transform: `translate(-50%, -50%) rotate(${index * 20}deg)` }}
              />
            ))}
            <div className="absolute left-1/2 top-1/2 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4efe8]" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#f38669] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                <Award className="h-3.5 w-3.5" /> Course Bundle
              </span>

              <h1 className="mb-6 text-4xl font-black leading-[0.98] tracking-tighter text-[#1d3b56] sm:text-5xl md:text-7xl lg:text-8xl">
                <span className="relative mb-2 inline-block px-3 py-0">
                  <span className="absolute inset-0 -skew-x-3 rounded-md bg-[#f38669]" />
                  <span className="relative block font-bold text-white">Dog Grooming</span>
                </span>
                <br />
                <span className="font-serif font-normal italic leading-none text-[#1d3b56]/95">Advanced Course</span>
              </h1>

              <div className="mb-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur">
                  <Clock className="h-3.5 w-3.5 text-[#f38669]" />
                  <span className="text-xs font-bold text-[#1d3b56]">150 Study Hours</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-[#00b67a] text-[#00b67a]" />
                  ))}
                  <span className="text-xs font-bold text-[#1d3b56]">Trustpilot Excellent</span>
                </div>
              </div>

              <p className="mb-8 max-w-2xl text-sm font-medium leading-relaxed text-[#1d3b56]/90 sm:text-lg md:text-xl">
                Ready to transform your animal care and grooming passion into a thriving career or small business? Build essential grooming, pet care and business skills in one comprehensive online pathway.
              </p>

              <div className="mb-8 inline-flex flex-col gap-4 rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1d3b56]/50">Sale Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#1d3b56]">$1099</span>
                    <span className="text-sm font-bold text-red-400 line-through">$1545</span>
                  </div>
                </div>
                <div className="border-[#a6d5c7]/50 sm:border-l sm:pl-4">
                  <p className="text-xs font-bold leading-tight text-[#1d3b56]/80">Payment plans from only $25 per week</p>
                  <p className="text-[10px] text-gray-500">7-Day Money Back Guarantee included</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={DOG_CTA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-7 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-[#e26e50]">
                  Buy Now <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#about-bundle" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-[#1d3b56] shadow-sm transition-all hover:bg-[#fff0c0]">
                  View Course Info <PawPrint className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 lg:col-span-5">
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -left-6 -top-6 h-24 w-24 animate-pulse rounded-full bg-[#ffdb71] opacity-60 blur-xl mix-blend-multiply" />
                <div className="absolute -bottom-6 -right-6 h-32 w-32 animate-pulse rounded-full bg-[#fff0c0] opacity-70 blur-xl mix-blend-multiply" />
                <div className="group relative z-20 aspect-[4/5] overflow-hidden rounded-[3rem] border-[10px] border-white shadow-2xl">
                  <Image
                    src={DOG_HERO_IMAGE}
                    alt="Dog grooming advanced course"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffdb71] text-[#1d3b56]">
                        <Scissors className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-black leading-none tracking-tight text-[#1d3b56]">10 courses in 1 bundle</p>
                        <p className="text-[10px] text-gray-500">Grooming + pet care + business</p>
                      </div>
                    </div>
                    <div className="flex h-10 w-16 flex-col items-center justify-center rounded-lg bg-[#1d3b56] text-white">
                      <span className="text-[10px] font-black">CPD</span>
                      <span className="text-[7px] font-bold uppercase tracking-wider opacity-80">Endorsed</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 -top-4 z-30 flex h-28 w-28 rotate-6 flex-col items-center justify-center rounded-full border-4 border-white bg-[#f38669] text-center text-white shadow-xl">
                  <span className="text-[9px] font-bold uppercase tracking-widest">Save</span>
                  <span className="text-2xl font-black leading-tight">$446</span>
                  <span className="mt-1 rounded-full bg-white px-1.5 text-[8px] font-bold tracking-tight text-[#f38669]">NOW $1099</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 flex flex-col items-center justify-center gap-4 border-b border-amber-200 bg-amber-50 px-6 py-4 text-center sm:flex-row">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 animate-spin text-[#f38669]" />
            <span className="text-sm font-bold text-[#1d3b56]">Weekly special price ends Thursday</span>
          </div>
          <div className="rounded border border-amber-300 bg-white px-3 py-1 font-mono text-sm font-bold text-[#1d3b56] shadow-sm">
            {timerValue.days} Days : {timerValue.hours} Hrs : {timerValue.minutes} Min : {timerValue.seconds} Sec
          </div>
        </section>

        <section id="about-bundle" className="relative bg-white py-16 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-8 lg:col-span-7">
              <div>
                <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-[#f38669]">Dog Grooming + Business Bundle</span>
                <h2 className="mb-4 text-3xl font-black leading-none tracking-tight text-[#1d3b56] md:text-5xl lg:text-6xl">
                  10 Comprehensive Dog Grooming & Business Courses, 1 Affordable Price
                </h2>
                <p className="text-lg font-medium text-gray-600">
                  Make the smart move. Save $1000s on 10 industry-led courses designed to help you enter the animal care and mobile dog grooming industry.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {bundleCourses.map((course, index) => (
                  <div key={course} className="rounded-2xl border border-[#d4efe8] bg-[#f7f9fa] p-5">
                    <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3b56] text-xs font-black text-white">{index + 1}</span>
                    <h3 className="text-sm font-black leading-snug text-[#1d3b56]">{course}</h3>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border-2 border-dashed border-[#f38669]/60 bg-[#feaf9d]/25 p-6">
                <h3 className="mb-2 text-xl font-black text-[#1d3b56]">High demand animal care skills</h3>
                <p className="text-sm font-semibold leading-relaxed text-[#1d3b56]/75">
                  With 48% of Australian families having at least one dog and over 6+ million dogs living in homes across the country, accomplished groomers are in high demand in urban and regional areas.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 overflow-hidden rounded-[2.5rem] border border-[#d4efe8] bg-slate-50 p-4 shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                  <Image src={DOG_CATEGORY_IMAGE} alt="Dog grooming and pet care course" fill className="object-cover object-bottom" unoptimized />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-2xl font-black text-[#1d3b56]">Career-ready grooming knowledge</h3>
                  <p className="mb-5 text-sm font-semibold leading-relaxed text-gray-600">
                    Learn breed structure, topcoat, undercoat, coat texture, movement, grooming plans, handling techniques and the tools needed to work confidently with dogs.
                  </p>
                  <a href={DOG_CTA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f38669] px-5 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg">
                    Buy Now <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="why-oca" className="relative border-y border-gray-200/60 bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#f38669]">No dense textbooks</span>
              <h2 className="mb-6 text-3xl font-black leading-none tracking-tight text-[#1d3b56] md:text-5xl">Why students love learning with us</h2>
              <p className="text-sm font-semibold leading-relaxed text-gray-600 sm:text-base">
                We design digestible step-by-step modules and high-quality video sessions, backed by 24/7 tutorial support. Lessons are on demand, and assessments can be re-taken as many times as needed.
              </p>
            </div>

            <div id="course-topics" className="mb-14 scroll-mt-32 rounded-[2rem] border border-[#d4efe8] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 text-center md:text-left">
                <span className="text-xs font-black uppercase tracking-widest text-[#f38669]">Course Topics</span>
                <h3 className="text-2xl font-black leading-none tracking-tight text-[#1d3b56] md:text-4xl">What you&apos;ll cover inside the bundle</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {courseTopics.slice(0, 8).map((topic, index) => (
                  <div key={topic} className="rounded-2xl bg-[#d4efe8]/45 p-4">
                    <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3b56] text-xs font-black text-white">{index + 1}</span>
                    <p className="text-sm font-black leading-snug text-[#1d3b56]">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-6">
                {studentBenefits.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => setActiveWhyUs(index)}
                    className={`w-full rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all ${activeWhyUs === index ? 'ring-2 ring-[#f38669]/20' : 'opacity-85'}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="flex items-center gap-2.5 text-base font-extrabold text-[#1d3b56] sm:text-lg">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#1d3b56]" />
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1d3b56]/40">{activeWhyUs === index ? 'Open' : 'View'}</span>
                    </div>
                    {activeWhyUs === index && <p className="mt-2.5 text-xs font-semibold leading-relaxed text-gray-600">{item.text}</p>}
                  </button>
                ))}
              </div>

              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1d3b56] p-8 text-white shadow-2xl md:p-12">
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10 bg-white/5" />
                  <h3 className="mb-6 flex items-center gap-2 font-serif text-3xl font-black italic tracking-tight text-white">
                    <Award className="h-8 w-8 text-[#ffdb71]" /> Industry Aligned
                  </h3>
                  <p className="mb-8 text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                    Upon successful completion of this course you will receive a course completion acknowledgement and short form credential for: <strong>Dog Grooming Advanced Course</strong>.
                  </p>

                  <div className="space-y-3 rounded-3xl border border-white/10 bg-white/10 p-5">
                    {[
                      {
                        id: 'careers',
                        label: 'Career Pathways',
                        content: pathways.join(' • ')
                      },
                      {
                        id: 'delivery',
                        label: 'Course Delivery + Learner Support',
                        content: 'Delivered 100% online with instant access, short answer and multiple-choice assessments, fast marking, one-on-one mentor support and live chat 7 days a week.'
                      },
                      {
                        id: 'topics',
                        label: 'More Course Topics',
                        content: courseTopics.join(' • ')
                      },
                      {
                        id: 'rpl',
                        label: 'Accelerated Learning Pathway',
                        content: 'This Micro-Credential course bundle provides 15% credit (RPL) toward the Nationally Recognised ACM30122 Certificate III in Animal Care Services (Pet Grooming) with partner RTO 2875.'
                      }
                    ].map((acc) => (
                      <div key={acc.id} className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                        <button
                          type="button"
                          onClick={() => setActiveAccordion(activeAccordion === acc.id ? null : acc.id)}
                          className="flex w-full items-center justify-between px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/5"
                        >
                          <span>{acc.label}</span>
                          <ChevronDown className={`h-3.5 w-3.5 text-[#ffdb71] transition-transform ${activeAccordion === acc.id ? 'rotate-180' : ''}`} />
                        </button>
                        {activeAccordion === acc.id && (
                          <div className="border-t border-white/5 bg-[#1d3b56]/80 p-5 text-xs font-medium leading-relaxed text-white/70">
                            {acc.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 md:py-20 border-t border-gray-100">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center px-6">
            <div className="rounded-[2rem] bg-[#1d3b56] p-5 text-white shadow-xl sm:p-7">
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#d4efe8]">
                {isVideoPlaying ? (
                  <iframe
                    src="https://player.vimeo.com/video/691626692?autoplay=1"
                    title="Course preview video"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full min-h-[280px] flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <Image
                      src={DOG_CATEGORY_IMAGE}
                      alt="Preview of dog grooming course experience"
                      fill
                      className="object-cover opacity-80 transition-transform group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[#1d3b56]/45" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#f38669] shadow-2xl transition-transform group-hover:scale-110">
                      <PlayCircle className="h-11 w-11" />
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[#ffdb71]">Course preview</p>
            </div>

            <div>
              <span className="mb-3 inline-flex rounded-full bg-[#f38669]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f38669] sm:px-4 sm:py-2 sm:text-[11px]">
                Take a quick look
              </span>
              <h2 className="text-3xl font-black leading-[1.04] tracking-[-0.035em] text-[#1d3b56] sm:text-4xl md:text-5xl">
                Take a quick look at what you can expect in this course
              </h2>
              <p className="mt-5 text-base font-semibold leading-relaxed text-[#1d3b56]/70 md:text-lg">Satisfaction Guaranteed!</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Exclusive movie-quality video sessions', 'Interactive content', 'Tutorials', '24/7 student support'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#d4efe8]/45 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f38669]" />
                    <span className="text-sm font-black leading-snug text-[#1d3b56]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative bg-white py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-2 block text-xs font-black uppercase tracking-widest text-[#f38669]">Enrol Now</span>
              <h2 className="mb-4 text-4xl font-black leading-none tracking-tight text-[#1d3b56] md:text-6xl">Choose your payment option</h2>
              <p className="text-sm font-medium text-gray-500">All options include lifetime access, unlimited support and instant course enrolment.</p>
            </div>

            <div className="grid items-stretch gap-8 md:grid-cols-3">
              <div className="relative flex flex-col justify-between rounded-[2.5rem] border border-gray-100 bg-slate-50 p-8 shadow-sm">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-[#1d3b56] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Buy Now Pay Later</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">Afterpay</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>Interest Free</li>
                    <li>Lifetime Access</li>
                    <li>Unlimited Support</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Fortnightly Payment</span>
                    <p className="text-3xl font-black text-[#1d3b56]">$274.75</p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">Make 4 interest-free fortnightly payments.</p>
                  </div>
                </div>
                <a href={DOG_AFTERPAY_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-[#1d3b56] py-4 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#152a3d]">
                  Buy Now - Afterpay
                </a>
              </div>

              <div className="relative flex flex-col justify-between rounded-[2.5rem] border-2 border-[#f38669] bg-[#feaf9d]/30 p-8 shadow-lg md:-translate-y-2">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f38669] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                  Most Popular
                </div>
                <div className="pt-2">
                  <span className="mb-6 inline-block rounded-full bg-[#f38669] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Pay Upfront + Save</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">Best Deal</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/80">
                    <li>One Easy Payment</li>
                    <li>Lifetime Access</li>
                    <li>Unlimited Support</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-[#feaf9d]/60 bg-white p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold leading-none text-red-400 line-through">WAS $1545</span>
                    <p className="text-4xl font-black text-[#f38669]">$1099 <span className="text-xs font-medium text-slate-400">AUD</span></p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">Single payment. Best available rate.</p>
                  </div>
                </div>
                <a href={DOG_UPFRONT_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-[#f38669] py-4 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#e26e50]">
                  Buy Now - Upfront
                </a>
              </div>

              <div className="relative flex flex-col justify-between rounded-[2.5rem] border border-amber-200 bg-amber-100/50 p-8 shadow-sm">
                <div>
                  <span className="mb-6 inline-block rounded-full bg-amber-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Weekly Plan</span>
                  <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1d3b56]">$25 / week</h3>
                  <ul className="mb-6 space-y-2 text-xs font-bold text-[#1d3b56]/70">
                    <li>Flexible Payment Plan</li>
                    <li>Lifetime Access</li>
                    <li>Unlimited Support</li>
                  </ul>
                  <div className="mb-6 rounded-2xl border border-amber-200 bg-white p-4 text-center">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Payment Plan From</span>
                    <p className="text-3xl font-black text-gray-800">$25 <span className="text-xs text-gray-400">/wk</span></p>
                    <p className="mt-2 text-[9px] font-semibold text-gray-500">Flexible interest-free instalments.</p>
                  </div>
                </div>
                <a href={DOG_WEEKLY_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-amber-500 py-4 text-center text-xs font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-amber-600">
                  Buy Now - Weekly
                </a>
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-4xl rounded-[2.5rem] border border-gray-100 bg-slate-50 p-8 text-center">
              <Shield className="mx-auto mb-4 h-9 w-9 text-[#f38669]" />
              <h4 className="mb-3 text-lg font-black text-[#1d3b56]">We want you to love what you&apos;re learning!</h4>
              <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-gray-600">
                If your course isn&apos;t the right fit, we offer a 7-day cooling-off period so you can either switch to another course or get your money back. No pressure, no hassle.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#1d3b56] py-16 text-center text-white md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <span className="mb-3 block text-xs font-black uppercase tracking-widest text-[#ffdb71]">Ready when you are</span>
            <h2 className="mb-6 text-4xl font-black leading-none tracking-tight md:text-6xl">Start your dog grooming pathway today</h2>
            <p className="mx-auto mb-10 max-w-2xl text-base font-medium leading-relaxed text-white/75 md:text-xl">
              Lock in this week&apos;s offer and get instant access to practical, self-paced grooming, pet care and business learning.
            </p>
            <a href={DOG_CTA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-[#e26e50]">
              Buy Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <OcaFooter bookCallHref={BOOK_CALL_URL} showLinks={false} />
    </div>
  )
}
