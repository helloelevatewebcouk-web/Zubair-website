import React from 'react'
import Button from '../components/Button.jsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Page Not Found | Zubair Enterprises Ltd')
  return (
    <section className="section pt-48 pb-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-3xl md:text-5xl font-display font-extrabold uppercase text-ink">
        Page not found.
      </h1>
      <p className="mt-4 text-ink/60">The page you're looking for doesn't exist.</p>
      <div className="mt-8 flex justify-center">
        <Button to="/">Back to Home</Button>
      </div>
    </section>
  )
}
