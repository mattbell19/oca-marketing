import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Horticulture Essentials Course Bundle | Online Courses Australia',
  description: 'Ignite your passion for plants with sustainable gardening, plant biology, and environmental care courses.'
}

export default function HorticultureLayout({ children }: { children: React.ReactNode }) {
  return children
}
