"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Architecture: wireframe high-rise facade ──────────────────────────────
function ArchitectureScene() {
  const groupRef = useRef();

  const floors = 8;
  const width = 1.2;
  const floorH = 0.28;

  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#c8a96e", transparent: true, opacity: 0.7 }),
    []
  );

  const floors3D = useMemo(() => {
    const items = [];
    for (let i = 0; i < floors; i++) {
      const y = i * floorH - (floors * floorH) / 2 + floorH / 2;
      const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(width, floorH * 0.9, width * 0.6));
      items.push({ geo, y });
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {floors3D.map(({ geo, y }, i) => (
        <lineSegments key={i} geometry={geo} material={lineMat} position={[0, y, 0]} />
      ))}
      {/* Spire */}
      <lineSegments
        geometry={new THREE.EdgesGeometry(new THREE.ConeGeometry(0.12, 0.6, 4))}
        material={new THREE.LineBasicMaterial({ color: "#c8a96e", transparent: true, opacity: 0.5 })}
        position={[0, floors * floorH / 2 + 0.2, 0]}
      />
    </group>
  );
}

// ── Interior Design: floating room box with furniture silhouettes ─────────
function InteriorScene() {
  const roomRef = useRef();
  const furnitureRef = useRef();

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#c8a96e", transparent: true, opacity: 0.65 }),
    []
  );
  const accentMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#4a7c7e", transparent: true, opacity: 0.5 }),
    []
  );

  const roomGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2, 1.4, 1.6)), []);
  const sofaGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 0.25, 0.4)), []);
  const tableGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.4, 0.08, 0.3)), []);
  const lampGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.06, 0.18, 0.5, 8)), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (roomRef.current) {
      roomRef.current.rotation.y = t * 0.25;
      roomRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={roomRef}>
      <lineSegments geometry={roomGeo} material={mat} />
      {/* Sofa */}
      <lineSegments geometry={sofaGeo} material={accentMat} position={[0, -0.45, -0.4]} />
      {/* Coffee table */}
      <lineSegments geometry={tableGeo} material={mat} position={[0, -0.53, 0.1]} />
      {/* Floor lamp */}
      <lineSegments geometry={lampGeo} material={accentMat} position={[0.7, -0.32, -0.45]} />
    </group>
  );
}

// ── 3D Visualization: icosahedron with orbiting ring ─────────────────────
function VisualizationScene() {
  const coreRef = useRef();
  const ringRef = useRef();
  const outerRef = useRef();

  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#c8a96e", wireframe: true, transparent: true, opacity: 0.5 }),
    []
  );
  const ringMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#c8a96e", transparent: true, opacity: 0.3 }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.4;
      coreRef.current.rotation.y = t * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      ringRef.current.rotation.x = Math.PI / 3 + t * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group ref={outerRef}>
      <mesh ref={coreRef} material={mat}>
        <icosahedronGeometry args={[0.8, 1]} />
      </mesh>
      <group ref={ringRef}>
        <mesh material={new THREE.MeshBasicMaterial({ color: "#4a7c7e", wireframe: true, transparent: true, opacity: 0.3 })}>
          <torusGeometry args={[1.3, 0.008, 2, 60]} />
        </mesh>
      </group>
      <mesh material={new THREE.MeshBasicMaterial({ color: "#c8a96e", wireframe: true, transparent: true, opacity: 0.15 })}>
        <dodecahedronGeometry args={[1.2, 0]} />
      </mesh>
    </group>
  );
}

// ── Retail Design: floating grid of product cubes ────────────────────────
function RetailScene() {
  const gridRef = useRef();

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#c8a96e", transparent: true, opacity: 0.6 }),
    []
  );

  const cubes = useMemo(() => {
    const items = [];
    const cols = 3;
    const rows = 3;
    const gap = 0.65;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const size = 0.22 + Math.random() * 0.18;
        items.push({
          x: (c - 1) * gap,
          y: (r - 1) * gap,
          size,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.rotation.y = t * 0.2;
      gridRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    }
    gridRef.current?.children.forEach((child, i) => {
      const cube = cubes[i];
      if (cube) {
        child.position.z = Math.sin(t * 0.8 + cube.phase) * 0.12;
        child.rotation.y = t * 0.5 + cube.phase;
      }
    });
  });

  return (
    <group ref={gridRef}>
      {cubes.map((cube, i) => (
        <lineSegments
          key={i}
          geometry={new THREE.EdgesGeometry(new THREE.BoxGeometry(cube.size, cube.size, cube.size))}
          material={mat}
          position={[cube.x, cube.y, 0]}
        />
      ))}
    </group>
  );
}

// ── Scene map ─────────────────────────────────────────────────────────────
const SCENES = {
  architecture: ArchitectureScene,
  interior: InteriorScene,
  visualization: VisualizationScene,
  retail: RetailScene,
};

export default function ServiceScene({ type = "architecture" }) {
  const SceneComponent = SCENES[type] || ArchitectureScene;

  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.4} color="#c8a96e" />
      <SceneComponent />
    </Canvas>
  );
}
