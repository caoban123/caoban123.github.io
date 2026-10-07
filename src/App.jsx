import React from 'react'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { Spotlight } from './components/ui/Spotlight'
import { Cursor } from './components/ui/Cursor'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/hero/Hero'
import { About } from './components/about/About'
import { Projects } from './components/projects/Projects'
import { Research } from './components/research/Research'
import { Skills } from './components/skills/Skills'
import { Experience } from './components/experience/Experience'
import { Contact } from './components/contact/Contact'
import { Footer } from './components/layout/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-accent-blue/30 selection:text-white overflow-x-hidden">
        {/* Subtle Ambient Mouse Spotlight */}
        <Spotlight />

        {/* Custom Circular Cursor for Desktop */}
        <Cursor />

        {/* Navigation Bar */}
        <Navbar />

        {/* Page Sections */}
        <main className="relative z-10 flex flex-col">
          <Hero />
          <About />
          <Projects />
          <Research />
          <Skills />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  )
}
