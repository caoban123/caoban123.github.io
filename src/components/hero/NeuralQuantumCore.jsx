import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

// Sinh ngẫu nhiên các nơ-ron và liên kết mạng thần kinh AI (Tỉ lệ chuẩn, cân đối, không tràn khung)
function generateNeuralData(count = 50, maxDistance = 0.95) {
  const points = []
  for (let i = 0; i < count; i++) {
    // Phân bố đều trên khối cầu bán kính vừa vặn r ~ 0.85 -> 1.15
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = 0.82 + Math.random() * 0.35
    points.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ))
  }

  // Tạo các đường liên kết synapse giữa các nút ở gần nhau
  const linePositions = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = points[i].distanceTo(points[j])
      if (dist < maxDistance) {
        linePositions.push(points[i].x, points[i].y, points[i].z)
        linePositions.push(points[j].x, points[j].y, points[j].z)
      }
    }
  }

  // Tọa độ các điểm nơ-ron
  const nodePositions = new Float32Array(points.length * 3)
  points.forEach((p, idx) => {
    nodePositions[idx * 3] = p.x
    nodePositions[idx * 3 + 1] = p.y
    nodePositions[idx * 3 + 2] = p.z
  })

  return {
    nodePositions,
    linePositions: new Float32Array(linePositions),
    count: points.length,
  }
}

export function NeuralQuantumCore() {
  const groupRef = useRef()
  const innerCoreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const neuralLinesRef = useRef()

  const { nodePositions, linePositions } = useMemo(() => generateNeuralData(52, 0.92), [])

  // Vòng lặp chuyển động mượt mà 60 FPS
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // 1. Theo dõi con trỏ chuột mượt mà (Mouse Parallax)
    if (groupRef.current) {
      const targetRotY = (state.pointer.x * Math.PI) / 6
      const targetRotX = (state.pointer.y * Math.PI) / 8
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetRotX, 0.04)
    }

    // 2. Lõi trung tâm tự xoay và phát xung nhịp tim AI
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y += delta * 0.4
      innerCoreRef.current.rotation.x += delta * 0.25
      const pulse = 1 + Math.sin(t * 2.5) * 0.06
      innerCoreRef.current.scale.set(pulse, pulse, pulse)
    }

    // 3. Các vành đai lượng tử xoay đa trục ở tốc độ khác nhau
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.6
      ring2Ref.current.rotation.z += delta * 0.25
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.45
      ring3Ref.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        {/* 1. LÕI TINH THỂ LƯỢNG TỬ TRUNG TÂM (QUANTUM CRYSTAL CORE) */}
        <group ref={innerCoreRef}>
          {/* Lõi đa diện dạng khung lưới dây sắc nét */}
          <mesh>
            <icosahedronGeometry args={[0.55, 1]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#0284C7"
              emissiveIntensity={0.8}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Khối cầu năng lượng nội tại rực sáng */}
          <mesh>
            <sphereGeometry args={[0.36, 24, 24]} />
            <meshStandardMaterial
              color="#4F7CFF"
              emissive="#4F7CFF"
              emissiveIntensity={1.4}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>

        {/* 2. MẠNG THẦN KINH NƠ-RON AI (NEURAL NETWORK NODES & SYNAPSES) */}
        <group>
          {/* Các điểm nơ-ron phát sáng */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={nodePositions.length / 3}
                array={nodePositions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.055}
              color="#22D3EE"
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
            />
          </points>

          {/* Các sợi liên kết synapse giữa các nơ-ron */}
          <lineSegments ref={neuralLinesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={linePositions.length / 3}
                array={linePositions}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#4F7CFF"
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        </group>

        {/* 3. VÀNH ĐAI DỮ LIỆU ĐA TRỤC (QUANTUM ORBITAL RINGS) - Kích thước cân đối hoàn hảo */}
        {/* Vành đai 1: Cyan neon */}
        <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.25, 0.01, 16, 80]} />
            <meshBasicMaterial color="#22D3EE" transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Vành đai 2: Royal Blue nghiêng trục đối lập */}
        <group ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <mesh>
            <torusGeometry args={[1.40, 0.01, 16, 80]} />
            <meshBasicMaterial color="#818CF8" transparent opacity={0.6} />
          </mesh>
        </group>

        {/* Vành đai 3: Neon Violet vành ngoài */}
        <group ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, Math.PI / 3]}>
          <mesh>
            <torusGeometry args={[1.55, 0.009, 16, 80]} />
            <meshBasicMaterial color="#C084FC" transparent opacity={0.5} />
          </mesh>
        </group>

        {/* 4. ĐÁM MÂY DỮ LIỆU LƠ LỬNG (QUANTUM DATA PARTICLES) */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={nodePositions.length / 3}
              array={nodePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#A855F7"
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </Float>
    </group>
  )
}
