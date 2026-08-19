import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Bundle Course | Online Courses Australia',
  description: 'Unlock your business potential with flexible, self-paced business and management courses.'
}

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children
}
