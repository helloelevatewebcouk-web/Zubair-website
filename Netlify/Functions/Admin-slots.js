const { SLOTS, isValidDate, isValidSlot, availabilityStore, appointmentsStore, checkAdmin, json } = require('./_lib')

exports.handler = async (event) => {
  const auth = checkAdmin(event)
  if (!auth.ok) {
    return json(401, { error: auth.reason })
  }

  const avStore = availabilityStore()
  const apStore = appointmentsStore()

  if (event.httpMethod === 'GET') {
    const date = event.queryStringParameters && event.queryStringParameters.date
    if (!isValidDate(date)) {
      return json(400, { error: 'A valid "date" query parameter (YYYY-MM-DD) is required.' })
    }

    const dayRecord = (await avStore.get(date, { type: 'json' })) || {}

    const slots = await Promise.all(
      SLOTS.map(async (slot) => {
        const status = dayRecord[slot.key] === 'TAKEN' ? 'TAKEN' : 'AVAILABLE'
        const appointment = status === 'TAKEN' ? await apStore.get(`${date}__${slot.key}`, { type: 'json' }) : null
        return { key: slot.key, label: slot.label, status, appointment: appointment || null }
      })
    )

    return json(200, { date, slots })
  }

  if (event.httpMethod === 'POST') {
    let body
    try {
      body = JSON.parse(event.body || '{}')
    } catch {
      return json(400, { error: 'Invalid request body.' })
    }

    const { date, slotKey, status } = body
    if (!isValidDate(date)) return json(422, { error: 'A valid date is required.' })
    if (!isValidSlot(slotKey)) return json(422, { error: 'A valid slot key is required.' })
    if (status !== 'AVAILABLE' && status !== 'TAKEN') {
      return json(422, { error: 'Status must be AVAILABLE or TAKEN.' })
    }

    const dayRecord = (await avStore.get(date, { type: 'json' })) || {}

    if (status === 'TAKEN') {
      dayRecord[slotKey] = 'TAKEN'
    } else {
      delete dayRecord[slotKey]
      await apStore.delete(`${date}__${slotKey}`)
    }

    await avStore.setJSON(date, dayRecord)
    return json(200, { date, slotKey, status })
  }

  return json(405, { error: 'Method not allowed.' })
}
