import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  FiServer, FiLayout, FiBarChart2, FiTarget, 
  FiTool, FiUsers, FiWifi, FiTerminal
} from 'react-icons/fi'

const skillCategories = [
  {
    title: 'Network & Altyapı',
    icon: FiWifi,
    color: '#00f0ff',
    skills: [
      { name: 'TCP/IP & OSI Modeli', level: 75 },
      { name: 'VLAN / STP / Inter-VLAN', level: 65 },
      { name: 'OSPF / EIGRP / RIP', level: 60 },
      { name: 'Cisco IOS CLI', level: 65 },
      { name: 'Wireshark / Nmap', level: 65 },
      { name: 'Linux Ağ Yönetimi', level: 60 },
    ]
  },
  {
    title: 'Network Otomasyon',
    icon: FiTerminal,
    color: '#a855f7',
    skills: [
      { name: 'Python (Netmiko)', level: 65 },
      { name: 'Python (Paramiko)', level: 60 },
      { name: 'Bash / PowerShell', level: 55 },
      { name: 'Packet Tracer / GNS3', level: 70 },
      { name: 'pfSense / Firewall', level: 50 },
      { name: 'DHCP / DNS / NAT', level: 65 },
    ]
  },
  {
    title: 'Backend & Frameworks',
    icon: FiServer,
    color: '#00f0ff',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Django', level: 80 },
      { name: 'Flask', level: 75 },
      { name: 'FastAPI', level: 70 },
      { name: 'Node.js', level: 65 },
      { name: 'REST API', level: 80 },
    ]
  },
  {
    title: 'Frontend',
    icon: FiLayout,
    color: '#a855f7',
    skills: [
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'React.js', level: 75 },
      { name: 'TypeScript', level: 65 },
      { name: 'Responsive Design', level: 85 },
    ]
  },
  {
    title: 'Veri & Yapay Zeka',
    icon: FiBarChart2,
    color: '#f43f5e',
    skills: [
      { name: 'Pandas / NumPy', level: 75 },
      { name: 'Veri Görselleştirme', level: 70 },
      { name: 'Machine Learning', level: 50 },
      { name: 'AI Araçları', level: 90 },
    ]
  },
  {
    title: 'Dijital Pazarlama',
    icon: FiTarget,
    color: '#fbbf24',
    skills: [
      { name: 'Google Ads', level: 90 },
      { name: 'Meta Ads', level: 85 },
      { name: 'Kampanya Yönetimi', level: 85 },
      { name: 'SEO', level: 65 },
    ]
  },
  {
    title: 'Araçlar & Platformlar',
    icon: FiTool,
    color: '#34d399',
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'VS Code / Cursor', level: 90 },
      { name: 'Linux', level: 60 },
      { name: 'Figma', level: 50 },
    ]
  },
  {
    title: 'Soft Skills',
    icon: FiUsers,
    color: '#60a5fa',
    skills: [
      { name: 'Hızlı Öğrenme', level: 95 },
      { name: 'Problem Çözme', level: 85 },
      { name: 'Takım Çalışması', level: 85 },
      { name: 'Sürekli Gelişim', level: 90 },
    ]
  }
]

function SkillBar({ name, level, color, delay, animate }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-300 font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-dark-700/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}40`
          }}
          initial={{ width: 0 }}
          animate={animate ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * -10
    const tiltY = (x - 0.5) * 10
    setTransform(`perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform, 
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          transition: 'opacity 0.2s ease',
        }}
      />
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/60 uppercase">02 — Beceriler</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white">
            Teknoloji Yığınım
          </h2>
          <div className="mt-4 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard className="h-full">
                  <div 
                    className="relative glass-card rounded-2xl p-6 h-full overflow-hidden group"
                    style={{ '--card-color': cat.color }}
                  >
                    {/* Top accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                      style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
                    />

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div 
                        className="p-2.5 rounded-xl"
                        style={{ 
                          background: `${cat.color}10`,
                          border: `1px solid ${cat.color}30`
                        }}
                      >
                        <Icon size={20} style={{ color: cat.color }} />
                      </div>
                      <h3 className="font-bold text-white text-sm">{cat.title}</h3>
                    </div>

                    {/* Skill bars */}
                    {cat.skills.map((skill, j) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={cat.color}
                        delay={0.3 + j * 0.08}
                        animate={isInView}
                      />
                    ))}

                    {/* Decorative corner */}
                    <div 
                      className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                      style={{ background: cat.color }}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
