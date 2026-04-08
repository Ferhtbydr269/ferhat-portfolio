import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiLoader } from 'react-icons/fi'
import jsPDF from 'jspdf'

async function loadImageAsBase64(url) {
  const res = await fetch(url)
  const blob = await res.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

function drawRoundedRect(doc, x, y, w, h, r) {
  doc.roundedRect(x, y, w, h, r, r, 'F')
}

async function generateCV(doc) {
  const W = 210
  const H = 297
  const margin = 16
  const sidebarW = 68

  // --- COLORS ---
  const darkBg = [12, 12, 30]
  const sidebarBg = [18, 18, 50]
  const cyan = [0, 200, 220]
  const purple = [140, 80, 220]
  const white = [255, 255, 255]
  const gray = [180, 180, 195]
  const lightGray = [140, 140, 160]
  const dimGray = [100, 100, 120]

  // --- BACKGROUND ---
  doc.setFillColor(...darkBg)
  doc.rect(0, 0, W, H, 'F')

  // Sidebar
  doc.setFillColor(...sidebarBg)
  doc.rect(0, 0, sidebarW, H, 'F')

  // Sidebar accent line
  doc.setFillColor(...cyan)
  doc.rect(sidebarW - 0.5, 0, 0.5, H, 'F')

  // --- PROFILE PHOTO ---
  try {
    const photoBase64 = await loadImageAsBase64('/profil_photo.png')
    const photoSize = 42
    const photoX = (sidebarW - photoSize) / 2
    const photoY = 18

    // Circular mask effect via clip (approximate with rounded rect)
    doc.setFillColor(...cyan)
    doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 1.5, 'F')
    doc.addImage(photoBase64, 'PNG', photoX, photoY, photoSize, photoSize)

    // Overlay circle border
    doc.setDrawColor(...cyan)
    doc.setLineWidth(0.8)
    doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 1, 'S')
  } catch {
    // Fallback if image not available
    const cx = sidebarW / 2
    doc.setFillColor(...cyan)
    doc.circle(cx, 39, 22, 'F')
    doc.setFontSize(18)
    doc.setTextColor(...white)
    doc.setFont('helvetica', 'bold')
    doc.text('FB', cx, 43, { align: 'center' })
  }

  let sideY = 68

  // --- NAME ON SIDEBAR ---
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...white)
  doc.text('FERHAT', sidebarW / 2, sideY, { align: 'center' })
  sideY += 6
  doc.text('BAYDIR', sidebarW / 2, sideY, { align: 'center' })
  sideY += 5

  // Title
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(...cyan)
  doc.text('Computer Engineering Student', sidebarW / 2, sideY, { align: 'center' })
  sideY += 4
  doc.text('Full-Stack Developer', sidebarW / 2, sideY, { align: 'center' })
  sideY += 8

  // Divider
  doc.setFillColor(...cyan)
  doc.rect(12, sideY, sidebarW - 24, 0.3, 'F')
  sideY += 8

  // --- SIDEBAR SECTIONS ---
  function sidebarSectionTitle(title) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...cyan)
    doc.text(title, 10, sideY)
    sideY += 2
    doc.setFillColor(cyan[0], cyan[1], cyan[2])
    doc.rect(10, sideY, 20, 0.3, 'F')
    sideY += 5
  }

  function sidebarItem(label, value) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(...lightGray)
    doc.text(label, 10, sideY)
    sideY += 3.5
    doc.setTextColor(...white)
    doc.text(value || '', 10, sideY)
    sideY += 5.5
  }

  // Contact
  sidebarSectionTitle('İLETİŞİM')
  sidebarItem('Telefon', '0534 655 55 14')
  sidebarItem('E-posta', 'ferhatbaydir7@gmail.com')
  sidebarItem('LinkedIn', 'linkedin.com/in/ferhat-baydir')
  sidebarItem('GitHub', 'github.com/Ferhtbydr269')
  sidebarItem('Konum', 'Türkiye')

  sideY += 2

  // Languages
  sidebarSectionTitle('DİLLER')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...white)
  doc.text('Türkçe — Anadil', 10, sideY)
  sideY += 5
  doc.text('İngilizce — B1-B2', 10, sideY)
  sideY += 8

  // Soft Skills
  sidebarSectionTitle('SOFT SKILLS')
  const softSkills = ['Hızlı Öğrenme', 'Problem Çözme', 'Takım Çalışması', 'Sürekli Gelişim', 'Müşteri Odaklı']
  softSkills.forEach((s) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(...white)
    doc.setFillColor(...cyan)
    doc.circle(13, sideY - 1.2, 0.8, 'F')
    doc.text(s, 16, sideY)
    sideY += 5
  })

  // === MAIN CONTENT AREA ===
  const mainX = sidebarW + 10
  const mainW = W - sidebarW - margin - 6
  let mainY = 18

  function mainSectionTitle(title) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...cyan)
    doc.text(title, mainX, mainY)
    mainY += 2
    doc.setFillColor(...cyan)
    doc.rect(mainX, mainY, 30, 0.4, 'F')
    doc.setFillColor(purple[0], purple[1], purple[2])
    doc.rect(mainX + 30, mainY, 15, 0.4, 'F')
    mainY += 6
  }

  // --- ABOUT ---
  mainSectionTitle('HAKKIMDA')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...gray)
  const aboutText = 'Kod yazmayı, veri analiz etmeyi ve dijital dünyada iz bırakmayı seviyorum. Sadece yazılım geliştirmekle kalmıyor, aynı zamanda dijital pazarlama, yapay zeka araçları ve güncel teknolojileri aktif olarak takip edip projelerime entegre ediyorum. Sürekli öğrenen, kendini güncelleyen bir mühendis adayıyım. Hedefim: teknolojiyle gerçek dünya problemlerini çözmek.'
  const aboutLines = doc.splitTextToSize(aboutText, mainW)
  doc.text(aboutLines, mainX, mainY)
  mainY += aboutLines.length * 3.8 + 4

  // --- EXPERIENCE ---
  mainSectionTitle('İŞ DENEYİMİ')

  function addExperience(title, company, duration, desc) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...white)
    doc.text(title, mainX, mainY)
    mainY += 4
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...cyan)
    doc.text(`${company}  |  ${duration}`, mainX, mainY)
    mainY += 4.5
    doc.setTextColor(...gray)
    doc.setFontSize(6.8)
    const lines = doc.splitTextToSize(desc, mainW)
    doc.text(lines, mainX, mainY)
    mainY += lines.length * 3.5 + 3
  }

  addExperience(
    'Proje Koordinasyon Uygulama ve Araştırma Merkezi',
    'Manisa Celal Bayar Üniversitesi',
    '1 Yıl',
    'Proje koordinasyon süreçlerinde aktif görev aldım. Araştırma merkezi bünyesinde yazılım ve veri odaklı projelere destek verdim. Kurumsal ortamda proje yönetimi ve ekip içi iletişim deneyimi edindim.'
  )

  addExperience(
    'Freelance Dijital Pazarlama Uzmanı',
    'Bağımsız',
    'Devam Ediyor',
    'Google Ads ve Meta Ads platformlarında reklam kampanyaları oluşturma, yönetme ve optimize etme. Müşteri portföyü yönetimi, bütçe planlaması, A/B testleri ve performans raporlaması.'
  )

  // --- EDUCATION ---
  mainSectionTitle('EĞİTİM')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...white)
  doc.text('Bilgisayar Mühendisliği (3. Sınıf)', mainX, mainY)
  mainY += 4
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...cyan)
  doc.text('Manisa Celal Bayar Üniversitesi  |  Devam Ediyor', mainX, mainY)
  mainY += 3.5
  doc.setTextColor(...gray)
  doc.setFontSize(6.8)
  doc.text('İngilizce Hazırlık Eğitimi (B1-B2 düzeyinde tamamlandı)', mainX, mainY)
  mainY += 8

  // --- TECHNICAL SKILLS ---
  mainSectionTitle('TEKNİK BECERİLER')

  function skillRow(category, skills) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...purple)
    doc.text(category + ':', mainX, mainY)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    const skillText = skills.join(', ')
    const skillLines = doc.splitTextToSize(skillText, mainW - 2)
    doc.text(skillLines, mainX, mainY + 4)
    mainY += 4 + skillLines.length * 3.5 + 2
  }

  skillRow('Backend', ['Python', 'Django', 'Flask', 'FastAPI', 'Node.js', 'REST API'])
  skillRow('Frontend', ['HTML5/CSS3', 'JavaScript', 'React.js', 'TypeScript', 'Responsive Design'])
  skillRow('Veri & AI', ['Pandas', 'NumPy', 'Matplotlib', 'Machine Learning', 'ChatGPT', 'Claude', 'Cursor'])
  skillRow('Dijital Pazarlama', ['Google Ads', 'Meta Ads', 'Kampanya Yönetimi', 'SEO'])
  skillRow('Araçlar', ['Git & GitHub', 'VS Code', 'Linux', 'Figma'])

  mainY += 2

  // --- PROJECTS ---
  mainSectionTitle('ÖNE ÇIKAN PROJELER')

  function projectRow(name, tech, desc) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...white)
    doc.text(name, mainX, mainY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.setTextColor(...cyan)
    doc.text(`  [${tech}]`, mainX + doc.getTextWidth(name) + 1, mainY)
    mainY += 3.5
    doc.setTextColor(...dimGray)
    doc.setFontSize(6.5)
    doc.text(desc, mainX + 2, mainY)
    mainY += 5
  }

  projectRow('Linka Social Platform', 'Django', 'Sosyal medya platformu — kullanıcı kayıt, profil, paylaşım')
  projectRow('GetTicket Events', 'Django', 'Etkinlik yönetim ve online bilet rezervasyon sistemi')
  projectRow('Bursa Pınar Temizlik', 'TypeScript', 'Kurumsal düzeyde tam fonksiyonel şirket web sitesi')
  projectRow('motiveX', 'React', 'Motivasyon ve kişisel gelişim uygulaması')
  projectRow('fastApp', 'FastAPI', 'Hızlı REST API geliştirme projesi')

  // --- CERTIFICATES ---
  if (mainY < 260) {
    mainY += 2
    mainSectionTitle('SERTİFİKALAR')
    const certs = [
      'TEKNOFEST Yapay Zeka Film Yarışması — Finalist',
      'İleri Seviye Python Programlama Dili',
      'Güvenli Yazılım Geliştirme',
      'Kotlin Programlama Dili',
      'Mobil Güvenlik ve Sızma Teknikleri',
      'Uygulamalı Sızma Testi',
    ]
    certs.forEach((c) => {
      doc.setFillColor(...cyan)
      doc.circle(mainX + 1.5, mainY - 1.2, 0.7, 'F')
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(6.8)
      doc.setTextColor(...gray)
      doc.text(c, mainX + 5, mainY)
      mainY += 4.5
    })
  }

  // --- FOOTER ACCENT ---
  doc.setFillColor(...cyan)
  doc.rect(0, H - 3, W, 3, 'F')
  doc.setFillColor(...purple)
  doc.rect(W * 0.6, H - 3, W * 0.4, 3, 'F')

  doc.setFontSize(5)
  doc.setTextColor(...darkBg)
  doc.setFont('helvetica', 'normal')
  doc.text('ferhatbaydir7@gmail.com  |  github.com/Ferhtbydr269  |  linkedin.com/in/ferhat-baydir', W / 2, H - 0.8, { align: 'center' })
}

