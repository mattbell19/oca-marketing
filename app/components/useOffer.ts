import { useState, useEffect } from 'react'

export type OfferConfig = {
  bannerText: string
  detailText: string
  promoCode: string
  discountText: string
  endDate: string
  endDateLabel: string
}

export type TimeLeft = {
  days: number | string
  hours: number | string
  minutes: number | string
  seconds: number | string
}

export const defaultOffer: OfferConfig = {
  bannerText: 'August Intake Special Offers Open',
  detailText: 'Study from just $15 per week on a flexible payment plan.',
  promoCode: 'SAVE100',
  discountText: '$100',
  endDate: '2026-08-06T23:59:59+10:00',
  endDateLabel: '6 August 2026'
}

export function useOffer(campaignKey: 'dog-grooming' | 'mental-health-leads' | 'makeup' | 'business-bundle' | 'social-media' | 'horticulture' | 'default' = 'default') {
  const [offer, setOffer] = useState<OfferConfig>(defaultOffer)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: '--', hours: '--', minutes: '--', seconds: '--' })

  useEffect(() => {
    fetch('/api/offer')
      .then((res) => res.json())
      .then((data) => {
        if (data && data[campaignKey]) {
          setOffer(data[campaignKey])
        } else if (data && data['default']) {
          setOffer(data['default'])
        }
      })
      .catch(() => {
        // Fall back silently to defaultOffer
      })
  }, [campaignKey])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(offer.endDate)
      const diff = +target - +new Date()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [offer.endDate])

  return { offer, timeLeft }
}
