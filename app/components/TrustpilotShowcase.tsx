'use client'

import React from 'react'
import { Star, CheckCircle, ExternalLink, ShieldCheck, Award, MessageCircle } from 'lucide-react'

export interface TrustpilotReview {
  name: string
  header: string
  text: string
  stars?: number
  date: string
  course?: string
}

interface TrustpilotShowcaseProps {
  courseName?: string
  reviews?: TrustpilotReview[]
}

const DEFAULT_REVIEWS: TrustpilotReview[] = [
  {
    name: "Anne C.",
    header: "Easy to use and understand",
    text: "The modules are structured brilliantly. Whenever I had a question, my tutor got back to me right away with clear advice.",
    stars: 5,
    date: "2 days ago"
  },
  {
    name: "Hana Nord",
    header: "Easy to navigate with heaps of support",
    text: "Online Courses Australia provides so much practical guidance and mentor support. You never feel alone while studying.",
    stars: 5,
    date: "3 days ago"
  },
  {
    name: "Andrew M.",
    header: "Fantastic practical skills!",
    text: "Completed my certification with OCA and couldn't be happier. The content is real-world applicable and highly professional.",
    stars: 5,
    date: "1 week ago"
  },
  {
    name: "Chloe S.",
    header: "Flexible around full-time work",
    text: "Studying self-paced meant I could progress at night and on weekends. The video lessons and resources are top-notch.",
    stars: 5,
    date: "1 week ago"
  },
  {
    name: "Marcus L.",
    header: "Gave me the confidence to step into the industry",
    text: "The tutors give real, actionable feedback. The digital badge on my LinkedIn immediately helped me stand out to employers.",
    stars: 5,
    date: "2 weeks ago"
  },
  {
    name: "Jessica T.",
    header: "The support team is wonderful",
    text: "Fast responses, friendly mentors, and clear course materials. Best online education experience I've had so far.",
    stars: 5,
    date: "2 weeks ago"
  }
]

export function TrustpilotStars({ score = 5, size = "w-5 h-5" }: { score?: number, size?: string }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`${size} bg-[#00b67a] flex items-center justify-center rounded-[2px] shadow-sm`}
        >
          <svg className="w-3/4 h-3/4 fill-white" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default function TrustpilotShowcase({
  courseName,
  reviews = DEFAULT_REVIEWS
}: TrustpilotShowcaseProps) {
  const TRUSTPILOT_URL = "https://au.trustpilot.com/review/onlinecoursesaustralia.edu.au"

  return (
    <section className="py-14 sm:py-20 bg-[#14283b] text-white px-4 sm:px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00b67a]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00b67a]/15 border border-[#00b67a]/30 text-[#00b67a] text-xs font-bold tracking-wider uppercase mb-4">
            <ShieldCheck className="w-4 h-4" />
            Verified Student Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Your future <span className="font-serif italic text-[#ffdb71] lowercase font-normal">starts now</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/75 font-medium">
            Join over 25,000+ students across Australia learning with Online Courses Australia.
          </p>
        </div>

        {/* Central Trustpilot Master Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20 text-[#1d3b56] mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100">
            {/* Left: Trustpilot Badge Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-[#f4fbf7] border border-[#00b67a]/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1.5L14.78 8.04L21.88 8.6L16.45 13.24L18.09 20.19L12 16.48L5.91 20.19L7.55 13.24L2.12 8.6L9.22 8.04L12 1.5Z" fill="#00b67a"/>
                  <path d="M14.78 8.04L12 1.5V16.48L18.09 20.19L16.45 13.24L21.88 8.6L14.78 8.04Z" fill="#005128" opacity="0.25"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <span className="text-xl sm:text-2xl font-black text-[#1d3b56] tracking-tight">Trustpilot</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00b67a] text-white uppercase tracking-wider">
                    Excellent
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-1.5">
                  <TrustpilotStars score={5} size="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-lg font-black text-[#1d3b56]">4.7</span>
                  <span className="text-xs text-gray-400 font-semibold">out of 5</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Based on <strong className="text-gray-800 font-bold">700+ verified student reviews</strong> on Trustpilot
                </p>
              </div>
            </div>

            {/* Right: CTA Link */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={TRUSTPILOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00b67a] hover:bg-[#009e6a] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-md shadow-[#00b67a]/20 transition duration-150 group"
              >
                <span>Read All Reviews on Trustpilot</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
            {reviews.slice(0, 6).map((review, idx) => (
              <div 
                key={idx}
                className="bg-[#f8fafb] rounded-2xl p-5 border border-gray-100 flex flex-col justify-between hover:border-[#00b67a]/40 hover:shadow-sm transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <TrustpilotStars score={review.stars || 5} size="w-4 h-4" />
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#00b67a] bg-[#00b67a]/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1 mb-1.5">
                    "{review.header}"
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {review.text}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-gray-800">{review.name}</span>
                  <span className="text-gray-400 font-medium">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Pillar Guarantee Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#ffdb71] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ffdb71]">7-Day Money Back</p>
              <p className="text-[11px] text-white/70">100% Risk-Free Guarantee</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-3">
            <Award className="w-6 h-6 text-[#ffdb71] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ffdb71]">CPD-Endorsed</p>
              <p className="text-[11px] text-white/70">Recognized Certificates & Badges</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-3">
            <MessageCircle className="w-6 h-6 text-[#ffdb71] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ffdb71]">Direct Mentorship</p>
              <p className="text-[11px] text-white/70">1-on-1 Guidance & Live Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
