import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'

const experiences = [
  {
    title: 'Proje Koordinasyon Uygulama ve Araştırma Merkezi',
    company: 'Manisa Celal Bayar Üniversitesi',
    duration: '1 Yıl',
    status: 'Tamamlandı',
    description: 'Proje koordinasyon süreçlerinde aktif görev aldım. Araştırma merkezi bünyesinde yazılım ve veri odaklı projelere destek verdim. Kurumsal ortamda çalışma disiplini, proje yönetimi ve ekip içi iletişim konusunda önemli deneyimler edindim.',
    tags: ['Proje Yönetimi', 'Araştırma', 'Yazılım Desteği', 'Veri Analizi'],
    color: '#00f0ff',
  },
  {
    title: 'Freelance Dijital Pazarlama Uzmanı',
    company: 'Bağımsız',
    duration: 'Devam Ediyor',
    status: 'Aktif',
    description: 'Google Ads ve Meta Ads platformlarında reklam kampanyaları oluşturma, yönetme ve optimize etme. Müşteri portföyü yönetimi, bütçe planlaması, A/B testleri ve performans raporlaması. Birden fazla sektörde aktif kampanya deneyimi.',
    tags: ['Google Ads', 'Meta Ads', 'A/B Test', 'Performans Raporlama', 'SEO'],
    color: '#a855f7',
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">03 — Deneyim</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            İş Deneyimim
          </h2>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="w-full h-full bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink"
            />
          </div>

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.3, duration: 0.7 }}
              className={`relative mb-16 last:mb-0 ${
                i % 2 === 0 
                  ? 'md:pr-[calc(50%+2rem)] md:text-right' 
                  : 'md:pl-[calc(50%+2rem)] md:text-left'
              } pl-16 md:pl-0`}
            >
              {/* Timeline dot */}
              <div 
                className={`absolute top-6 w-4 h-4 rounded-full border-2 z-10 left-[17px] md:left-1/2 md:-translate-x-1/2`}
                style={{
                  borderColor: exp.color,
                  background: '#030014',
                  boxShadow: `0 0 15px ${exp.color}60, 0 0 30px ${exp.color}20`
                }}
              >
                <div 
                  className="absolute inset-1 rounded-full animate-pulse"
                  style={{ background: exp.color }}
                />
              </div>

              {/* Card */}
              <div className="glass-card rounded-2xl p-6 group hover:border-opacity-30 transition-all duration-500"
                style={{ borderColor: `${exp.color}20` }}
              >
                {/* Status badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 ${
                  exp.status === 'Aktif' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                }`}>
                  {exp.status === 'Aktif' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                  {exp.status}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{exp.title}</h3>
                
                <div className={`flex flex-wrap gap-3 text-xs text-gray-400 mb-4 ${
                  i % 2 === 0 ? 'md:justify-end' : ''
                }`}>
                  <span className="flex items-center gap-1">
                    <FiBriefcase size={12} style={{ color: exp.color }} />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} style={{ color: exp.color }} />
                    {exp.duration}
                  </span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">{exp.description}</p>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                  {exp.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono"
                      style={{ 
                        background: `${exp.color}10`,
                        color: exp.color,
                        border: `1px solid ${exp.color}20`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover glow */}
                <div 
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${exp.color}05, transparent, ${exp.color}05)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
