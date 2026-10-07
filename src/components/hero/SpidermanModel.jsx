import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Center, Float } from '@react-three/drei'

export function SpidermanModel({ isHovered = false, onActionChange }) {
  const group = useRef()
  const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}models/spiderman_animated.glb`)
  const { actions, names } = useAnimations(animations, group)
  const [animIndex, setAnimIndex] = useState(0)

  // Khởi chạy animation mượt mà khi load xong
  useEffect(() => {
    if (!actions || names.length === 0) return

    // Ưu tiên animation cử động toàn thân
    const targetAnim = names[animIndex % names.length]
    const action = actions[targetAnim]

    if (action) {
      action.reset().fadeIn(0.4).play()
      if (onActionChange) onActionChange(targetAnim)
      return () => action.fadeOut(0.4)
    }
  }, [actions, names, animIndex, onActionChange])

  // Xoay nhẹ theo đầu chuột (Mouse Parallax) khi người dùng di chuyển
  useFrame((state) => {
    if (!group.current) return
    const targetRotY = (state.pointer.x * Math.PI) / 5
    const targetRotX = (state.pointer.y * Math.PI) / 8
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.04)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetRotX, 0.04)
  })

  // Nhấp chuột vào người Spiderman để chuyển đổi thế võ / chuyển động kế tiếp
  const handleClick = (e) => {
    e.stopPropagation()
    if (names.length > 1) {
      setAnimIndex((prev) => (prev + 1) % names.length)
    }
  }

  return (
    <group
      ref={group}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'grab'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
      dispose={null}
    >
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.3}>
        <Center top={false}>
          <primitive
            object={scene}
            scale={1.85}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </Center>
      </Float>
    </group>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/spiderman_animated.glb`)
