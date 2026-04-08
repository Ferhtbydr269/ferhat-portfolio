import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiHeart, FiCoffee, FiArrowUp } from 'react-icons/fi'

const links = [
  { id: 'hero', label: 'Ana Sayfa' },
  { id: 'about', label: 'Hakkımda' },
  { id: 'skills', label: 'Beceriler' },
  { id: 'projects', label: 'Projeler' },
  { id: 'contact', label: 'İletişim' },
]

const socials = [
  { icon: FiGithub, href: 'https://github.com/Ferhtbydr269', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/ferhat-bayd%C4%B1r/', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://www.instagram.com/ferhtbydr/', label: 'Instagram' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-gray-800/50 pt-16 pb-8 px-6">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              FB
            </span>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Kod yazmayı, veri analiz etmeyi ve dijital dünyada iz bırakmayı seviyorum. 
              Teknolojiyle gerçek dünya problemlerini çözüyorum.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">Hızlı Linkler</h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-gray-500 hover:text-neon-cyan transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">Sosyal Medya</h4>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg border border-gray-800 text-gray-500 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono flex items-center gap-1.5">
            &copy; 2025 Ferhat Baydır — Coded with 
            <FiHeart size={12} className="text-neon-pink" /> 
            and 
            <FiCoffee size={12} className="text-neon-cyan" />
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-gray-600 hover:text-neon-cyan transition-colors font-mono"
          >
            Başa Dön
            <span className="p-1.5 rounded-lg border border-gray-800 group-hover:border-neon-cyan/30 transition-colors">
              <FiArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
