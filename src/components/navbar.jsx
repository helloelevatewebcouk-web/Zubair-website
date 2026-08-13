import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/our-approach', label: 'Our Approach' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ease-elegant
        ${scrolled ? 'bg-white/90 backdrop-blur-md border-line shadow-[0_8px_30px_-24px_rgba(17,17,17,0.4)]' : 'bg-white/70 backdrop-blur-sm border-transparent'}`}
    >
      <nav className={`mx-auto max-w-6xl px-6 md:px-10 flex items-center justify-between transition-all duration-300 ease-elegant ${scrolled ? 'py-3' : 'py-5'}`}>
        <Link to="/" className="font-display font-extrabold tracking-tight text-ink text-sm md:text-base uppercase" onClick={() => setOpen(false)}>
          Zubair Enterprises <span className="text-gold">Ltd</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-ink border-b-2 border-gold pb-1' : 'text-ink/60 hover:text-ink pb-1'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/book-appointment" className="btn-primary text-xs px-5 py-3">
            Book an Appointment
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative h-10 w-10 flex items-center justify-center"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 top-0 h-[1.5px] w-6 bg-ink transition-all duration-300 ease-elegant ${open ? 'top-2 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-2 h-[1.5px] w-6 bg-ink transition-all duration-300 ease-elegant ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 top-4 h-[1.5px] w-6 bg-ink transition-all duration-300 ease-elegant ${open ? 'top-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-elegant bg-white border-t border-line ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `text-base font-medium ${isActive ? 'text-ink' : 'text-ink/60'}`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/book-appointment" onClick={() => setOpen(false)} className="btn-primary mt-2">
            Book an Appointment
          </Link>
        </div>
      </div>
    </header>
  )
}
