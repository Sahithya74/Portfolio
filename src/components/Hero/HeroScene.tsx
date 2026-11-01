import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function Knot() {
  const ref = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.18
    ref.current.rotation.y += delta * 0.24
    // Lean toward the pointer
    ref.current.position.x += (state.pointer.x * 0.35 - ref.current.position.x) * 0.04
    ref.current.position.y += (state.pointer.y * 0.25 - ref.current.position.y) * 0.04
  })
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={0.95}>
        <torusKnotGeometry args={[1, 0.34, 220, 32, 2, 3]} />
        <MeshDistortMaterial color="#B7A2C9" metalness={1} roughness={0.18} distort={0.22} speed={1.4} />
      </mesh>
    </Float>
  )
}

function Bead({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  return (
    <Float speed={2.4} floatIntensity={2} rotationIntensity={2}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.22} flatShading />
      </mesh>
    </Float>
  )
}

/** The one genuine 3D element: a metallic-lavender knot with orbiting faceted beads. */
export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={1.2} color="#D8C9E5" />
      <Knot />
      <Bead position={[-1.9, 1.2, -0.6]} scale={0.2} color="#C7C5CA" />
      <Bead position={[1.8, -1.3, 0.3]} scale={0.14} color="#D8C9E5" />
      <Bead position={[1.6, 1.5, -1]} scale={0.1} color="#B7A2C9" />
      <Environment resolution={128}>
        <Lightformer form="ring" intensity={3} color="#F5F0E8" position={[0, 3, 4]} scale={4} />
        <Lightformer form="rect" intensity={2.5} color="#D8C9E5" position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#C7C5CA" position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="circle" intensity={1.5} color="#39343D" position={[0, -4, 0]} rotation-x={Math.PI / 2} scale={6} />
      </Environment>
    </Canvas>
  )
}
