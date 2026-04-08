# Ferhat Baydır — Sinematik 3D Portfölio

Cyberpunk temalı, Three.js destekli sinematik kişisel portfölio web sitesi.

## Teknolojiler

- **React 18** + **Vite 6** — Hızlı geliştirme ve build
- **Three.js** / React Three Fiber — 3D icosahedron, yörünge halkaları, parçacık alanı
- **Framer Motion** — Scroll-triggered animasyonlar, page transitions
- **tsParticles** — İnteraktif parçacık arka planı
- **Tailwind CSS** — Utility-first styling, custom neon theme
- **jsPDF** — Client-side profesyonel PDF CV oluşturma

## Özellikler

- Sinematik loading screen (neon glow, orbiting rings)
- 3D dönen icosahedron + wireframe + floating rings
- Mouse-interactive parçacık sistemi
- Glitch text efekti, neon glow, glassmorphism
- Typewriter efektiyle değişen ünvanlar
- Mouse takip eden radial glow
- 3D tilt kart efekti (skills + projects)
- Animasyonlu progress bar'lar
- Neon timeline (deneyim bölümü)
- Filtrelenebilir proje kartları (Python/JS/TS/HTML)
- Sertifikalar galerisi (PDF'lere link)
- İletişim formu
- Profesyonel PDF CV indirme (profil fotoğrafı dahil)
- Dark/Light mode toggle
- Konami kodu easter egg (↑↑↓↓←→←→BA)
- Tam responsive tasarım (mobilde 3D kapalı)
- SEO meta tags + Open Graph
- Glassmorphism sticky navbar

## Kurulum

```bash
npm install
npm run dev
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Vercel Deploy

Repo GitHub'a bağlandıktan sonra:
1. [vercel.com](https://vercel.com) → New Project
2. GitHub reposunu import et
3. Framework: **Vite** otomatik algılanır
4. Deploy butonuna tıkla

## Dosya Yapısı

```
├── public/              # Statik dosyalar (resimler, sertifikalar, favicon)
├── src/
│   ├── components/      # React bileşenleri
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Scene3D.jsx          # Three.js 3D sahne
│   │   ├── ParticleBackground.jsx
│   │   ├── MouseGlow.jsx
│   │   ├── AboutSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── EducationSection.jsx
│   │   ├── CertificatesSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── CVGenerator.jsx      # PDF CV oluşturucu
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vercel.json
├── tailwind.config.js
└── vite.config.js
```

## Lisans

MIT — Ferhat Baydır
