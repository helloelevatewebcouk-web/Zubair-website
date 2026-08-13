import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WaveBackground from './components/WaveBackground.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Approach from './pages/Approach.jsx'
import Book from './pages/Book.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <WaveBackground />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-approach" element={<Approach />} />
          <Route path="/book-appointment" element={<Book />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
