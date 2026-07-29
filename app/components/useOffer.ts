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
  bannerText: 'July Intake Closing 50% Off Sitewide',
  detailText: 'Our Last 100 Sale is on now. Enrol today to get 50% off all course fees, limited to the first 100 students only.',
  promoCode: 'LAST100',
  discountText: '50%',
  endDate: '2026-07-30T23:59:59+10:00',
  endDateLabel: '30 July 2026'
}

export function useOffer() {
  const [offer, setOffer] = useState<OfferConfig>(defaultOffer)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: '--', hours: '--', minutes: '--', seconds: '--' })

  useEffect(() => {
    fetch('/api/offer')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.promoCode) {
          setOffer(data)
        }
      })
      .catch(() => {
        // Fall back silently to defaults
      })
  }, [])

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
