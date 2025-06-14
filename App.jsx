import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'light'
  })
  
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold">
            vasil.dev
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button 
              className="md:hidden theme-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 border-t">
            <div className="px-4 py-2 space-y-1">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-4 py-2 rounded nav-link ${
                    activeSection === id ? 'active' : ''
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero" className="section bg-hero">
          <div className="section-content text-white">
            <h1 className="section-title animate-slide-up">
              Very
            </h1>
            <p className="section-subtitle animate-fade-in">
              Simple Portfolio
            </p>
            <div className="scroll-indicator">
              <span>scroll down</span>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section bg-about">
          <div className="section-content text-white">
            <h2 className="section-title">
              About
            </h2>
            <p className="section-subtitle">
              Who I am
            </p>
            <div className="scroll-indicator">
              <span>scroll down</span>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section bg-skills">
          <div className="section-content text-white">
            <h2 className="section-title">
              Skills
            </h2>
            <p className="section-subtitle">
              What I do
            </p>
            <div className="scroll-indicator">
              <span>scroll down</span>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="section bg-work">
          <div className="section-content text-black">
            <h2 className="section-title">
              Work
            </h2>
            <p className="section-subtitle">
              What I've built
            </p>
            <div className="scroll-indicator">
              <span>scroll down</span>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section bg-contact">
          <div className="section-content text-black">
            <h2 className="section-title">
              Contact
            </h2>
            <p className="section-subtitle">
              Let's work together
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App 