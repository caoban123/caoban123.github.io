import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AIOrb({ mouse }) {
  const pointsRef = useRef()
  const wireframeRef = useRef()

  // Generate particle sphere
  const count = 1800
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const orig = new Float32Array(count * 3)
    const radius = 2.2

    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * 0.4 + radius * 0.85

      const sinPhi = Math.sin(phi)
      const x = r * sinPhi * Math.cos(theta)
      const y = r * sinPhi * Math.sin(theta)
      const z = r * Math.cos(phi)

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      orig[i * 3] = x
      orig[i * 3 + 1] = y
      orig[i * 3 + 2] = z
    }
    return [pos, orig]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (pointsRef.current) {
      // Rotation
      pointsRef.current.rotation.y = time * 0.12 + (mouse?.normalizedX || 0) * 0.3
      pointsRef.current.rotation.x = time * 0.08 - (mouse?.normalizedY || 0) * 0.3

      // Gentle pulsing noise deformation
      const posAttr = pointsRef.current.geometry.attributes.position
      const currentPos = posAttr.array

      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const ox = originalPositions[i3]
        const oy = originalPositions[i3 + 1]
        const oz = originalPositions[i3 + 2]

        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz)
        const wave = Math.sin(dist * 3.0 - time * 2.5) * 0.08

        currentPos[i3] = ox + (ox / dist) * wave
        currentPos[i3 + 1] = oy + (oy / dist) * wave
        currentPos[i3 + 2] = oz + (oz / dist) * wave
      }
      posAttr.needsUpdate = true
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -time * 0.06
      wireframeRef.current.rotation.z = time * 0.04
      const scale = 1.0 + Math.sin(time * 1.5) * 0.02
      wireframeRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group>
      {/* Outer Point Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#4F7CFF"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Inner Wireframe Core */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Center Glow Core */}
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
