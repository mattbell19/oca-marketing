import { NextResponse } from 'next/server'
import { createHash, randomUUID } from 'node:crypto'
import { isLeadRateAllowed, recordLeadDeliveryEvent, saveLeadToDb } from '../../../lib/offerDb'

export const runtime = 'nodejs'

type MakeupLeadPayload = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  enquiryReason?: string
  formTitle?: string
  course?: string
  sourcePage?: string
  referrer?: string
  company?: string
}

const REQUIRED_FIELDS: Array<keyof MakeupLeadPayload> = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'enquiryReason'
]

const getWebhookUrl = (leadSource: string) => {
  if (leadSource === 'OCA Business Landing Page' && process.env.OCA_BUSINESS_LEADS_WEBHOOK_URL) {
    return process.env.OCA_BUSINESS_LEADS_WEBHOOK_URL
  }

  if (leadSource === 'OCA Social Media Landing Page' && process.env.OCA_SOCIAL_MEDIA_LEADS_WEBHOOK_URL) {
    return process.env.OCA_SOCIAL_MEDIA_LEADS_WEBHOOK_URL
  }

  if (leadSource === 'OCA Mental Health Landing Page' && process.env.OCA_MENTAL_HEALTH_LEADS_WEBHOOK_URL) {
    return process.env.OCA_MENTAL_HEALTH_LEADS_WEBHOOK_URL
  }

  return process.env.OCA_MAKEUP_LEADS_WEBHOOK_URL ||
    process.env.MAKEUP_LEADS_WEBHOOK_URL ||
    process.env.ZAPIER_WEBHOOK_URL
}

const clean = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const hasPlaceholderWebhook = (url: string) => url.includes('example.com') || url.includes('replace-me')
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidPhone = (phone: string) => phone.replace(/\D/g, '').length >= 8

const getLeadSource = (courseName: string) => {
  const normalizedCourseName = courseName.toLowerCase()

  if (normalizedCourseName.includes('mental health')) return 'OCA Mental Health Landing Page'
  if (normalizedCourseName.includes('criminology')) return 'OCA Criminology Landing Page'
  if (normalizedCourseName.includes('business')) return 'OCA Business Landing Page'
  if (normalizedCourseName.includes('horticulture')) return 'OCA Horticulture Landing Page'
  if (normalizedCourseName.includes('event')) return 'OCA Event Management Landing Page'
  if (normalizedCourseName.includes('social media')) return 'OCA Social Media Landing Page'

  return 'OCA Makeup Landing Page'
}

const getSalesforceProduct = (leadSource: string) => {
  if (leadSource === 'OCA Business Landing Page') {
    return 'Business Course Bundle (9 Micro-Credentials)'
  }

  if (leadSource === 'OCA Social Media Landing Page') {
    return 'Social Media Masterclass & Mentorship Bundle'
  }

  return ''
}

export async function POST(request: Request) {
  let body: MakeupLeadPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid lead payload.' }, { status: 400 })
  }

  if (clean(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const rateLimitKey = `lead_rate:${createHash('sha256').update(ip).digest('hex')}`
  if (!await isLeadRateAllowed(rateLimitKey)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again shortly.' }, { status: 429 })
  }

  const missingFields = REQUIRED_FIELDS.filter((field) => !clean(body[field]))

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required field${missingFields.length > 1 ? 's' : ''}: ${missingFields.join(', ')}` },
      { status: 400 }
    )
  }

  const email = clean(body.email).toLowerCase()
  const phoneNumber = clean(body.phone)
  if (!isValidEmail(email) || !isValidPhone(phoneNumber)) {
    return NextResponse.json({ error: 'Enter a valid email address and phone number.' }, { status: 400 })
  }

  if ([body.firstName, body.lastName, body.enquiryReason, body.course, body.formTitle].some((value) => clean(value).length > 200)) {
    return NextResponse.json({ error: 'One or more lead fields are too long.' }, { status: 400 })
  }

  const submittedAt = new Date().toISOString()
  const courseName = clean(body.course) || 'Makeup Artistry Course Bundle + Professional Kit'
  const leadSource = getLeadSource(courseName)
  const leadId = randomUUID()

  const webhookUrl = getWebhookUrl(leadSource)

  if (!webhookUrl || hasPlaceholderWebhook(webhookUrl)) {
    return NextResponse.json(
      { error: 'Lead webhook is not configured.' },
      { status: 503 }
    )
  }

  const leadPayload = {
    lead_id: leadId,
    first_name: clean(body.firstName),
    last_name: clean(body.lastName),
    email,
    phone: phoneNumber,
    phone_number: phoneNumber,
    mobile: phoneNumber,
    mobile_phone: phoneNumber,
    MobilePhone: phoneNumber,
    best_contact_number: phoneNumber,
    enquiry_reason: clean(body.enquiryReason),
    course: courseName,
    form_title: clean(body.formTitle),
    source_page: clean(body.sourcePage),
    referrer: clean(body.referrer),
    lead_source: leadSource,
    salesforce_product: getSalesforceProduct(leadSource),
    submitted_at: submittedAt,
    consent_marketing: true
  }

  const leadWasPersisted = await saveLeadToDb(leadPayload)
  if (!leadWasPersisted) {
    console.error(`Lead ${leadId} could not be persisted before webhook delivery.`)
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lead-Id': leadId
      },
      body: JSON.stringify(leadPayload),
      signal: AbortSignal.timeout(10_000)
    })

    if (!webhookResponse.ok) {
      await recordLeadDeliveryEvent({
        leadId,
        leadSource,
        delivered: false,
        occurredAt: new Date().toISOString(),
        statusCode: webhookResponse.status,
        error: 'Webhook rejected the submission.'
      })
      return NextResponse.json(
        { error: 'Lead webhook rejected the submission.' },
        { status: 502 }
      )
    }

    await recordLeadDeliveryEvent({
      leadId,
      leadSource,
      delivered: true,
      occurredAt: new Date().toISOString(),
      statusCode: webhookResponse.status
    })

    return NextResponse.json({ ok: true, leadId })
  } catch (error) {
    await recordLeadDeliveryEvent({
      leadId,
      leadSource,
      delivered: false,
      occurredAt: new Date().toISOString(),
      error: error instanceof Error && error.name === 'TimeoutError'
        ? 'Webhook request timed out.'
        : 'Could not reach the lead webhook.'
    })
    return NextResponse.json(
      { error: 'Could not reach the lead webhook.' },
      { status: 502 }
    )
  }
}
