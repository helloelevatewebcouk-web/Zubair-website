import React, { useState } from 'react'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function Admin() {
  useDocumentTitle('Admin | Zubair Enterprises Ltd')

  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [date, setDate] = useState(todayISO())
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadSlots(pw = password, d = date) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin-slots?date=${d}`, {
        headers: { 'x-admin-password': pw }
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Access denied.')
        setAuthed(false)
        return
      }
      setSlots(data.slots)
      setAuthed(true)
    } catch {
      setError('Could not reach the admin service.')
    } finally {
      setLoading(false)
    }
  }

  async function toggle(slotKey, current) {
    const nextStatus = current === 'TAKEN' ? 'AVAILABLE' : 'TAKEN'
    setError('')
    try {
      const res = await fetch('/api/admin-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ date, slotKey, status: nextStatus })
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Could not update slot.')
        return
      }
      loadSlots()
    } catch {
      setError('Could not reach the admin service.')
    }
  }

  if (!authed) {
    return (
      <section className="section pt-40 md:pt-48 pb-28 max-w-sm">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-4 text-2xl font-display font-bold uppercase text-ink">Manage availability</h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            loadSlots()
          }}
        >
          <div>
            <label htmlFor="admin-password" className="block text-xs font-medium text-ink/60 mb-1">Admin password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className="section pt-40 md:pt-48 pb-28">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-4 text-2xl md:text-3xl font-display font-bold uppercase text-ink">Manage availability</h1>

      <div className="mt-8">
        <label htmlFor="admin-date" className="block text-xs font-medium text-ink/60 mb-1">Date</label>
        <input
          id="admin-date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
            loadSlots(password, e.target.value)
          }}
          className="input w-56"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}

      <div className="mt-8 divide-y divide-line border-t border-b border-line">
        {slots.map((slot) => (
          <div key={slot.key} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <p className="font-medium text-ink">{slot.label}</p>
              {slot.appointment && (
                <p className="text-xs text-ink/50 mt-0.5">
                  {slot.appointment.name} · {slot.appointment.email} · {slot.appointment.phone}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs uppercase tracking-wide font-semibold ${slot.status === 'TAKEN' ? 'text-ink' : 'text-gold'}`}>
                {slot.status}
              </span>
              <button
                type="button"
                onClick={() => toggle(slot.key, slot.status)}
                className="btn-secondary text-xs px-4 py-2"
              >
                Mark {slot.status === 'TAKEN' ? 'Available' : 'Taken'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
