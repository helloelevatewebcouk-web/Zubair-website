import React from 'react'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import AnimatedNumber from '../components/AnimatedNumber.jsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

export default function Home() {
  useDocumentTitle(
    'Zubair Enterprises Ltd | Amazon FBA',
    'Zubair Enterprises Ltd is an independently built Amazon FBA business focused on efficient operations, consistent growth and long-term opportunity.'
  )
  return (
    <>
      {/* HERO */}
      <section className="section pt-40 md:pt-48 pb-24">
        <p className="eyebrow animate-fadeUp" style={{ animationDelay: '0ms' }}>Amazon FBA · Independently Built</p>

        <h1
          className="mt-5 text-4xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase leading-[1.05] tracking-tight text-ink animate-fadeUp"
          style={{ animationDelay: '90ms' }}
        >
          Building smarter.<br />Selling with purpose.
        </h1>

        <p
          className="mt-7 max-w-2xl text-base md:text-lg text-ink/65 animate-fadeUp"
          style={{ animationDelay: '180ms' }}
        >
          Zubair Enterprises Ltd is an independently built Amazon FBA business focused on
          efficient operations, consistent growth and long-term opportunity.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 animate-fadeUp" style={{ animationDelay: '260ms' }}>
          <span className="text-sm font-semibold text-ink border border-line px-4 py-2">
            400+ items sold
          </span>
          <span className="text-sm text-ink/50">Built alongside a full-time career. Driven by ambition.</span>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 animate-fadeUp" style={{ animationDelay: '340ms' }}>
          <Button to="/book-appointment">Book an Appointment</Button>
          <Button to="/our-approach" variant="secondary">Our Approach</Button>
        </div>
      </section>

      {/* CREDIBILITY / STATS */}
      <section className="section pt-0 pb-20 md:pb-28">
        <div className="grid gap-8 sm:grid-cols-3 border-t border-line pt-14">
          <Reveal className="text-center sm:text-left">
            <p className="text-4xl md:text-5xl font-display font-extrabold text-ink">
              <AnimatedNumber value={400} suffix="+" />
            </p>
            <p className="mt-2 text-sm text-ink/60">Items Sold</p>
          </Reveal>
          <Reveal delay={120} className="text-center sm:text-left">
            <p className="text-4xl md:text-5xl font-display font-extrabold text-ink">Full-Time</p>
            <p className="mt-2 text-sm text-ink/60">Business Built Alongside a Full-Time Career</p>
          </Reveal>
          <Reveal delay={240} className="text-center sm:text-left">
            <p className="text-4xl md:text-5xl font-display font-extrabold text-ink">Amazon FBA</p>
            <p className="mt-2 text-sm text-ink/60">Focused on Efficient E-Commerce Operations</p>
          </Reveal>
        </div>
      </section>

      {/* INTRO TO FBA */}
      <section className="section py-20 md:py-28 bg-cream/40">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="eyebrow">The Business</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold uppercase leading-tight text-ink">
              Built around opportunity.<br />Driven by execution.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-ink/65 leading-relaxed">
              Amazon FBA provides the infrastructure to sell products through Amazon, while
              Zubair Enterprises Ltd focuses on the parts that matter most: product selection,
              sourcing, day-to-day operations, customer experience and sustainable growth.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TRUST */}
      <section className="section py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Why It Works</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold uppercase leading-tight text-ink">
            A business built on consistency.
          </h2>
          <p className="mt-6 text-ink/65 leading-relaxed">
            Zubair Enterprises Ltd has been developed alongside a full-time career — a discipline
            that shapes how the business operates day to day.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Commitment', 'Consistency', 'Organisation', 'Long-Term Thinking'].map((item, i) => (
            <Reveal key={item} delay={i * 90} className="card">
              <p className="font-display font-bold text-ink">{item}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0 pb-28">
        <Reveal className="border border-ink px-8 py-16 md:py-20 text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-ink">
            Let's talk business.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-ink/60">
            Have an opportunity, question or business enquiry? Arrange a conversation with
            Zubair Enterprises Ltd.
          </p>
          <div className="mt-8">
            <Button to="/book-appointment">Book an Appointment</Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
