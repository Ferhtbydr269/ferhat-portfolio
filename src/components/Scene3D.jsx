import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function IcosahedronMesh() {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15
      meshRef.current.rotation.y = t * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.15
      wireRef.current.rotation.y = t * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <MeshDistortMaterial
            color="#0a0a2e"
            emissive="#00f0ff"
            emissiveIntensity={0.15}
            roughness={0.3}
            metalness={0.8}
            distort={0.25}
            speed={2}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[2.3, 1]} />
          <meshBasicMaterial 
            color="#00f0ff" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingRing({ radius, tubeRadius, color, speed, rotX, rotY }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.x = rotX + t * speed * 0.3
      ref.current.rotation.y = rotY + t * speed * 0.2
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tubeRadius, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} wireframe />
    </mesh>
  )
}

function ParticleField() {
  const pointsRef = useRef()
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#f43f5e'),
    ]
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return cols
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function Scene3D({ className = '' }) {
  return (
    <div className={`${className}`} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#00f0ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#a855f7" />
        
        <IcosahedronMesh />
        
        <FloatingRing radius={3.5} tubeRadius={0.02} color="#00f0ff" speed={0.5} rotX={Math.PI / 3} rotY={0} />
        <FloatingRing radius={4} tubeRadius={0.015} color="#a855f7" speed={-0.3} rotX={Math.PI / 5} rotY={Math.PI / 4} />
        <FloatingRing radius={4.5} tubeRadius={0.01} color="#f43f5e" speed={0.2} rotX={Math.PI / 6} rotY={Math.PI / 3} />
        
        <ParticleField />
      </Canvas>
    </div>
  )
}
