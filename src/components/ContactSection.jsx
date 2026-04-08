import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiInstagram, FiGithub, FiSend, FiMapPin } from 'react-icons/fi'

const contactInfo = [
  { icon: FiMail, label: 'E-posta', value: 'ferhatbaydir7@gmail.com', href: 'mailto:ferhatbaydir7@gmail.com', color: '#00f0ff' },
  { icon: FiPhone, label: 'Telefon', value: '0534 655 55 14', href: 'tel:+905346555514', color: '#a855f7' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'Ferhat Baydır', href: 'https://www.linkedin.com/in/ferhat-bayd%C4%B1r/', color: '#0077b5' },
  { icon: FiInstagram, label: 'Instagram', value: '@ferhtbydr', href: 'https://www.instagram.com/ferhtbydr/', color: '#e4405f' },
  { icon: FiGithub, label: 'GitHub', value: 'Ferhtbydr269', href: 'https://github.com/Ferhtbydr269', color: '#ffffff' },
]

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">06 — İletişim</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            Benimle İletişime Geç
          </h2>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            Bir proje fikrin mi var? İş birliği yapmak mı istiyorsun? Bana ulaş!
          </p>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FiMapPin className="text-neon-cyan" size={18} />
                <div>
                  <p className="text-sm font-semibold text-white">Konum</p>
                  <p className="text-xs text-gray-400">Türkiye</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Uzaktan çalışmaya açığım. Proje bazlı veya tam zamanlı iş teklifleri için bana ulaşabilirsiniz.
              </p>
            </div>

            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="group flex items-center gap-4 p-4 rounded-xl glass-card"
                >
                  <div 
                    className="p-2.5 rounded-lg"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono">{item.label}</p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    İsim
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-800/80 border border-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                    E-posta
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-800/80 border border-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all"
                    placeholder="mail@ornek.com"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark-800/80 border border-gray-800 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all resize-none"
                  placeholder="Mesajınızı yazın..."
                />
              </div>

              <button
                type="submit"
                className="group relative w-full px-8 py-3.5 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-[1px] bg-dark-900 rounded-[7px] group-hover:bg-dark-900/80 transition-colors" />
                <span className="relative flex items-center justify-center gap-2 text-white">
                  {submitted ? (
                    'Mesaj Gönderildi! ✓'
                  ) : (
                    <>
                      Gönder
                      <FiSend size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              <p className="mt-4 text-[10px] text-gray-600 text-center font-mono">
                * Bu form henüz bir backend'e bağlı değil. Doğrudan e-posta ile iletişime geçebilirsiniz.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
