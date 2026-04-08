import { useState, useEffect, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import MouseGlow from './components/MouseGlow'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import EducationSection from './components/EducationSection'
import CertificatesSection from './components/CertificatesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function App() {
  const [loading, setLoading] = useState(true)
  const [lightMode, setLightMode] = useState(false)
  const [easterEgg, setEasterEgg] = useState(false)
  const [konamiIndex, setKonamiIndex] = useState(0)

  const handleLoadingComplete = useCallback(() => setLoading(false), [])
  const toggleLightMode = useCallback(() => setLightMode(prev => !prev), [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === KONAMI[konamiIndex]) {
        const next = konamiIndex + 1
        if (next === KONAMI.length) {
          setEasterEgg(true)
          setKonamiIndex(0)
          setTimeout(() => setEasterEgg(false), 5000)
        } else {
          setKonamiIndex(next)
        }
      } else {
        setKonamiIndex(0)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [konamiIndex])

  return (
    <div className={`${lightMode ? 'light-mode' : ''} scanlines`}>
      <div className="mesh-bg" />

      {/* Loading screen -- sits ON TOP of content */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Everything below is always rendered, loading screen covers it */}
      <ParticleBackground />
      <MouseGlow />
      <Navbar lightMode={lightMode} toggleLightMode={toggleLightMode} />

      <main className="relative z-[1]">
        <HeroSection ready={!loading} />
        
        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
        </div>

        <AboutSection />

        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
        </div>

        <SkillsSection />

        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent" />
        </div>

        <ExperienceSection />

        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
        </div>

        <ProjectsSection />

        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
        </div>

        <EducationSection />

        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
        </div>

        <CertificatesSection />

        <div className="relative h-px max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent" />
        </div>

        <ContactSection />

        <Footer />
      </main>

      {/* Konami code Easter egg */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="easter-egg-overlay"
            onClick={() => setEasterEgg(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">🚀</div>
              <h2 
                className="font-display text-4xl md:text-6xl font-black mb-4"
                style={{
                  background: 'linear-gradient(135deg, #00f0ff, #a855f7, #f43f5e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                KONAMI CODE!
              </h2>
              <p className="text-gray-400 font-mono text-sm">
                Gizli kodu buldun! Sen gerçek bir geeksin 🎮
              </p>
              <p className="text-gray-600 font-mono text-xs mt-4">
                ↑ ↑ ↓ ↓ ← → ← → B A
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
