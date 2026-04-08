import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => {
        onComplete()
        setPhase(3)
      }, 2000),
      setTimeout(() => setVisible(false), 2800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  if (!visible) return null

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-dark-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Scan line overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.03) 2px, rgba(0,240,255,0.03) 4px)'
            }}
          />

          {/* Radial glow behind logo */}
          <motion.div
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase >= 1 ? [0, 1.5, 1] : 0, 
              opacity: phase >= 1 ? [0, 0.6, 0.3] : 0 
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Orbiting rings */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: phase >= 1 ? 0.4 : 0, rotate: 360 }}
            transition={{ 
              opacity: { duration: 0.4 },
              rotate: { duration: 8, ease: 'linear', repeat: Infinity }
            }}
          >
            <div className="w-48 h-48 rounded-full border border-neon-cyan/30" 
              style={{ transform: 'rotateX(60deg)' }} 
            />
          </motion.div>

          <motion.div
            className="absolute"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: phase >= 1 ? 0.3 : 0, rotate: -360 }}
            transition={{ 
              opacity: { duration: 0.4 },
              rotate: { duration: 12, ease: 'linear', repeat: Infinity }
            }}
          >
            <div className="w-64 h-64 rounded-full border border-neon-purple/20" 
              style={{ transform: 'rotateX(75deg) rotateY(15deg)' }} 
            />
          </motion.div>

          {/* Main logo text */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
              animate={{ 
                opacity: phase >= 1 ? 1 : 0, 
                scale: phase >= 1 ? 1 : 0.5,
                filter: phase >= 1 ? 'blur(0px)' : 'blur(20px)'
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-7xl md:text-8xl font-black tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #00f0ff, #a855f7, #f43f5e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(0,240,255,0.4))',
              }}
            >
              FB
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mt-4 font-mono text-sm tracking-[0.3em] text-neon-cyan/70"
            >
              FERHAT BAYDIR
            </motion.div>

            {/* Loading bar */}
            <motion.div 
              className="mt-8 w-48 h-[2px] bg-dark-700 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00f0ff, #a855f7, #f43f5e)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>

          {/* Corner decorations */}
          {[
            'top-8 left-8',
            'top-8 right-8 rotate-90',
            'bottom-8 left-8 -rotate-90',
            'bottom-8 right-8 rotate-180'
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 0.3 : 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M0 20V0H20" stroke="#00f0ff" strokeWidth="1" />
                <circle cx="0" cy="0" r="2" fill="#00f0ff" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
