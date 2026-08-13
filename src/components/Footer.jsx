import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display font-extrabold uppercase tracking-tight text-ink">
            Zubair Enterprises <span className="text-gold">Ltd</span>
          </p>
          <p className="mt-3 text-sm text-ink/60 max-w-xs">
            Independent Amazon FBA business focused on efficiency, consistency and long-term growth.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-ink/70 hover:text-gold transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-ink/70 hover:text-gold transition-colors">About</Link></li>
            <li><Link to="/our-approach" className="text-ink/70 hover:text-gold transition-colors">Our Approach</Link></li>
            <li><Link to="/book-appointment" className="text-ink/70 hover:text-gold transition-colors">Book an Appointment</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+447786968647" className="text-ink/70 hover:text-gold transition-colors">+44 7786 968647</a>
            </li>
            <li>
              <a href="mailto:ZubairEnterprisesltd@gmail.com" className="text-ink/70 hover:text-gold transition-colors break-all">
                ZubairEnterprisesltd@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 md:px-10 py-6 text-xs text-ink/40">
          © 2026 Zubair Enterprises Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
