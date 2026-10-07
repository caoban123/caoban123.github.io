import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { orbVertex, orbFragment, haloVertex, haloFragment } from './shaders'

export function ShaderOrb({ detail = 56, particleCount = 1000 }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  // Track the pointer over the whole window via a ref (no React re-renders).
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const orbUniforms = useMemo(() => ({ uTime: { value: 0 }, uAmp: { value: 0.3 } }), [])
  const haloUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) } }),
    []
  )

  const halo = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const speeds = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.05 + Math.random() * 0.7
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75
      positions[i * 3 + 2] = r * Math.cos(phi)
      scales[i] = 0.5 + Math.random() * 1.5
      speeds[i] = 0.4 + Math.random()
    }
    return { positions, scales, speeds }
  }, [particleCount])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    orbUniforms.uTime.value = t
    orbUniforms.uAmp.value = 0.3 + Math.sin(t * 1.2) * 0.04 // subtle pulse
    haloUniforms.uTime.value = t

    if (meshRef.current) meshRef.current.rotation.y = t * 0.08

    const g = groupRef.current
    if (g) {
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -mouse.current.y * 0.35, 0.05)
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, mouse.current.x * 0.45, 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.55, detail]} />
        <shaderMaterial vertexShader={orbVertex} fragmentShader={orbFragment} uniforms={orbUniforms} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={halo.positions} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" count={particleCount} array={halo.scales} itemSize={1} />
          <bufferAttribute attach="attributes-aSpeed" count={particleCount} array={halo.speeds} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={haloUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
