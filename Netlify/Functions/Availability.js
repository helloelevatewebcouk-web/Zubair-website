const { SLOTS, isValidDate, availabilityStore, json } = require('./_lib')

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed.' })
  }

  const date = event.queryStringParameters && event.queryStringParameters.date

  if (!isValidDate(date)) {
    return json(400, { error: 'A valid "date" query parameter (YYYY-MM-DD) is required.' })
  }

  try {
    const store = availabilityStore()
    const dayRecord = (await store.get(date, { type: 'json' })) || {}

    const slots = SLOTS.map((slot) => ({
      key: slot.key,
      label: slot.label,
      status: dayRecord[slot.key] === 'TAKEN' ? 'TAKEN' : 'AVAILABLE'
    }))

    return json(200, { date, slots })
  } catch (err) {
    return json(500, { error: 'Could not load availability. Please try again shortly.' })
  }
}
