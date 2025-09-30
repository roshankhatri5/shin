'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Stars } from '@react-three/drei'
import { PortfolioItem } from '@/lib/constants/portfolio'
import { ThreePortfolioCard } from './three-portfolio-card'
import * as THREE from 'three'

interface ThreePortfolioSceneProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem) => void
  onError?: () => void
}

function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  
  useFrame((state) => {
    if (cameraRef.current) {
      // Gentle camera movement
      cameraRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2
      cameraRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 1
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 8]}
      fov={60}
    />
  )
}

function PortfolioCards({ items, onItemClick }: ThreePortfolioSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation of the entire group
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  // Calculate positions in a circular layout
  const getCardPosition = (index: number, total: number): [number, number, number] => {
    const radius = Math.max(3, total * 0.5)
    const angle = (index / total) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = (Math.random() - 0.5) * 2 // Random height variation
    return [x, y, z]
  }

  const getCardRotation = (index: number, total: number): [number, number, number] => {
    const angle = (index / total) * Math.PI * 2
    return [0, -angle + Math.PI / 2, 0]
  }

  return (
    <group ref={groupRef}>
      {items.map((item, index) => (
        <ThreePortfolioCard
          key={item.id}
          position={getCardPosition(index, items.length)}
          rotation={getCardRotation(index, items.length)}
          imageUrl={item.imageUrl}
          title={item.title}
          category={item.category}
          onClick={() => onItemClick(item)}
        />
      ))}
    </group>
  )
}

function SceneLighting() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.3}
        color="#d4af37"
      />
      
      {/* Rim light */}
      <directionalLight
        position={[0, 0, -10]}
        intensity={0.2}
        color="#ff6b9d"
      />
    </>
  )
}

export function ThreePortfolioScene({ items, onItemClick, onError }: ThreePortfolioSceneProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    console.warn('Three.js failed to load, falling back to 2D grid')
    onError?.()
  }

  return (
    <div className="w-full h-[600px] relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
        onCreated={() => setIsLoading(false)}
        onError={handleError}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <SceneLighting />
          
          {/* Background */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Portfolio Cards */}
          <PortfolioCards items={items} onItemClick={onItemClick} />
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
          <div className="text-white text-lg font-medium animate-pulse">Loading 3D Portfolio...</div>
        </div>
      )}
    </div>
  )
}