// File: src/pages/GlobeScene.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";

function GlobeModel() {
  const ref = useRef();
  const { scene } = useGLTF("/earth/earth.gltf"); // your local globe model path

  useFrame(() => {
    if (!ref.current) return;
    // Infinite smooth rotation
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x = 0.2; // slight tilt for realism
  });

  return <primitive ref={ref} object={scene} scale={2.5} position={[0, 0, 0]} />;
}

export default function GlobeScene() {
  return (
    <div className="w-full h-full cursor-pointer relative">
      <Canvas camera={{ position: [0, 0, 2], fov: 30 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <GlobeModel />
      </Canvas>

    </div>
  );
}
