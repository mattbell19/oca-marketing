'use client'

import Image from 'next/image'

const quickLinkColumns = [
  ['All Short Courses', 'Career Change', 'Career Quiz', 'Digital Badging', 'Job Portal', 'Privacy Policy', 'Sitemap', 'For Businesses & Teams'],
  ['Blog', 'Career Counselling', 'Contact Us', 'Gain Interpersonal Skills', 'On Demand', 'Refund Policy', 'Short Courses'],
  ['Careers', 'Career Discovery - Wandr', 'CPD Endorsement', 'Giving Back', 'Podcasts', 'Student Support', 'Terms and Conditions']
]

const paymentPartners = [
  { name: 'Afterpay', className: 'bg-[#b2fce4] text-[#0f2f2a]' },
  { name: 'Apple Pay', className: 'bg-black text-white normal-case tracking-tight' },
  { name: 'VISA', className: 'bg-[#1434cb] text-white tracking-widest' },
  { name: 'Mastercard', className: 'bg-[#111827] text-white' },
  { name: 'PayPal', className: 'bg-white text-[#003087] border border-[#c9d8f2] normal-case' },
  { name: 'Norton', className: 'bg-[#ffd800] text-black' },
  { name: 'PayRight', className: 'bg-[#1d3b56] text-white normal-case' },
  { name: 'Centrepay', className: 'bg-white text-[#1d3b56] border border-slate-200 normal-case' }
]

const awardLogos = [
  {
    src: '/oca-assets/footer/cpd-excellence.png',
    alt: 'CPD Provider of Training Excellence',
    width: 76,
    height: 108,
    className: 'h-20 w-auto'
  },
  {
    src: '/oca-assets/endorsement-screenshot.png',
    alt: 'The Makeup Artist Guild Asia Pacific',
    width: 95,
    height: 92,
    className: 'h-20 w-auto'
  }
]

const endorsementLogos = [
  {
    src: '/oca-assets/footer/cpd-medium.png',
    alt: 'CPD Certified',
    width: 78,
    height: 110,
    className: 'h-16 w-auto md:h-20'
  },
  {
    src: '/oca-assets/footer/cpd-excellence.png',
    alt: 'Provider of Training Excellence',
    width: 78,
    height: 110,
    className: 'h-16 w-auto md:h-20'
  },
  {
    src: '/oca-assets/footer/trustpilot-excellent.svg',
    alt: 'Trustpilot Rated Excellent',
    width: 104,
    height: 104,
    className: 'h-14 w-auto md:h-16'
  },
  {
    src: '/oca-assets/footer/icoes-logo.jpg',
    alt: 'International Council for Online Educational Standards',
    width: 230,
    height: 80,
    className: 'h-12 w-auto md:h-16'
  },
  {
    src: '/oca-assets/footer/credly-footer.webp',
    alt: 'Credly by Pearson',
    width: 230,
    height: 72,
    className: 'h-12 w-auto md:h-16'
  }
]

type OcaFooterProps = {
  bookCallHref?: string
  showLinks?: boolean
}

export default function OcaFooter({ bookCallHref = '#enrol', showLinks = true }: OcaFooterProps) {
  return (
    <footer className="bg-[#f7f9fa] px-5 py-8 text-[#1d3b56] border-t border-[#d4efe8] md:px-6 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-8 lg:gap-10 ${showLinks ? 'lg:grid-cols-[220px_1fr_260px]' : 'lg:grid-cols-[220px_1fr]'}`}>
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <a href={bookCallHref} className="inline-flex min-w-44 justify-center bg-[#ffdb71] px-6 py-3.5 text-sm font-black uppercase tracking-widest shadow-sm hover:bg-[#f4cc57] transition-colors">
              Book A Call
            </a>
            <a href="https://www.onlinecoursesaustralia.edu.au/login/" target="_blank" rel="noopener noreferrer" className="inline-flex min-w-44 justify-center bg-slate-200 px-6 py-3.5 text-sm font-black uppercase tracking-widest text-[#1d3b56]/90 hover:bg-slate-300 transition-colors">
              Student Login
            </a>
          </div>

          {showLinks && (
            <div>
              <h3 className="mb-3 text-center text-2xl font-black tracking-tight sm:text-left">Quick Links</h3>
              <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-left sm:grid-cols-3">
                {quickLinkColumns.map((column, columnIndex) => (
                  <ul key={columnIndex} className="space-y-1.5 text-[13px] font-bold text-[#1d3b56]/75 md:text-[15px]">
                    {column.map((link) => (
                      <li key={link}>
                        <a href="#" className="hover:text-[#f38669] transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-4 text-center text-2xl font-black tracking-tight lg:text-left">Awards</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {awardLogos.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} object-contain`}
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-[#1d3b56]/30 md:my-10" />

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,420px)_1fr] lg:items-center lg:gap-8">
          <div className="text-center lg:text-left">
            <h3 className="mb-2 text-2xl font-black tracking-tight">Endorsements, memberships and partnerships</h3>
            <p className="text-sm font-bold text-[#1d3b56]/70">
              © Copyright 2026 Online Courses Australia. ACN 31 155 885 242. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:justify-end">
            {endorsementLogos.map((logo) => {
              const image = (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} object-contain`}
                  unoptimized
                />
              )

              return logo.src.includes('trustpilot') ? (
                <a key={logo.src} href="https://www.trustpilot.com/review/onlinecoursesaustralia.edu.au" target="_blank" rel="noopener noreferrer" className="inline-flex">
                  {image}
                </a>
              ) : image
            })}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-center text-[10px] font-black uppercase tracking-[0.22em] text-[#1d3b56]/45 lg:text-right">
            Payment Methods + Secure Transactions
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
            {paymentPartners.map((partner) => (
              <div key={partner.name} className={`flex h-12 min-w-24 items-center justify-center rounded-xl px-4 text-[11px] font-black uppercase shadow-sm ${partner.className}`}>
                {partner.name === 'Mastercard' ? (
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-6 w-10 items-center">
                      <span className="absolute left-0 h-6 w-6 rounded-full bg-[#eb001b]" />
                      <span className="absolute right-0 h-6 w-6 rounded-full bg-[#f79e1b] mix-blend-screen" />
                    </span>
                    <span className="sr-only">Mastercard</span>
                  </span>
                ) : partner.name === 'PayPal' ? (
                  <span aria-label="PayPal" className="text-base font-black tracking-tight"><span className="text-[#003087]">Pay</span><span className="text-[#009cde]">Pal</span></span>
                ) : partner.name === 'Norton' ? (
                  <span className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-black">
                      <svg viewBox="0 0 12 10" aria-hidden="true" className="h-2.5 w-3">
                        <path d="M1 5.1 4.2 8 11 1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Norton
                  </span>
                ) : partner.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
