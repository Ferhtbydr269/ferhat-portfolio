import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi'

const projects = [
  {
    name: 'Kurumsal Ağ Tasarımı',
    tech: 'Cisco Packet Tracer',
    tags: ['Network', 'VLAN', 'OSPF'],
    desc: '3 şubeli kurumsal ağ — VLAN segmentasyonu, inter-VLAN routing, OSPF ve site-to-site VPN simülasyonu. ACL politikaları + IP planı dokümantasyonu.',
    color: '#00f0ff',
    category: 'network',
    github: 'https://github.com/Ferhtbydar269',
    isNetworkLab: true,
  },
  {
    name: 'Network Automation Script',
    tech: 'Python + Netmiko',
    tags: ['Network', 'Python', 'Automation'],
    desc: 'Cisco cihazlarına SSH üzerinden toplu VLAN ve interface konfigürasyonu dağıtan Python aracı. Hata yönetimi ve otomatik log kaydı içeriyor.',
    color: '#a855f7',
    category: 'network',
    github: 'https://github.com/Ferhtbydar269',
    isNetworkLab: true,
  },
  {
    name: 'Wireshark Trafik Analizi',
    tech: 'Wireshark + Python',
    tags: ['Network', 'Security', 'Analysis'],
    desc: 'Yerel ağ trafiğini Wireshark ile yakalama ve analiz etme; ARP, DNS, HTTP paketlerini inceleme ve anormallik raporu.',
    color: '#34d399',
    category: 'network',
    github: 'https://github.com/Ferhtbydar269',
    isNetworkLab: true,
  },
  {
    name: 'bursa_pinar_temizlik',
    tech: 'TypeScript',
    tags: ['TypeScript', 'Web'],
    desc: 'Profesyonel temizlik şirketi web sitesi — kurumsal düzeyde tam fonksiyonel site',
    color: '#3178c6',
    category: 'typescript',
  },
  {
    name: 'elifbeauty',
    tech: 'HTML/CSS',
    tags: ['HTML', 'CSS'],
    desc: 'Güzellik salonu web sitesi — responsive tasarım, modern UI',
    color: '#e34c26',
    category: 'html',
  },
  {
    name: 'Linka_social_platform',
    tech: 'Python (Django)',
    tags: ['Python', 'Django'],
    desc: 'Sosyal medya platformu — kullanıcı kayıt, profil, paylaşım sistemi',
    color: '#3776ab',
    category: 'python',
  },
  {
    name: 'mockUp_design',
    tech: 'HTML/CSS',
    tags: ['HTML', 'CSS', 'UI/UX'],
    desc: 'Mockup tasarım çalışmaları — UI/UX pratiği',
    color: '#e34c26',
    category: 'html',
  },
  {
    name: 'OOP_super_example_student_system',
    tech: 'Python',
    tags: ['Python', 'OOP'],
    desc: 'Nesne yönelimli programlama ile öğrenci yönetim sistemi',
    color: '#3776ab',
    category: 'python',
  },
  {
    name: 'GetTicket_Events_Django',
    tech: 'Python (Django)',
    tags: ['Python', 'Django'],
    desc: 'Etkinlik yönetim ve online bilet rezervasyon sistemi',
    color: '#3776ab',
    category: 'python',
  },
  {
    name: 'flora_qr',
    tech: 'HTML/JS',
    tags: ['HTML', 'JavaScript'],
    desc: 'QR kod oluşturucu web uygulaması',
    color: '#f7df1e',
    category: 'javascript',
  },
  {
    name: 'fastApp',
    tech: 'Python (FastAPI)',
    tags: ['Python', 'FastAPI'],
    desc: 'FastAPI ile hızlı REST API geliştirme projesi',
    color: '#3776ab',
    category: 'python',
  },
  {
    name: 'sayac',
    tech: 'HTML/JS',
    tags: ['HTML', 'JavaScript'],
    desc: 'İnteraktif sayaç uygulaması',
    color: '#f7df1e',
    category: 'javascript',
  },
  {
    name: 'qr_frontend',
    tech: 'JavaScript/React',
    tags: ['JavaScript', 'React'],
    desc: 'QR kod okuyucu frontend uygulaması',
    color: '#61dafb',
    category: 'javascript',
  },
  {
    name: 'motiveX',
    tech: 'JavaScript/React',
    tags: ['JavaScript', 'React'],
    desc: 'Motivasyon ve kişisel gelişim uygulaması',
    color: '#61dafb',
    category: 'javascript',
  },
  {
    name: 'TagMee',
    tech: 'JavaScript',
    tags: ['JavaScript'],
    desc: 'Etiketleme ve kategorizasyon aracı',
    color: '#f7df1e',
    category: 'javascript',
  },
]

const filters = [
  { key: 'all', label: 'Tümü' },
  { key: 'network', label: '🌐 Network' },
  { key: 'python', label: 'Python' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'html', label: 'HTML/CSS' },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 })

  const handleMouse = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 })
    setGlare({ x: x * 100, y: y * 100, o: 0.1 })
  }

  const reset = () => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, o: 0 })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="relative glass-card rounded-2xl overflow-hidden group cursor-pointer h-full"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Top color accent */}
        <div 
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${project.color}80, ${project.color})` }}
        />

        {/* Glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 60%)`,
          }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div 
              className="p-2.5 rounded-xl"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}
            >
              <FiFolder size={20} style={{ color: project.color }} />
            </div>
            <a
              href={`https://github.com/Ferhtbydr269/${project.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
              aria-label={`${project.name} GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub size={18} />
            </a>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors flex items-center gap-2 flex-wrap">
            {project.name.replace(/_/g, ' ')}
            {project.isNetworkLab && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-neon-cyan/40 text-neon-cyan/70 bg-neon-cyan/5">
                NET LAB
              </span>
            )}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
            {project.desc}
          </p>

          {/* Tech badge */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono"
                style={{ 
                  background: `${project.color}10`, 
                  color: `${project.color}cc`,
                  border: `1px solid ${project.color}20`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover border glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${project.color}08, 0 0 20px ${project.color}10`
          }}
        />
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">04 — Projeler</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            GitHub Projelerim
          </h2>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === f.key
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600'
              }`}
            >
              {activeFilter === f.key && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Ferhtbydr269"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-gray-400 border border-gray-800 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
          >
            <FiGithub size={16} />
            Tüm projelerimi GitHub'da gör
            <FiExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
