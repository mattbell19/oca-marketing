import { NextResponse } from 'next/server'

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

const getWebhookUrl = () =>
  process.env.OCA_MAKEUP_LEADS_WEBHOOK_URL ||
  process.env.MAKEUP_LEADS_WEBHOOK_URL ||
  process.env.ZAPIER_WEBHOOK_URL

const clean = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

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

  const missingFields = REQUIRED_FIELDS.filter((field) => !clean(body[field]))

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required field${missingFields.length > 1 ? 's' : ''}: ${missingFields.join(', ')}` },
      { status: 400 }
    )
  }

  const webhookUrl = getWebhookUrl()

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Lead webhook is not configured. Set OCA_MAKEUP_LEADS_WEBHOOK_URL.' },
      { status: 503 }
    )
  }

  const submittedAt = new Date().toISOString()
  const phoneNumber = clean(body.phone)
  const leadPayload = {
    first_name: clean(body.firstName),
    last_name: clean(body.lastName),
    email: clean(body.email).toLowerCase(),
    phone: phoneNumber,
    phone_number: phoneNumber,
    mobile: phoneNumber,
    mobile_phone: phoneNumber,
    MobilePhone: phoneNumber,
    best_contact_number: phoneNumber,
    enquiry_reason: clean(body.enquiryReason),
    course: clean(body.course) || 'Makeup Artistry Course Bundle + Professional Kit',
    form_title: clean(body.formTitle),
    source_page: clean(body.sourcePage),
    referrer: clean(body.referrer),
    lead_source: 'OCA Makeup Landing Page',
    submitted_at: submittedAt,
    consent_marketing: true
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload)
    })

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { error: 'Lead webhook rejected the submission.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the lead webhook.' },
      { status: 502 }
    )
  }
}
