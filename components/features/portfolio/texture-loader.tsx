'use client'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { Suspense } from 'react'

interface TextureMaterialProps {
  imageUrl: string
  children?: React.ReactNode
}

function TextureMaterial({ imageUrl }: TextureMaterialProps) {
  const texture = useLoader(TextureLoader, imageUrl)
  
  return (
    <meshStandardMaterial 
      map={texture}
      roughness={0.2}
      metalness={0.1}
    />
  )
}

export function TextureLoader({ imageUrl, children }: TextureMaterialProps) {
  return (
    <Suspense fallback={
      <meshStandardMaterial 
        color="#f0f0f0"
        roughness={0.2}
        metalness={0.1}
      />
    }>
      <TextureMaterial imageUrl={imageUrl}>
        {children}
      </TextureMaterial>
    </Suspense>
  )
}