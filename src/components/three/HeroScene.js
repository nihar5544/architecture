"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ArchitecturalForm({ mouse }) {
  const groupRef = useRef();
  const innerRef = useRef();

  const mats = useMemo(() => ({
    outer: new THREE.MeshBasicMaterial({ color: "#c8a96e", wireframe: true, transparent: true, opacity: 0.35 }),
    inner: new THREE.MeshBasicMaterial({ color: "#4a7c7e", wireframe: true, transparent: true, opacity: 0.2 }),
    ring1: new THREE.MeshBasicMaterial({ color: "#c8a96e", wireframe: true, transparent: true, opacity: 0.15 }),
    ring2: new THREE.MeshBasicMaterial({ color: "#c8a96e", wireframe: true, transparent: true, opacity: 0.1 }),
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04 + mouse.current.x * 0.3;
      groupRef.current.rotation.x = mouse.current.y * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh material={mats.outer}>
        <octahedronGeometry args={[1.4, 2]} />
      </mesh>
      <group ref={innerRef}>
        <mesh material={mats.inner}>
          <tetrahedronGeometry args={[0.9, 1]} />
        </mesh>
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.ring1}>
        <torusGeometry args={[2.0, 0.006, 2, 80]} />
      </mesh>
      <mesh material={mats.ring2}>
        <torusGeometry args={[1.8, 0.006, 2, 80]} />
      </mesh>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#c8a96e" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function SceneInner() {
  const mouse = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#c8a96e" />
      <Particles />
      <ArchitecturalForm mouse={mouse} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <SceneInner />
    </Canvas>
  );
}
