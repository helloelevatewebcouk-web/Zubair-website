const { getStore } = require('@netlify/blobs')

const SLOTS = [
  { key: '00:00-02:00', label: '12:00 AM – 2:00 AM' },
  { key: '02:00-04:00', label: '2:00 AM – 4:00 AM' },
  { key: '04:00-06:00', label: '4:00 AM – 6:00 AM' },
  { key: '06:00-08:00', label: '6:00 AM – 8:00 AM' },
  { key: '08:00-10:00', label: '8:00 AM – 10:00 AM' },
  { key: '10:00-12:00', label: '10:00 AM – 12:00 PM' },
  { key: '12:00-14:00', label: '12:00 PM – 2:00 PM' },
  { key: '14:00-16:00', label: '2:00 PM – 4:00 PM' },
  { key: '16:00-18:00', label: '4:00 PM – 6:00 PM' },
  { key: '18:00-20:00', label: '6:00 PM – 8:00 PM' },
  { key: '20:00-22:00', label: '8:00 PM – 10:00 PM' },
  { key: '22:00-24:00', label: '10:00 PM – 12:00 AM' }
]

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function isValidDate(date) {
  return typeof date === 'string' && DATE_RE.test(date)
}

function isValidSlot(slotKey) {
  return SLOTS.some((s) => s.key === slotKey)
}

function availabilityStore() {
  return getStore({ name: 'availability', consistency: 'strong' })
}

function appointmentsStore() {
  return getStore({ name: 'appointments', consistency: 'strong' })
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(body)
  }
}

function checkAdmin(event) {
  const provided = event.headers['x-admin-password'] || event.headers['X-Admin-Password']
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return { ok: false, reason: 'ADMIN_PASSWORD is not configured on the server.' }
  }
  if (!provided || provided !== expected) {
    return { ok: false, reason: 'Incorrect password.' }
  }
  return { ok: true }
}

module.exports = { SLOTS, isValidDate, isValidSlot, availabilityStore, appointmentsStore, json, checkAdmin }
