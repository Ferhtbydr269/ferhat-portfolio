import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiChevronDown } from 'react-icons/fi'

const Scene3D = lazy(() => import('./Scene3D'))

const titles = [
  'Network Engineer Intern Candidate',
  'Full-Stack Developer',
  'Network Automation Enthusiast',
  'Computer Engineering Student',
  'Problem Solver',
]

function TypewriterText({ start }) {
  const [currentTitle, setCurrentTitle] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!start) return
    const fullText = titles[currentTitle]
    const speed = isDeleting ? 30 : 70

    if (!isDeleting && text === fullText) {
      const t = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(t)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setCurrentTitle((prev) => (prev + 1) % titles.length)
      return
    }

    const timer = setTimeout(() => {
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      )
    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, currentTitle, start])

  return (
    <span className="font-mono text-lg md:text-xl text-neon-purple">
      {text}
      <span className="animate-pulse text-neon-cyan">|</span>
    </span>
  )
}

export default function HeroSection({ ready }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const d = 0.3

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {!isMobile && (
        <Suspense fallback={null}>
          <Scene3D className="opacity-60" />
        </Suspense>
      )}

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ width: 0 }}
          animate={ready ? { width: '80px' } : {}}
          transition={{ delay: d, duration: 0.6 }}
          className="h-[1px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: d + 0.1, duration: 0.5 }}
          className="font-mono text-sm tracking-[0.3em] text-neon-cyan/70 mb-4 uppercase"
        >
          Merhaba, ben
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: d + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <span 
            className="glitch font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider"
            data-text="FERHAT BAYDIR"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FERHAT BAYDIR
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: d + 0.5, duration: 0.4 }}
          className="mt-6 h-8"
        >
          <TypewriterText start={ready} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: d + 0.7, duration: 0.5 }}
          className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base"
        >
          Ağ altyapısı, yönlendirme protokolleri ve network otomasyonuna odaklanıyorum.
          Yazılım geliştirme birikimimi kurumsal IT/Network tarafına taşıyorum.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: d + 0.9, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-3 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-[1px] bg-dark-900 rounded-[7px] group-hover:bg-dark-900/80 transition-colors" />
            <span className="relative text-white" style={{ color: '#fff' }}>Projelerimi Gör</span>
          </button>

          <a
            href="/Ferhat_Baydir_CV_01.pdf"
            download="Ferhat_Baydir_CV.pdf"
            className="group relative px-8 py-3 rounded-lg font-semibold text-sm border border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 inline-flex items-center"
          >
            CV İndir ↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: d + 1.1, duration: 0.5 }}
          className="mt-10 flex justify-center gap-5"
        >
          {[
            { icon: FiGithub, href: 'https://github.com/Ferhtbydr269', label: 'GitHub' },
            { icon: FiLinkedin, href: 'https://www.linkedin.com/in/ferhat-bayd%C4%B1r/', label: 'LinkedIn' },
            { icon: FiInstagram, href: 'https://www.instagram.com/ferhtbydr/', label: 'Instagram' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-xl border border-gray-800 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d + 1.3, duration: 0.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-500 hover:text-neon-cyan transition-colors cursor-pointer"
        aria-label="Aşağı kaydır"
      >
        <span className="text-xs font-mono tracking-widest mb-2 uppercase">Keşfet</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <FiChevronDown size={20} />
        </motion.div>
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-[5]" />


    </section>
  )
}