export default function CVGenerator({ onClose }) {
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState('')

  const handleGenerate = async () => {
    setGenerating(true)
    setProgress('CV oluşturuluyor...')

    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      
      setProgress('Profil fotoğrafı yükleniyor...')
      await generateCV(doc)
      
      setProgress('PDF kaydediliyor...')
      doc.save('Ferhat_Baydir_CV.pdf')
      
      setProgress('Tamamlandı!')
      setTimeout(() => onClose(), 800)
    } catch (err) {
      console.error('CV generation error:', err)
      setProgress('Hata oluştu, tekrar deneyin.')
      setTimeout(() => {
        setGenerating(false)
        setProgress('')
      }, 2000)
    }
  }

  useEffect(() => {
    handleGenerate()
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-900/90 backdrop-blur-xl"
        onClick={!generating ? onClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card rounded-2xl p-8 max-w-sm w-full mx-6 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/20 flex items-center justify-center mx-auto mb-5">
            {generating ? (
              <FiLoader size={28} className="text-neon-cyan animate-spin" />
            ) : (
              <FiDownload size={28} className="text-neon-cyan" />
            )}
          </div>

          <h3 className="font-display text-xl font-bold text-white mb-2">CV İndiriliyor</h3>
          <p className="text-sm text-gray-400 mb-6">{progress || 'Profesyonel CV\'niz hazırlanıyor...'}</p>

          {/* Progress bar */}
          <div className="h-1 rounded-full bg-dark-700 overflow-hidden mb-6">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              initial={{ width: '0%' }}
              animate={{ width: generating ? '90%' : '100%' }}
              transition={{ duration: generating ? 2 : 0.3 }}
            />
          </div>

          {!generating && (
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Kapat
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
