'use client'

import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox, Text, Float } from '@react-three/drei'
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface ThreePortfolioCardProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  imageUrl: string
  title: string
  category: string
  onHover?: (hovered: boolean) => void
  onClick?: () => void
}

export function ThreePortfolioCard({
  position,
  rotation = [0, 0, 0],
  imageUrl,
  title,
  category,
  onHover,
  onClick
}: ThreePortfolioCardProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  // Load texture
  const texture = useLoader(TextureLoader, imageUrl)

  // Animate the card on hover and click
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      
      // Hover scale effect
      const targetScale = hovered ? 1.05 : clicked ? 0.95 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      
      // Rotation on hover
      if (hovered) {
        meshRef.current.rotation.y += 0.01
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation[1], 0.1)
      }
    }

    if (textRef.current && hovered) {
      textRef.current.position.y = position[1] + 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    onHover?.(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    onHover?.(false)
    document.body.style.cursor = 'auto'
  }

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 150)
    onClick?.()
  }

  return (
    <group>
      {/* Main Card */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <RoundedBox
          ref={meshRef}
          args={[2, 2.5, 0.1]}
          position={position}
          rotation={rotation}
          radius={0.1}
          smoothness={10}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <meshStandardMaterial 
            map={texture}
            roughness={0.2}
            metalness={0.1}
            emissive={hovered ? new THREE.Color(0x111111) : new THREE.Color(0x000000)}
            emissiveIntensity={hovered ? 0.1 : 0}
          />
        </RoundedBox>
      </Float>

      {/* Title Text (appears on hover) */}
      {hovered && (
        <Text
          ref={textRef}
          position={[position[0], position[1] + 1.5, position[2] + 0.1]}
          fontSize={0.2}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          {title}
        </Text>
      )}

      {/* Category Badge */}
      <Text
        position={[position[0], position[1] - 1.5, position[2] + 0.1]}
        fontSize={0.12}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {category.toUpperCase()}
      </Text>

      {/* Glow effect on hover */}
      {hovered && (
        <pointLight
          position={[position[0], position[1], position[2] + 1]}
          intensity={0.5}
          color="#d4af37"
          distance={3}
        />
      )}
    </group>
  )
}