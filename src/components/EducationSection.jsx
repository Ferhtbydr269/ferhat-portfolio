import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBook, FiAward, FiGlobe } from 'react-icons/fi'

export default function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">05 — Eğitim</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            Eğitim Hayatım
          </h2>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </motion.div>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10 group overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* University icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/20 flex items-center justify-center">
                    <FiBook size={32} className="text-neon-cyan" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2 rounded-2xl border border-dashed border-neon-cyan/10"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                    Devam Ediyor
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                    3. Sınıf
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mt-3">
                  Bilgisayar Mühendisliği
                </h3>
                <p className="text-lg text-neon-cyan/80 font-medium mt-1">
                  Manisa Celal Bayar Üniversitesi
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/50 border border-gray-800/50">
                    <FiAward className="text-neon-purple mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-white">Bilgisayar Mühendisliği</p>
                      <p className="text-xs text-gray-400 mt-1">Lisans programı, aktif öğrenci</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/50 border border-gray-800/50">
                    <FiGlobe className="text-neon-cyan mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-white">İngilizce Hazırlık</p>
                      <p className="text-xs text-gray-400 mt-1">B1-B2 düzeyinde tamamlandı</p>
                    </div>
                  </div>
                </div>

                {/* Extra strengths */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5 border border-neon-cyan/10">
                  <p className="text-xs font-mono text-neon-cyan/60 uppercase tracking-wider mb-3">Ek Güçlü Yönlerim</p>
                  <ul className="space-y-2">
                    {[
                      'Yapay zeka araçlarını iş akışına entegre etme konusunda ileri düzey deneyim',
                      'Güncel teknoloji trendlerini ve etkinlikleri sürekli takip',
                      'Hem teknik hem de iş dünyası tarafında aktif deneyim',
                      'Müşteri odaklı çalışma ve sonuç üretme becerisi',
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-gray-400"
                      >
                        <span className="w-1 h-1 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
