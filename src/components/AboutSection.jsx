import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCode, FiDatabase, FiTrendingUp, FiGlobe } from 'react-icons/fi'

const highlights = [
  { icon: FiCode, label: 'Full-Stack', desc: 'Web Geliştirme' },
  { icon: FiDatabase, label: 'Data', desc: 'Veri Analizi' },
  { icon: FiTrendingUp, label: 'Ads', desc: 'Dijital Pazarlama' },
  { icon: FiGlobe, label: 'AI', desc: 'Yapay Zeka Araçları' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">01 — Hakkımda</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            Ben Kimim?
          </h2>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 z-0" />
              
              {/* Photo frame */}
              <div className="relative z-10 w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden border-2 border-neon-cyan/20 group-hover:border-neon-cyan/40 transition-all duration-500">
                <img 
                  src="/profil_photo.png" 
                  alt="Ferhat Baydır" 
                  className="w-full h-full object-cover object-top"
                />

                {/* Subtle dark overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent z-10" />

                {/* Scan line effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                  style={{
                    background: 'linear-gradient(transparent 50%, rgba(0,240,255,0.03) 50%)',
                    backgroundSize: '100% 4px',
                  }}
                />

                {/* Corner accents */}
                <svg className="absolute top-2 left-2 w-6 h-6 text-neon-cyan/40 z-20" viewBox="0 0 24 24" fill="none">
                  <path d="M0 8V0H8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <svg className="absolute bottom-2 right-2 w-6 h-6 text-neon-cyan/40 rotate-180 z-20" viewBox="0 0 24 24" fill="none">
                  <path d="M0 8V0H8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Floating status badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-3 -right-3 px-4 py-2 rounded-lg glass border border-neon-cyan/30"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-neon-cyan">Açık İşe</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-3"
          >
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              Ben <span className="text-neon-cyan font-semibold">Ferhat</span>. Kod yazmayı, veri analiz etmeyi ve 
              dijital dünyada iz bırakmayı seviyorum. Sadece yazılım geliştirmekle kalmıyor, aynı zamanda 
              <span className="text-neon-purple font-semibold"> dijital pazarlama</span>, 
              <span className="text-neon-pink font-semibold"> yapay zeka araçları</span> ve güncel teknolojileri 
              aktif olarak takip edip projelerime entegre ediyorum.
            </p>
            
            <p className="mt-4 text-gray-400 leading-relaxed">
              Sürekli öğrenen, kendini güncelleyen bir mühendis adayıyım. 
              Hedefim: teknolojiyle gerçek dünya problemlerini çözmek.
            </p>

            <p className="mt-4 text-gray-400 leading-relaxed">
              <span className="text-neon-cyan">Manisa Celal Bayar Üniversitesi</span>'nde 
              Bilgisayar Mühendisliği 3. sınıf öğrencisiyim. Hem teknik yazılım tarafında hem de 
              iş dünyası (dijital pazarlama) tarafında aktif deneyimim var.
            </p>

            {/* Highlight cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="glass-card rounded-xl p-4 text-center group cursor-default"
                >
                  <Icon className="mx-auto text-neon-cyan group-hover:text-neon-purple transition-colors" size={22} />
                  <p className="mt-2 text-xs font-bold text-white">{label}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
