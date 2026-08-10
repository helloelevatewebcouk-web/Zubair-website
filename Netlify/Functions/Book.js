const crypto = require('crypto')
const { SLOTS, isValidDate, isValidSlot, availabilityStore, appointmentsStore, json } = require('./_lib')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/

function validate(body) {
  const errors = {}
  if (!body.name || !body.name.trim()) errors.name = 'Full name is required.'
  if (!body.email || !EMAIL_RE.test(body.email.trim())) errors.email = 'A valid email address is required.'
  if (!body.phone || !PHONE_RE.test(body.phone.trim())) errors.phone = 'A valid phone number is required.'
  if (!body.reason || !body.reason.trim()) errors.reason = 'Please add a reason for the appointment.'
  if (!isValidDate(body.date)) errors.date = 'A valid date is required.'
  if (!isValidSlot(body.slotKey)) errors.slotKey = 'Please select a valid time slot.'
  return errors
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' })
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid request body.' })
  }

  const errors = validate(body)
  if (Object.keys(errors).length > 0) {
    return json(422, { error: 'Please correct the highlighted fields.', fields: errors })
  }

  const { date, slotKey } = body

  try {
    const avStore = availabilityStore()

    const dayRecord = (await avStore.get(date, { type: 'json' })) || {}

    if (dayRecord[slotKey] === 'TAKEN') {
      return json(409, { error: 'That time slot has just been taken. Please choose another.' })
    }

    dayRecord[slotKey] = 'TAKEN'
    await avStore.setJSON(date, dayRecord)

    const slot = SLOTS.find((s) => s.key === slotKey)
    const bookingId = crypto.randomUUID()

    const record = {
      id: bookingId,
      date,
      slotKey,
      slotLabel: slot.label,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      reason: body.reason.trim(),
      notes: (body.notes || '').trim(),
      createdAt: new Date().toISOString(),
      status: 'REQUESTED'
    }

    const apStore = appointmentsStore()
    await apStore.setJSON(`${date}__${slotKey}`, record)

    return json(200, {
      message: 'Appointment request received.',
      date,
      slotLabel: slot.label,
      id: bookingId
    })
  } catch (err) {
    return json(500, { error: 'Something went wrong while booking. Please try again shortly.' })
  }
}
