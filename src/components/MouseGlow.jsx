import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef(null)
  const pos = useRef({ x: -500, y: -500 })
  const target = useRef({ x: -500, y: -500 })
  const rafId = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08
      pos.current.y += (target.current.y - pos.current.y) * 0.08

      if (glowRef.current) {
        glowRef.current.style.left = `${pos.current.x}px`
        glowRef.current.style.top = `${pos.current.y}px`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow hidden md:block" />
}
