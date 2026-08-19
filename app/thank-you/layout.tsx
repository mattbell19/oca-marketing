import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | Online Courses Australia',
  description: 'Thank you for your enquiry. Our course advisor will be in touch shortly.'
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children
}
