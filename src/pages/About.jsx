import React from 'react'
import Reveal from '../components/Reveal.jsx'
import AnimatedNumber from '../components/AnimatedNumber.jsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

const values = [
  { title: 'Discipline', copy: 'Maintaining consistency while balancing business with professional responsibilities.' },
  { title: 'Efficiency', copy: 'Making informed decisions and using time and resources effectively.' },
  { title: 'Reliability', copy: 'Building trust through professionalism and clear communication.' },
  { title: 'Growth', copy: 'Continuously looking for opportunities to improve and develop.' }
]

export default function About() {
  useDocumentTitle(
    'About | Zubair Enterprises Ltd',
    'Zubair Enterprises Ltd represents a commitment to building a sustainable business through consistency, efficiency and long-term thinking.'
  )

  return (
    <>
      <section className="section pt-40 md:pt-48 pb-20">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold uppercase leading-tight text-ink">
            Built with discipline.
          </h1>
          <p className="mt-6 max-w-2xl text-ink/65 leading-relaxed">
            Zubair Enterprises Ltd represents a commitment to building a sustainable business
            through consistency, efficiency and long-term thinking.
          </p>
        </Reveal>
      </section>

      <section className="section py-16 md:py-20 bg-cream/40">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">The Story</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold uppercase text-ink">
            Evidence in the numbers, not the noise.
          </h2>
          <p className="mt-6 text-ink/65 leading-relaxed">
            The business has generated over 400 item sales while being operated alongside a
            full-time job. It isn't a large corporation — it's a measured, honest example of
            discipline, organisation and an entrepreneurial mindset applied consistently over time.
          </p>
        </Reveal>
      </section>

      <section className="section py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Values</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold uppercase text-ink">
            What guides the work.
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="card">
              <p className="font-display font-bold uppercase text-ink tracking-tight">{v.title}</p>
              <p className="mt-3 text-sm text-ink/60 leading-relaxed">{v.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0 pb-28">
        <Reveal className="border border-ink px-8 py-16 md:py-20 text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="text-5xl md:text-7xl font-display font-extrabold text-ink">
            <AnimatedNumber value={400} suffix="+" />
          </p>
          <p className="mt-2 eyebrow">Items Sold</p>
          <p className="mt-6 max-w-md mx-auto text-ink/60">
            A measurable milestone built through consistent execution and commitment.
          </p>
        </Reveal>
      </section>
    </>
  )
}
