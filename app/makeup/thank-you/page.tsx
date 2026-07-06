import Link from 'next/link'
import { CheckCircle2, Star } from 'lucide-react'

export default function MakeupThankYouPage() {
  return (
    <main className="min-h-screen bg-[#d4efe8] px-6 py-16 text-[#1d3b56]">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
          <CheckCircle2 className="h-10 w-10 text-[#f38669]" />
        </div>
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#f38669]">Info pack requested</p>
        <h1 className="mb-6 text-4xl font-black leading-none tracking-tight md:text-7xl">
          Thanks, your makeup course guide is on its way.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base font-semibold leading-relaxed text-[#1d3b56]/75 md:text-xl">
          We have received your request and sent your details through to the OCA team. Keep an eye on your inbox for the course information pack and next steps.
        </p>
        <div className="mb-10 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="flex h-8 w-8 items-center justify-center rounded bg-[#00b67a] text-white">
              <Star className="h-4 w-4 fill-current" />
            </span>
          ))}
        </div>
        <Link href="/makeup" className="rounded-full bg-[#f38669] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-[#e26e50] active:scale-95">
          Back to Makeup Course
        </Link>
      </div>
    </main>
  )
}
