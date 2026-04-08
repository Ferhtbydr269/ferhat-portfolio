import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
          particles: ['@tsparticles/react', '@tsparticles/slim', 'tsparticles'],
          pdf: ['jspdf', 'jspdf-autotable', 'html2canvas'],
        }
      }
    }
  }
})
