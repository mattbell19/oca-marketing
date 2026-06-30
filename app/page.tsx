'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Award,
  Clock,
  MapPin,
  CreditCard,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  Users,
  Globe,
  Monitor
} from 'lucide-react'
import Image from 'next/image'

const KRYOLAN_VIDEO_URL = "https://vimeo.com/1178414788/880a3aa642?fl=ls&fe=ec"
const KRYOLAN_VIDEO_EMBED_URL = "https://player.vimeo.com/video/1178414788?h=880a3aa642&title=0&byline=0&portrait=0"

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

type LeadFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  enquiryReason: string
  company: string
}

const initialLeadFormState: LeadFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  enquiryReason: '',
  company: ''
}

// --- Components ---

const SectionHeading = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-3xl md:text-5xl lg:text-7xl font-bold text-[#1d3b56] leading-[1.05] tracking-tight ${className}`}>
    {children}
  </h2>
)

const TrustpilotSlider = () => {
  const reviews = [
    { name: "Anne", header: "Easy to use and understand", text: "Easy to use and understand", stars: 5, date: "4 hours ago" },
    { name: "Hana Nord", header: "Easy to navigate through and heaps of…", text: "Easy to navigate through and heaps of support", stars: 5, date: "21 hours ago" },
    { name: "Andrew", header: "Fantastic course for practical financial skills!", text: "I just completed the \"Prepare and Monitor Budgets\" certificate with OCA and couldn’t...", stars: 5, date: "2 days ago" },
    { name: "Aiyman Wajdan", header: "They helped a lot in my course really…", text: "They helped a lot in my course really good team and good option if you want to do cou...", stars: 5, date: "6 days ago" },
    { name: "sandybegmail.com", header: "The course coordinators were really…", text: "The course coordinators were really helpful when I needed to change direction in my c...", stars: 5, date: "6 days ago" },
    { name: "Hing Mui Chin", header: "Looking for the right course.....", text: "The course offers a highly comprehensive syllabus covering mental health, psychology...", stars: 4, date: "6 days ago" },
    { name: "Linda", header: "easy to follow and user friendly", text: "easy to follow and user friendly", stars: 5, date: "6 May" },
    { name: "Cassie", header: "The support is wonderful", text: "The support is wonderful and responses are quick , the content to learn is very imfor...", stars: 5, date: "6 May" },
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-4 animate-[scroll_60s_linear_infinite] hover:[animation-play-state:paused]">
        {[...reviews, ...reviews, ...reviews].map((review, i) => (
          <div key={i} className="flex-shrink-0 w-72 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-5 h-5 flex items-center justify-center text-white rounded-sm ${idx < review.stars ? 'bg-[#00b67a]' : 'bg-gray-200'}`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                ))}
              </div>
              <h4 className="text-[13px] font-black text-gray-800 line-clamp-1 mb-1 tracking-tight leading-none h-4">{review.header}</h4>
              <p className="text-[11px] text-gray-500 line-clamp-2 h-8 leading-normal mt-2">{review.text}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-50 mt-4 pt-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                  {review.name[0]}
                </div>
                <span className="text-[10px] font-black text-gray-500">{review.name}</span>
              </div>
              <span className="text-[9px] text-gray-300 font-bold">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  )
}

const InfoPackForm = ({ title = "Get a Free Course Info Pack" }) => {
  const [formData, setFormData] = React.useState<LeadFormState>(initialLeadFormState)
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  const updateField = (field: keyof LeadFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/makeup-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formTitle: title,
          course: 'Makeup Artistry Course Bundle + Professional Kit',
          sourcePage: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : ''
        })
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed')
      }

      setStatus('success')
      setMessage('Thanks! Your info pack request has been received.')
      setFormData(initialLeadFormState)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-[#fff0c0] p-6 md:p-12 lg:p-14 rounded-2xl shadow-sm border border-[#ffdb71] w-full max-w-[540px] mx-auto lg:mx-0">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-3xl font-bold text-[#1d3b56] mb-2 tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 font-medium leading-snug">Take the first step towards your new career. Receive your free course guide instantly.</p>
      </div>
      <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
        <input name="company" type="text" value={formData.company} onChange={updateField('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input name="firstName" type="text" placeholder="First Name *" value={formData.firstName} onChange={updateField('firstName')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <input name="lastName" type="text" placeholder="Last Name *" value={formData.lastName} onChange={updateField('lastName')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={updateField('email')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <input name="phone" type="tel" placeholder="Best Contact Number? *" value={formData.phone} onChange={updateField('phone')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none text-sm md:text-base bg-white" required />
        <div className="relative">
          <select name="enquiryReason" value={formData.enquiryReason} onChange={updateField('enquiryReason')} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#a6d5c7] outline-none appearance-none bg-white font-medium text-gray-700 text-sm md:text-base" required>
            <option value="" disabled>Reason for Enquiry *</option>
            <option value="Career Pathway">Career Pathway</option>
            <option value="Upskilling">Upskilling</option>
            <option value="Retraining">Retraining</option>
            <option value="Personal Growth">Personal Growth</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 pointer-events-none" />
        </div>
        <button disabled={status === 'submitting'} className="w-full py-4 md:py-5 bg-[#f38669] hover:bg-[#eb7454] disabled:bg-[#f38669]/60 disabled:cursor-not-allowed text-white font-bold text-lg md:text-xl rounded-md transition-all shadow-md active:scale-95 uppercase tracking-wide">
          {status === 'submitting' ? 'Sending...' : 'Send My Info Pack'}
        </button>
        {message && (
          <p className={`text-center text-sm font-bold ${status === 'success' ? 'text-[#1d3b56]' : 'text-red-600'}`} role="status">
            {message}
          </p>
        )}
        <p className="text-[10px] md:text-[11px] text-gray-400 text-center mt-4 md:mt-6 leading-relaxed max-w-[320px] mx-auto">
          By submitting this form, you agree to receive information about our courses. You can unsubscribe at any time. View our <a href="#" className="underline">terms</a> and <a href="#" className="underline">privacy policy</a>.
        </p>
      </form>
    </div>
  )
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#1d3b56] font-sans selection:bg-[#a6d5c7] selection:text-[#1d3b56]">
      
      {/* 1. Header/Navigation */}
      <header className="bg-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-[100] border-b border-gray-100 shadow-sm">
        <div className="flex items-center">
            <div className="relative w-40 h-10 md:w-48 md:h-12">
               <Image 
                  src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png" 
                  alt="OCA Logo" 
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
               />
            </div>
        </div>
        
        <div className="hidden lg:flex gap-6 items-center">
          <div className="flex items-center gap-2">
             <span className="font-bold text-[#1d3b56] text-sm uppercase tracking-widest opacity-60">Excellent Reviews</span>
             <a 
               href="https://www.trustpilot.com/review/onlinecoursesaustralia.edu.au" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex gap-1 hover:opacity-80 transition-opacity"
             >
                {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center text-white rounded-sm" title="Trustpilot Excellent"><Star className="w-3 h-3 fill-current" /></div>)}
              </a>
          </div>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#1d3b56] p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
           {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Interactive Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-white z-[90] flex flex-col justify-between p-6 border-b border-gray-100 shadow-xl overflow-y-auto"
        >
          <div className="space-y-8 py-4">
            <nav className="flex flex-col gap-5 text-lg font-bold text-[#1d3b56]">
              <a 
                href="#courses" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50"
              >
                Our Courses
              </a>
              <a 
                href="#pathways" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50"
              >
                You Will Learn
              </a>
              <a 
                href="#mentor" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50"
              >
                Award-Winning Mentorship
              </a>
              <a 
                href="#enrol" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f38669] transition-colors py-2 border-b border-gray-50 text-[15px]"
              >
                Enrol Now
              </a>
            </nav>
            
            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1d3b56]/40 mb-4">Contact Admissions</p>
              <div className="space-y-3">
                <a href="tel:1300000000" className="flex items-center gap-3 text-sm font-bold text-[#1d3b56]">
                  <Phone className="w-4 h-4 text-[#f38669]" />
                  <span>1300 000 000</span>
                </a>
                <a href="mailto:info@onlinecoursesaustralia.edu.au" className="flex items-center gap-3 text-sm font-bold text-[#1d3b56]">
                  <Mail className="w-4 h-4 text-[#f38669]" />
                  <span>info@onlinecoursesaustralia.edu.au</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-6 border-t border-gray-100 pb-8">
            <div className="bg-[#d4efe8]/30 max-w-sm mx-auto p-4 rounded-xl flex items-center justify-between border border-[#a6d5c7]/20">
              <span className="text-xs font-bold text-[#1d3b56]">Excellent Reviews</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#00b67a] text-[#00b67a]" />)}
              </div>
            </div>
            <a 
              href="#enrol"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-4 bg-[#f38669] text-center text-white font-bold rounded-xl shadow-md uppercase tracking-wide text-xs sm:text-sm"
            >
              Get Free Info Pack
            </a>
          </div>
        </motion.div>
      )}

      {/* 2. Hero Section */}
      <section className="relative px-5 sm:px-6 md:px-12 py-6 md:py-24 lg:py-40 bg-[#d4efe8] overflow-hidden">
        {/* Sunburst background effect moved to brand colors */}
        <div className="hidden md:block absolute top-1/2 left-1/2 lg:left-[75%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-10 pointer-events-none">
           <div className="w-full h-full relative">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 w-[50%] h-[150px] bg-[#a6d5c7] origin-left -translate-y-1/2" 
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 15}deg)` }}
                />
              ))}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#d4efe8] rounded-full"></div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 md:gap-16 lg:gap-8 items-start relative z-10">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="text-[#1d3b56] font-bold text-sm md:text-lg mb-4 md:mb-6 uppercase tracking-[0.15em]">Your new future <span className="font-serif italic capitalize tracking-normal text-[#f38669]">starts now!</span></p>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#1d3b56] mb-6 md:mb-8 leading-[1.02] tracking-tight">
              Ignite Your Passion with a <span className="text-[#f38669] font-serif italic">Celebrity MUA</span>
            </h2>
            <div className="space-y-4 md:space-y-6 max-w-xl text-[#1d3b56]/80 font-medium text-base md:text-xl mb-8 md:mb-10 leading-relaxed">
              <p>We believe in the power of learning: it builds confidence and self-belief, opens the door to new opportunities, and gives us the courage to challenge ourselves.</p>
              <p>Learn from <strong>Mel Burnicle</strong> through the included Celebrity Masterclass content series, with daily mentor access from beauty educator <strong>Jess Buff</strong>.</p>
              <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-white/70 mb-8 grid grid-cols-[92px_1fr] sm:grid-cols-[120px_1fr] gap-4 items-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
                  <Image src="/oca-assets/makeup-beauty-bundle.png" alt="Free Kryolan professional makeup kit" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-[#1d3b56] text-lg mb-2">Pack your FREE Kit from Kryolan</h4>
                  <p className="text-sm text-gray-700 font-medium">Enrol in the bundle and receive a professional Kryolan kit at no extra cost, giving you the tools to practise real looks as you learn.</p>
                  <a href="#kit-video" className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#f38669] hover:underline">
                    <Youtube className="w-4 h-4" /> Watch kit showcase
                  </a>
                </div>
              </div>
              <p className="text-sm text-[#1d3b56]/70 italic">Melanie is a global award-winning beauty entrepreneur with over 25 years of experience, directing designs for global advertising, fashion editorials, and celebrity red carpets.</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 md:mb-10">
               <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white flex items-center gap-2">
                 <Globe className="w-4 h-4 text-[#f38669]" />
                 <span className="text-xs font-bold text-[#1d3b56]">Lifetime Global Access</span>
               </div>
               <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white flex items-center gap-2">
                 <Clock className="w-4 h-4 text-[#f38669]" />
                 <span className="text-xs font-bold text-[#1d3b56]">Self-Paced Learning</span>
               </div>
            </div>

            {/* Form for mobile: High placement */}
            <div className="lg:hidden mb-12">
               <InfoPackForm title="Start Your Journey" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-8 md:mt-16 items-start">
              {/* Current Sale Card */}
              <div className="bg-[#feaf9d] p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] flex items-center gap-4 md:gap-6 relative overflow-hidden shadow-sm w-full sm:w-auto sm:min-w-[340px]">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#ffdb71] flex flex-col items-center justify-center text-center shadow-md z-10 shrink-0 border-2 border-white/20">
                  <span className="text-[10px] md:text-[11px] font-bold text-[#1d3b56] leading-none uppercase mb-1">Get</span>
                  <span className="text-2xl md:text-3xl font-bold text-[#1d3b56] leading-[0.9]">50%<br/><span className="text-lg md:text-xl">OFF</span></span>
                  <span className="text-[8px] md:text-[9px] font-bold text-[#1d3b56] leading-none uppercase tracking-tighter mt-1">Full Price</span>
                </div>
                <div className="flex flex-col z-10">
                  <h4 className="font-bold text-[#1d3b56] text-sm md:text-lg uppercase tracking-tight leading-tight">New Sale Offer</h4>
                  <p className="text-xs md:text-sm text-[#1d3b56] font-medium">Use code: <span className="font-bold underline">EOFY</span></p>
                  <span className="mt-3 md:mt-4 px-3 md:px-4 py-1.5 md:py-2 bg-[#f38669] text-white text-[10px] md:text-xs font-bold rounded-lg md:rounded-xl text-center shadow-sm">Limited Time Offer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative mt-4 md:mt-20 lg:mt-0 order-1 lg:order-2">
            <div className="relative w-full max-w-xl mx-auto">
              <div className="aspect-square rounded-full overflow-hidden relative border-[8px] md:border-[10px] border-white shadow-2xl z-20">
                <Image 
                  src="https://image.comms.onlinecoursesaustralia.edu.au/lib/fe2a117473640474771679/m/1/6c11968d-2a68-4ac8-bc3f-be1d7ec99f5a.png" 
                  alt="Makeup Artistry Professional" 
                  fill 
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              
              {/* Trustpilot Badge Over Image */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/95 backdrop-blur-md px-4 md:px-6 py-2 md:py-4 rounded-full shadow-lg z-30 hidden md:flex items-center gap-3">
                 <span className="text-xs md:text-sm font-bold text-[#1d3b56]">Excellent</span>
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-4 md:w-6 h-4 md:h-6 bg-[#00b67a] flex items-center justify-center text-white rounded-sm"><Star className="w-1.5 md:w-3 h-1.5 md:h-3 fill-current" /></div>)}
                 </div>
                 <span className="text-xs md:text-sm font-bold text-[#1d3b56]">Trustpilot</span>
              </div>

              {/* Form for desktop: Overlapping placement */}
              <div className="hidden lg:block absolute lg:top-[60%] lg:left-1/2 lg:-translate-x-1/2 w-full lg:mt-0 z-50">
                <InfoPackForm />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trustpilot Social Proof Banner */}
      <section className="py-12 md:py-24 bg-gray-50 border-b border-gray-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
           <h3 className="text-4xl md:text-6xl font-bold text-[#1d3b56] mb-4 tracking-tight">Trusted by over 2,500+ students</h3>
           <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-[10px] md:text-xs font-bold text-[#1d3b56]/40 uppercase tracking-[0.2em]">Excellent</span>
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 md:w-6 md:h-6 bg-[#00b67a] flex items-center justify-center text-white rounded-sm"><Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" /></div>)}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-[#1d3b56]/40 uppercase tracking-[0.2em]">Trustpilot</span>
           </div>
           <p className="text-[#1d3b56]/70 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Online Courses Australia provides structured pathways designed for Australian learners, guiding you to take meaningful steps towards your new goals.
           </p>
        </div>
        <div className="relative">
           <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 hidden md:block"></div>
           <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 hidden md:block"></div>
           <TrustpilotSlider />
        </div>
      </section>

      {/* 3. Benefits Bar */}
      <div className="bg-white py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {[
            { label: "Self-paced", icon: Clock, color: "border-[#fff0c0] text-[#1d3b56] bg-[#fff0c0]/30" },
            { label: "100% online", icon: Globe, color: "border-[#d4efe8] text-[#1d3b56] bg-[#d4efe8]/30" },
            { label: "Genuine Support", icon: Users, color: "border-[#fecabe] text-[#1d3b56] bg-[#fecabe]/30" },
            { label: "Expert Mentors", icon: Award, color: "border-[#c0e6de] text-[#1d3b56] bg-[#c0e6de]/30" },
            { label: "Learn N Earn", icon: Monitor, color: "border-[#ffe8a0] text-[#1d3b56] bg-[#ffe8a0]/30" }
          ].map((item, i) => (
            <div key={i} className={`flex flex-col items-center group ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
              <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-dashed flex items-center justify-center p-3 transition-transform duration-500 group-hover:scale-110 ${item.color}`}>
                 <item.icon className="w-10 h-10 md:w-14 md:h-14 stroke-1.5" />
              </div>
              <span className="text-[11px] md:text-xs font-bold uppercase text-[#1d3b56] tracking-[0.2em] mt-6 md:mt-8 text-center px-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Intro Section (Yellow) */}
      <section id="courses" className="flex flex-col md:flex-row min-h-[400px] md:min-h-[500px] scroll-mt-20">
        <div className="w-full md:w-1/2 bg-[#ffdb71] p-6 sm:p-12 md:p-24 flex flex-col justify-center">
          <SectionHeading className="mb-6 md:mb-8 text-2xl md:text-6xl tracking-tighter">Makeup Artistry Course Bundle <span className="font-serif italic font-medium leading-none tracking-normal">+ Professional Kit</span></SectionHeading>
          <p className="text-sm md:text-xl text-[#1d3b56]/80 leading-relaxed font-medium">
            Are you aspiring to become a professional or simply pursuing your passion? Developed with a Celebrity Masterclass presented by global award-winning beauty entrepreneur Melanie Burnicle, our Makeup Artistry Course Bundle + Professional Kit is designed for all skill levels. You also get genuine daily mentor support from industry pro <strong>Jess Buff</strong>.
          </p>
          <div className="mt-8 bg-white/50 p-5 rounded-2xl border border-white/70 grid sm:grid-cols-[140px_1fr] gap-5 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
              <Image src="/oca-assets/makeup-beauty-bundle.png" alt="Free Kryolan starter kit included" fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-black text-[#1d3b56] text-lg mb-2">Pack your FREE Kit from Kryolan</h4>
              <p className="text-sm text-gray-700 font-medium">Get a professional <strong>Kryolan Starter Kit</strong> included at no extra cost when you enrol in the bundle today.</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-[#a6d5c7] p-5 sm:p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/35 shadow-2xl">
            <div className="relative aspect-[1450/1164] w-full bg-[#a6d5c7]">
              <Image
                src="/oca-assets/award-screenshot.png"
                alt="Free Kryolan professional makeup kit promotion"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
            <div className="grid gap-4 bg-[#1d3b56] p-5 text-center text-white sm:grid-cols-[110px_1fr] sm:text-left md:p-6">
              <div className="relative mx-auto h-20 w-24 sm:mx-0">
                <Image src="/oca-assets/endorsement-screenshot.png" alt="Makeup Artist Guild Asia Pacific endorsement" fill className="object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#a6d5c7]">2023 Winner</p>
                <h4 className="mt-1 text-2xl font-black leading-none sm:text-3xl md:text-4xl">Beauty Course of the Year</h4>
                <p className="mt-2 text-sm font-medium text-white/75">Recognised by Makeup Artist Guild Asia Pacific.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4b. Video Showcase */}
      <section id="kit-video" className="py-16 md:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-[#f38669] text-xs font-black uppercase tracking-widest block mb-3">Video Showcase</span>
            <SectionHeading className="mb-6 text-3xl md:text-5xl">See The Bundle In Action</SectionHeading>
            <p className="text-[#1d3b56]/70 text-base md:text-lg font-medium leading-relaxed mb-6">
              Preview the learning experience, the beauty pathway, and the practical tools included with your free Kryolan professional kit.
            </p>
            <a href={KRYOLAN_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1d3b56] px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#142a3e]">
              <Youtube className="w-4 h-4" /> Open in Vimeo
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[2rem] border-[10px] border-[#d4efe8] bg-[#1d3b56] shadow-2xl">
              <iframe
                src={KRYOLAN_VIDEO_EMBED_URL}
                title="Kryolan professional makeup kit video"
                className="block aspect-video w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. You Will Learn (Mint/Teal) */}
      <section id="pathways" className="flex flex-col md:flex-row-reverse min-h-[500px] md:min-h-[600px] scroll-mt-20">
        <div className="w-full md:w-1/2 bg-[#d4efe8] p-6 sm:p-12 md:p-24 flex flex-col justify-center">
          <SectionHeading className="mb-6 md:mb-10 text-3xl md:text-5xl">You will learn:</SectionHeading>
          <p className="text-[#1d3b56]/80 mb-8 md:mb-12 leading-relaxed font-bold italic font-serif text-lg md:text-2xl px-4 md:px-8 border-l-4 border-[#a6d5c7]">
            Our voice is supportive and practical, guiding you to build capability at your own pace. Discover your potential with subjects including:
          </p>
          <ul className="space-y-4 md:space-y-8">
            {[
              "Celebrity Masterclass presented by Melanie Burnicle",
              "Makeup for Film & Television characters",
              "Colour Theory & Practical Application",
              "Understanding Diverse Skin Tones & Features",
              "Expert Advice on Products & Ingredients",
              "Professional Client Consultation Pathways",
              "Daily Access to Mentor Jess Buff"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-2 w-5 h-5 rounded-full bg-[#1d3b56] flex items-center justify-center text-white flex-shrink-0">
                   <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <span className="font-bold text-[#1d3b56] text-lg md:text-xl leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
          <Image 
            src="https://picsum.photos/seed/makeupbrushes/1200/1000" 
            alt="MUA Professional Work" 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
            unoptimized
          />
        </div>
      </section>

      {/* 6. Affordable Pricing CTA */}
      <section className="py-20 md:py-40 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#f38669] text-white font-bold px-5 md:px-8 py-2 rounded-full inline-block mb-8 md:mb-12 text-xs md:text-sm uppercase tracking-widest">
            Limited Time Pathway Offer
          </div>
          <h2 className="text-4xl md:text-8xl font-bold text-[#1d3b56] mb-6 md:mb-10 leading-[1.02] tracking-tighter">
            Flexible <span className="font-serif italic text-[#a6d5c7]">Learning</span>
          </h2>
          <p className="text-lg md:text-2xl text-[#1d3b56]/60 mb-12 md:mb-20 font-medium leading-relaxed max-w-2xl mx-auto">
             Whether upskilling or retraining, OCA provides structured pathways designed for your journey. Start your professional transformation today.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12 md:mb-24">
             <div className="bg-[#feaf9d] px-10 md:px-16 py-8 md:py-14 rounded-[3rem] shadow-sm transform rotate-1 w-full md:w-auto max-w-sm mx-auto">
                <p className="text-3xl md:text-5xl font-bold text-[#1d3b56]">50% OFF</p>
                <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] mt-3 md:mt-4">Course Full Price Discount</p>
             </div>
          </div>

          <a href="#enrol" className="inline-flex w-full md:w-auto justify-center px-12 md:px-24 py-6 md:py-8 bg-[#1d3b56] text-white font-bold text-lg md:text-2xl rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 uppercase tracking-widest">
            Enrol Today
          </a>
        </div>
      </section>

      {/* 7. Mentor Section */}
      <section id="mentor" className="py-16 md:py-40 bg-gray-50 border-y border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
             <SectionHeading className="mb-8 md:mb-12">Learn From A Global <br/><span className="font-serif italic text-[#f38669]">Award-Winning</span> Icon</SectionHeading>
             <p className="text-2xl md:text-4xl font-serif italic text-[#1d3b56] border-b border-[#a6d5c7]/30 pb-12 mb-12 leading-tight">
                &quot;With over 25 years experience, Melanie Burnicle presents your exclusive Celebrity Masterclass content series.&quot;
             </p>
             <div className="space-y-6 text-[#1d3b56]/70 text-lg md:text-xl leading-relaxed font-medium">
                <p>Online Courses Australia speaks with clarity and confidence. We empower learners from all walks of life to build capability in their own time.</p>
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 flex items-start gap-6">
                  <Award className="w-10 h-10 md:w-16 md:h-16 text-[#a6d5c7] flex-shrink-0 stroke-1.5" />
                  <p className="font-bold text-[#1d3b56] text-xl md:text-2xl">Exclusively included with mentor support!</p>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] relative rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white lg:transform lg:rotate-2">
              <Image 
                src="https://storage.pardot.com/974053/1716698141d6AyAwZ8/OCA_Landing_Page_Images_Mentor1.webp" 
                alt="Melanie Burnicle Celebrity MUA" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Trustpilot Footer Area */}
      <section className="py-16 md:py-40 bg-[#1d3b56] text-center text-white px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl xs:text-5xl md:text-8xl font-bold mb-8 md:mb-12 tracking-tighter">Your future <span className="font-serif italic text-[#ffdb71]">starts now</span></h2>
          <div className="flex justify-center gap-1.5 md:gap-2 mb-8 md:mb-12">
             {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 md:w-16 md:h-16 fill-[#ffdb71] text-[#ffdb71]" />)}
          </div>
          <p className="text-xl md:text-4xl font-serif italic text-[#fff0c0] opacity-80 mb-12 md:mb-16">7-day Money Back Guarantee</p>
          <div className="bg-white/5 backdrop-blur-md p-6 xs:p-8 sm:p-12 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-inner">
             <p className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight uppercase tracking-[0.05em] md:tracking-[0.1em]">Trustpilot - Excellent</p>
             <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm">Based on 2,500+ student reviews</p>
          </div>
        </div>
      </section>

      {/* 9. Final Form Area */}
      <section id="enrol" className="py-16 md:py-40 bg-[#fff0c0]/40 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
           <SectionHeading className="mb-10 md:mb-16">Get Your Career <span className="font-serif italic text-[#a6d5c7]">Pathway</span> Guide</SectionHeading>
           <div className="grid lg:grid-cols-[1fr_540px] gap-10 items-center w-full">
             <div className="relative aspect-[654/402] w-full overflow-hidden rounded-[2rem] border border-[#fecabe] bg-white shadow-sm">
               <Image src="/oca-assets/info-pack-images.png" alt="Download your free makeup artistry info pack" fill className="object-cover" />
             </div>
             <InfoPackForm title="Build Your Confidence" />
           </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 text-center md:text-left">
           <div>
              <div className="relative w-40 h-12 mb-8 mx-auto md:mx-0">
                 <Image 
                    src="https://d1yg2ddo8j5qoh.cloudfront.net/pix/rebrand/oca_logo.png" 
                    alt="OCA Logo" 
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
              </div>
              <p className="text-[#1d3b56]/40 font-bold uppercase tracking-[0.1em] text-xs">Let&apos;s be social...</p>
              <div className="flex justify-center md:justify-start gap-8 mt-6">
                 <Instagram className="w-6 h-6 text-[#1d3b56]/60 hover:text-[#f38669] transition-colors cursor-pointer" />
                 <Facebook className="w-6 h-6 text-[#1d3b56]/60 hover:text-[#f38669] transition-colors cursor-pointer" />
              </div>
              <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4 opacity-80 grayscale hover:grayscale-0 transition-all">
                <Image src="/oca-assets/endorsement-screenshot.png" alt="Makeup Artist Guild Asia Pacific" width={100} height={76} className="object-contain rounded bg-gray-50" />
                <div className="h-10 w-24 bg-[#1d3b56] rounded border border-[#1d3b56]/10 flex flex-col items-center justify-center text-white leading-none">
                  <span className="text-xs font-black tracking-tight">CPD</span>
                  <span className="text-[8px] font-bold uppercase tracking-wider opacity-80">Certified</span>
                </div>
                <div className="h-10 w-20 bg-gray-50 rounded border border-gray-100 flex items-center justify-center p-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">ASQA</span>
                </div>
              </div>
           </div>
           
           <div>
              <h5 className="font-bold text-[#1d3b56] text-xs uppercase tracking-[0.2em] mb-10 opacity-40">Resources</h5>
              <ul className="space-y-4 text-sm font-bold text-[#1d3b56]/60">
                <li className="hover:text-[#f38669] cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-[#f38669] cursor-pointer transition-colors">Topics</li>
                <li className="hover:text-[#f38669] cursor-pointer transition-colors">Mentor Support</li>
                <li className="hover:text-[#f38669] cursor-pointer transition-colors">Student FAQs</li>
                <li className="hover:text-[#f38669] cursor-pointer transition-colors font-black text-[#f38669]">Trustpilot Reviews</li>
              </ul>
           </div>

           <div className="col-span-1 md:col-span-2">
              <h5 className="font-bold text-[#1d3b56] text-xs uppercase tracking-[0.2em] mb-10 opacity-40">Endorsements & Payment Partners</h5>
              <p className="text-sm font-bold text-[#1d3b56]/60 mb-8 max-w-sm mx-auto md:mx-0">
                OCA provides structured pathways designed for Australian learners, with global lifetime access and flexible payment support.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 {['Visa', 'Mastercard', 'Amex', 'Afterpay', 'Zip', 'Secure SSL'].map((partner, i) => (
                    <div key={i} className="h-10 px-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-[10px] font-black text-[#1d3b56]/40 uppercase tracking-widest">
                      {partner}
                    </div>
                 ))}
              </div>
              <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                  <Star className="w-4 h-4 fill-[#00b67a] text-[#00b67a]" />
                  <span className="text-xs font-black text-[#1d3b56]">Trustpilot ⭐⭐⭐⭐⭐</span>
                </div>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 border-t border-gray-50 mt-16 text-center text-[10px] font-bold text-[#1d3b56]/30 uppercase tracking-[0.2em]">
           © 2026 Online Courses Australia. | <a href="#" className="underline">Privacy</a> | <a href="#" className="underline">Terms</a>
        </div>
      </footer>
    </div>
  )
}
