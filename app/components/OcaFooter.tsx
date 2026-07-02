'use client'

import Image from 'next/image'

const quickLinkColumns = [
  ['All Short Courses', 'Career Change', 'Career Quiz', 'Digital Badging', 'Job Portal', 'Privacy Policy', 'Sitemap', 'For Businesses & Teams'],
  ['Blog', 'Career Counselling', 'Contact Us', 'Gain Interpersonal Skills', 'On Demand', 'Refund Policy', 'Short Courses'],
  ['Careers', 'Career Discovery - Wandr', 'CPD Endorsement', 'Giving Back', 'Podcasts', 'Student Support', 'Terms and Conditions']
]

const paymentPartners = ['Visa', 'Mastercard', 'Amex', 'Afterpay', 'Zip', 'Secure SSL']

type OcaFooterProps = {
  bookCallHref?: string
}

export default function OcaFooter({ bookCallHref = '#enrol' }: OcaFooterProps) {
  return (
    <footer className="bg-[#f7f9fa] px-6 py-12 md:py-16 text-[#1d3b56] border-t border-[#d4efe8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr_300px]">
          <div className="flex flex-col items-center gap-5 lg:items-start">
            <a href={bookCallHref} className="inline-flex min-w-44 justify-center bg-[#ffdb71] px-6 py-4 text-sm font-black uppercase tracking-widest shadow-sm hover:bg-[#f4cc57] transition-colors">
              Book A Call
            </a>
            <a href="https://www.onlinecoursesaustralia.edu.au/login/" target="_blank" rel="noopener noreferrer" className="inline-flex min-w-44 justify-center bg-slate-200 px-6 py-4 text-sm font-black uppercase tracking-widest text-[#1d3b56]/90 hover:bg-slate-300 transition-colors">
              Student Login
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-black tracking-tight">Quick Links</h3>
            <div className="grid gap-2 text-center sm:grid-cols-3 sm:text-left">
              {quickLinkColumns.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-2 text-sm font-bold text-[#1d3b56]/75">
                  {column.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-[#f38669] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-center text-2xl font-black tracking-tight lg:text-left">Awards</h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex min-h-24 items-center justify-center rounded bg-white p-4 text-center text-xs font-black uppercase leading-tight shadow-sm">
                Docebo<br />Inspire<br />Winner
              </div>
              <div className="flex min-h-24 items-center justify-center rounded bg-white p-3 shadow-sm">
                <Image src="/oca-assets/endorsement-screenshot.png" alt="Makeup Artist Guild Asia Pacific award" width={110} height={84} className="h-auto w-full object-contain" unoptimized />
              </div>
              <div className="col-span-2 flex min-h-24 items-center justify-center rounded-full bg-white p-4 text-center text-xs font-black uppercase leading-tight shadow-sm">
                Financial Review<br />Customer Champions
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 h-px bg-[#1d3b56]/30" />

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="mb-3 text-2xl font-black tracking-tight">Endorsements, memberships and partnerships</h3>
            <p className="text-sm font-bold text-[#1d3b56]/70">
              © Copyright 2026 Online Courses Australia. ACN 31 155 885 242. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-end">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-lg font-black text-[#1d3b56] shadow-sm">CPD</div>
            <div className="flex h-20 w-24 items-center justify-center rounded-full bg-white p-3 text-center text-[10px] font-black uppercase leading-tight shadow-sm">Provider of Training Excellence</div>
            <a href="https://www.trustpilot.com/review/onlinecoursesaustralia.edu.au" target="_blank" rel="noopener noreferrer" className="flex h-20 w-20 items-center justify-center rounded-full bg-[#06064f] p-3 text-center text-[10px] font-black text-white shadow-sm">Rated Excellent</a>
            <div className="text-4xl font-black tracking-widest text-[#5f8fc9]">ICOES</div>
            <div className="text-4xl font-black text-[#f38635]">Credly</div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-end">
          {paymentPartners.map((partner) => (
            <div key={partner} className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-[10px] font-black uppercase tracking-widest text-[#1d3b56]/50 shadow-sm flex items-center justify-center">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
