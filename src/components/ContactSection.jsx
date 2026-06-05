import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi'

const links = [
  {
    icon: FiMail,
    label: 'E-posta',
    value: 'ferhatbaydir7@gmail.com',
    href: 'mailto:ferhatbaydir7@gmail.com',
    color: '#00f0ff',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ferhat-baydır',
    href: 'https://www.linkedin.com/in/ferhat-bayd%C4%B1r/',
    color: '#a855f7',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/Ferhtbydr269',
    href: 'https://github.com/Ferhtbydr269',
    color: '#f43f5e',
  },
]

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">07 — İletişim</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            Bana Ulaş
          </h2>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
          <p className="mt-6 text-gray-400 max-w-xl mx-auto leading-relaxed">
            Network / IT stajı için açığım. Beni ekibinize katmak veya ağ altyapısı hakkında konuşmak
            isterseniz mesaj atmaktan çekinmeyin.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {links.map(({ icon: Icon, label, value, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 group relative overflow-hidden block text-center"
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `${color}12`, border: `1px solid ${color}25` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <p className="text-xs font-mono text-gray-500 mb-1">{label}</p>
              <p className="text-sm font-medium text-white group-hover:text-neon-cyan transition-colors break-all">
                {value}
              </p>
              {/* Hover glow */}
              <div
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: color }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <a
            href="mailto:ferhatbaydir7@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-[1px] bg-dark-900 rounded-[11px] group-hover:bg-dark-900/80 transition-colors" />
            <span className="relative flex items-center gap-2 text-white">
              <FiSend size={16} />
              Staj Teklifi Gönder
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
