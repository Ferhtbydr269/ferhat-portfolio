import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiAward, FiExternalLink, FiShield, FiCpu, FiCode, FiStar, FiWifi, FiActivity } from 'react-icons/fi'

const certificates = [
  {
    title: 'Cisco CCNA: Introduction to Networks',
    subtitle: 'Devam Ediyor · Haz. 2026 Hedef',
    issuer: 'Cisco Networking Academy',
    icon: FiWifi,
    color: '#00f0ff',
    file: null,
    inProgress: true,
  },
  {
    title: 'Fortinet NSE 1 – 2 – 3',
    subtitle: 'Devam Ediyor',
    issuer: 'Fortinet Training Institute',
    icon: FiShield,
    color: '#f43f5e',
    file: null,
    inProgress: true,
  },
  {
    title: 'Huawei HCIA-Datacom',
    subtitle: 'Hedefleniyor · 2026',
    issuer: 'Huawei Talent Online',
    icon: FiActivity,
    color: '#34d399',
    file: null,
    inProgress: true,
  },
  {
    title: 'TEKNOFEST Yapay Zeka Film Yarışması',
    subtitle: 'Finalist',
    issuer: 'TEKNOFEST',
    icon: FiStar,
    color: '#fbbf24',
    file: '/sertifikalar/TEKNOFEST_Yapay_Zeka_Film_Yarismasi_Finalist.pdf',
  },
  {
    title: 'İleri Seviye Python Programlama Dili',
    subtitle: 'Sertifika',
    issuer: 'Eğitim Platformu',
    icon: FiCode,
    color: '#3776ab',
    file: '/sertifikalar/Ileri_Seviye_Python_Programlama_Dili_Sertifika.pdf',
  },
  {
    title: 'Kotlin Programlama Dili',
    subtitle: 'Sertifika',
    issuer: 'Eğitim Platformu',
    icon: FiCode,
    color: '#a855f7',
    file: '/sertifikalar/Kotlin_Programlama_Dili_Sertifika.pdf',
  },
  {
    title: 'Güvenli Yazılım Geliştirme',
    subtitle: 'Sertifika',
    issuer: 'Eğitim Platformu',
    icon: FiShield,
    color: '#00f0ff',
    file: '/sertifikalar/Guvenli_Yazilim_Gelistirme_Sertifika.pdf',
  },
  {
    title: 'Mobil Güvenlik ve Sızma Teknikleri',
    subtitle: 'Sertifika',
    issuer: 'Eğitim Platformu',
    icon: FiShield,
    color: '#f43f5e',
    file: '/sertifikalar/Mobil_Guvenlik_ve_Sizma_Teknikleri_Sertifika.pdf',
  },
  {
    title: 'Uygulamalı Sızma Testi',
    subtitle: 'Sertifika',
    issuer: 'Eğitim Platformu',
    icon: FiShield,
    color: '#34d399',
    file: '/sertifikalar/Uygulamali_Sizma_Testi_Sertifika.pdf',
  },
  {
    title: 'Angelman Sendromu Farkındalık',
    subtitle: 'Sertifika',
    issuer: 'Angelman',
    icon: FiAward,
    color: '#60a5fa',
    file: '/sertifikalar/Angelman_Sertifika.pdf',
  },
  {
    title: 'CurioSpace Katılımcı',
    subtitle: 'Katılım Sertifikası',
    issuer: 'CurioSpace',
    icon: FiCpu,
    color: '#e879f9',
    file: '/sertifikalar/CurioSpace_Katilimci_Sertifikasi.pdf',
  },
]

export default function CertificatesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certificates" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">06 — Sertifikalar</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            Sertifika & Başarılar
          </h2>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </motion.div>

        {/* Certificates grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, i) => {
            const Icon = cert.icon
            const Wrapper = cert.file ? motion.a : motion.div
            const wrapperProps = cert.file 
              ? { href: cert.file, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <Wrapper
                key={cert.title}
                {...wrapperProps}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group glass-card rounded-2xl p-5 relative overflow-hidden block ${cert.inProgress ? 'border border-dashed border-neon-cyan/20' : ''}`}
              >
                {/* Top accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                />

                {/* Icon */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}
                >
                  <Icon size={18} style={{ color: cert.color }} />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-neon-cyan transition-colors mb-1">
                  {cert.title}
                </h3>

                {/* Subtitle */}
                {!cert.inProgress && (
                  <p 
                    className="text-xs font-mono mb-3"
                    style={{ color: cert.color }}
                  >
                    {cert.subtitle}
                  </p>
                )}
                {cert.inProgress && <div className="mb-3" />}

                {/* View link */}
                {cert.inProgress ? (
                  <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: cert.color }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: cert.color }} />
                    <span>{cert.subtitle}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors">
                    <FiExternalLink size={10} />
                    <span>Sertifikayı Gör</span>
                  </div>
                )}

                {/* Hover glow */}
                <div 
                  className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: cert.color }}
                />
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
