import React, { useEffect, useRef } from 'react'

export default function WaveBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (ref.current) {
      ref.current.style.animationPlayState = mq.matches ? 'paused' : 'running'
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-paper"
    >
      <svg
        ref={ref}
        className="wave-svg absolute -left-[10%] -top-[10%] h-[130%] w-[130%]"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A24B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="creamLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EFE1C4" stopOpacity="0" />
            <stop offset="50%" stopColor="#EFE1C4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EFE1C4" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path className="wave-path wave-a" d="M -200 180 C 250 100, 550 260, 900 170 S 1550 140, 1900 220"
          stroke="url(#goldLine)" strokeWidth="1.5" fill="none" />
        <path className="wave-path wave-b" d="M -200 420 C 300 500, 600 340, 950 430 S 1500 520, 1900 400"
          stroke="url(#creamLine)" strokeWidth="2" fill="none" />
        <path className="wave-path wave-c" d="M -200 680 C 280 610, 620 760, 980 660 S 1560 590, 1900 700"
          stroke="url(#goldLine)" strokeWidth="1" fill="none" />
        <path className="wave-path wave-d" d="M -200 940 C 260 1020, 640 880, 1000 960 S 1540 1040, 1900 900"
          stroke="url(#creamLine)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
