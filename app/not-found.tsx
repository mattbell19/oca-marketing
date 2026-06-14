'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-6 py-24 text-[#1d3b56]">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f38669]">
          Page not found
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          This page does not exist.
        </h1>
        <p className="mt-4 text-base text-[#1d3b56]/70">
          Head back to the course pages to keep exploring.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#f38669] px-5 py-3 font-bold text-white transition-colors hover:bg-[#eb7454]"
          >
            Home
          </Link>
          <Link
            href="/criminology"
            className="rounded-full border border-[#1d3b56]/15 px-5 py-3 font-bold text-[#1d3b56] transition-colors hover:bg-[#1d3b56]/5"
          >
            Criminology
          </Link>
        </div>
      </div>
    </main>
  )
}
