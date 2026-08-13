import React from 'react'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

const steps = [
  { n: '01', title: 'Research', copy: 'Identify products and opportunities using careful research and analysis.' },
  { n: '02', title: 'Evaluate', copy: 'Assess potential opportunities based on demand, competition, costs and practicality.' },
  { n: '03', title: 'Operate', copy: 'Manage listings, inventory and day-to-day business requirements efficiently.' },
  { n: '04', title: 'Optimise', copy: 'Review performance and look for opportunities to improve.' },
  { n: '05', title: 'Grow', copy: 'Build on what works while maintaining a disciplined approach.' }
]

export default function Approach() {
  useDocumentTitle(
    'Our Approach | Zubair Enterprises Ltd',
    'A practical approach to Amazon FBA: identifying opportunities, operating efficiently and continuously improving.'
  )

  return (
    <>
      <section className="section pt-40 md:pt-48 pb-16">
        <Reveal>
          <p className="eyebrow">Our Approach</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold uppercase leading-tight text-ink">
            A practical approach<br />to Amazon FBA.
          </h1>
          <p className="mt-6 max-w-2xl text-ink/65 leading-relaxed">
            Focused on identifying opportunities, operating efficiently and continuously improving.
          </p>
        </Reveal>
      </section>

      <section className="section py-16 md:py-20">
        <div className="border-t border-line">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 80} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10 border-b border-line py-8">
              <span className="font-display text-3xl md:text-4xl font-extrabold text-gold shrink-0 md:w-20">
                {step.n}
              </span>
              <span className="font-display text-xl md:text-2xl font-bold uppercase text-ink md:w-48 shrink-0">
                {step.title}
              </span>
              <span className="text-ink/60 leading-relaxed">{step.copy}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section py-20 md:py-28 bg-cream/40">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Why It Matters</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold uppercase text-ink">
            Efficiency is part of the strategy.
          </h2>
          <p className="mt-6 text-ink/65 leading-relaxed">
            Operating alongside a full-time career requires structured time management,
            clear prioritisation and efficient decision-making at every stage.
          </p>
        </Reveal>
      </section>

      <section className="section pt-0 pb-28">
        <Reveal className="border border-ink px-8 py-16 md:py-20 text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-ink">
            Have an opportunity<br />worth discussing?
          </h2>
          <div className="mt-8">
            <Button to="/book-appointment">Book an Appointment</Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
