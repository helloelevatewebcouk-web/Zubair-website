import React, { useEffect, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

const initialForm = { name: '', email: '', phone: '', reason: '', notes: '' }

export default function Book() {
  useDocumentTitle(
    'Book an Appointment | Zubair Enterprises Ltd',
    'Choose a suitable time and provide your details. Zubair Enterprises Ltd will take it from there.'
  )

  const [date, setDate] = useState(todayISO())
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)

  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoadingSlots(true)
    setSlotsError('')
    setSelectedSlot(null)

    fetch(`/api/availability?date=${date}`)
      .then((res) => {
        if (!res.ok) throw new Error('bad-response')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setSlots(data.slots || [])
      })
      .catch(() => {
        if (!cancelled) setSlotsError('Availability could not be loaded. Please try again, or check back shortly.')
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false)
      })

    return () => {
      cancelled = true
    }
  }, [date])

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setFieldErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validateClientSide() {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.'
    if (!/^[0-9+()\-\s]{7,20}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number.'
    if (!form.reason.trim()) errors.reason = 'Please add a reason for the appointment.'
    if (!selectedSlot) errors.slot = 'Please select an available time slot.'
    return errors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')

    const errors = validateClientSide()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, slotKey: selectedSlot.key, ...form })
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          setSubmitError(data.error)
          setSlots((prev) => prev.map((s) => (s.key === selectedSlot.key ? { ...s, status: 'TAKEN' } : s)))
          setSelectedSlot(null)
        } else if (data.fields) {
          setFieldErrors(data.fields)
        } else {
          setSubmitError(data.error || 'Something went wrong. Please try again.')
        }
        return
      }

      setConfirmation(data)
    } catch {
      setSubmitError('Could not reach the booking service. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <section className="section pt-40 md:pt-48 pb-28">
        <Reveal className="max-w-xl mx-auto border border-ink px-8 py-16 text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="eyebrow">Request Received</p>
          <h1 className="mt-4 text-3xl md:text-4xl font-display font-extrabold uppercase text-ink">
            Appointment request received
          </h1>
          <p className="mt-5 text-ink/65 leading-relaxed">
            Thank you. Your appointment request has been submitted successfully for{' '}
            <span className="font-semibold text-ink">{confirmation.date}</span>,{' '}
            <span className="font-semibold text-ink">{confirmation.slotLabel}</span>. Zubair Enterprises Ltd
            will confirm the appointment shortly.
          </p>
        </Reveal>
      </section>
    )
  }

  return (
    <>
      <section className="section pt-40 md:pt-48 pb-14">
        <Reveal>
          <p className="eyebrow">Book an Appointment</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold uppercase leading-tight text-ink">
            Book an appointment.
          </h1>
          <p className="mt-6 max-w-xl text-ink/65 leading-relaxed">
            Choose a suitable time and provide your details. We'll take it from there.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex flex-col sm:flex-row gap-6 text-sm">
          <div>
            <p className="font-semibold text-ink">Zubair Enterprises Ltd</p>
            <a href="tel:+447786968647" className="text-ink/60 hover:text-gold transition-colors">+44 7786 968647</a>
          </div>
          <div>
            <p className="font-semibold text-ink">Email</p>
            <a href="mailto:ZubairEnterprisesltd@gmail.com" className="text-ink/60 hover:text-gold transition-colors break-all">
              ZubairEnterprisesltd@gmail.com
            </a>
          </div>
        </Reveal>
      </section>

      <section className="section pt-0 pb-28 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <label htmlFor="appt-date" className="eyebrow block mb-3">1. Select a date</label>
          <input
            id="appt-date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full sm:w-64 border border-ink px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-gold"
          />

          <p className="eyebrow block mt-10 mb-3">2. Select a time</p>

          {loadingSlots && <p className="text-sm text-ink/50">Loading availability…</p>}
          {slotsError && <p className="text-sm text-red-600">{slotsError}</p>}

          {!loadingSlots && !slotsError && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="listbox" aria-label="Available appointment times">
              {slots.map((slot) => {
                const isTaken = slot.status === 'TAKEN'
                const isSelected = selectedSlot?.key === slot.key
                return (
                  <button
                    key={slot.key}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={isTaken}
                    onClick={() => {
                      setSelectedSlot(slot)
                      setFieldErrors((e) => ({ ...e, slot: undefined }))
                    }}
                    className={`text-left border px-4 py-3 text-sm transition-all duration-200 ease-elegant
                      ${isTaken
                        ? 'bg-ink/90 border-ink text-white/50 cursor-not-allowed'
                        : isSelected
                          ? 'bg-ink text-white border-ink'
                          : 'bg-white border-line text-ink hover:border-gold hover:-translate-y-0.5'}
                    `}
                  >
                    <span className="block font-medium">{slot.label}</span>
                    <span className={`block mt-1 text-xs uppercase tracking-wide ${isTaken ? 'text-white/50' : isSelected ? 'text-gold' : 'text-ink/40'}`}>
                      {isTaken ? 'Taken' : isSelected ? 'Selected' : 'Available'}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
          {fieldErrors.slot && <p className="mt-3 text-sm text-red-600">{fieldErrors.slot}</p>}
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow block mb-3">3. Your details</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-ink/60 mb-1">Selected date</label>
                <p className="border border-line bg-cream/40 px-3 py-2 text-sm">{date}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-ink/60 mb-1">Selected time</label>
                <p className="border border-line bg-cream/40 px-3 py-2 text-sm">
                  {selectedSlot ? selectedSlot.label : 'Not selected yet'}
                </p>
              </div>
            </div>

            <Field label="Full name" htmlFor="name" error={fieldErrors.name}>
              <input id="name" type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)}
                className="input" autoComplete="name" />
            </Field>

            <Field label="Email" htmlFor="email" error={fieldErrors.email}>
              <input id="email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)}
                className="input" autoComplete="email" />
            </Field>

            <Field label="Phone number" htmlFor="phone" error={fieldErrors.phone}>
              <input id="phone" type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)}
                className="input" autoComplete="tel" />
            </Field>

            <Field label="Reason for appointment" htmlFor="reason" error={fieldErrors.reason}>
              <textarea id="reason" rows={3} value={form.reason} onChange={(e) => updateField('reason', e.target.value)}
                className="input resize-none" />
            </Field>

            <Field label="Additional information (optional)" htmlFor="notes">
              <textarea id="notes" rows={2} value={form.notes} onChange={(e) => updateField('notes', e.target.value)}
                className="input resize-none" />
            </Field>

            {submitError && <p className="text-sm text-red-600" role="alert">{submitError}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
              {submitting ? 'Submitting…' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-xs font-medium text-ink/60 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600" role="alert">{error}</p>}
    </div>
  )
}
