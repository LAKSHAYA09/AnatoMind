
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function OrganMesh({
  active = false,
  position = [0, 0, 0],
}) {

  const glowRef = useRef();
  const ringRef = useRef();


  // =====================================================
  // ANIMATION
  // =====================================================

  useFrame((state) => {

    if (!active) {
      return;
    }


    const time =
      state.clock.getElapsedTime();


    // -------------------------------------------------
    // Pulsing glow
    // -------------------------------------------------

    const pulse =
      1 +
      Math.sin(time * 3) *
      0.08;


    if (glowRef.current) {

      glowRef.current.scale.set(
        pulse,
        pulse,
        pulse
      );

    }


    // -------------------------------------------------
    // Rotating scanner ring
    // -------------------------------------------------

    if (ringRef.current) {

      ringRef.current.rotation.z =
        time * 0.8;

      ringRef.current.rotation.x =
        Math.sin(time * 0.5) * 0.2;

    }

  });


  // Don't render when inactive

  if (!active) {
    return null;
  }


  return (

    <group position={position}>


      {/* =================================================
          GLOWING ORGAN SPHERE
      ================================================= */}

      <mesh ref={glowRef}>

        <sphereGeometry
          args={[0.35, 32, 32]}
        />

        <meshStandardMaterial
          color="#E8352B"
          emissive="#E8352B"
          emissiveIntensity={3}
          transparent
          opacity={0.28}
          depthWrite={false}
        />

      </mesh>


      {/* =================================================
          INNER CORE
      ================================================= */}

      <mesh>

        <sphereGeometry
          args={[0.18, 24, 24]}
        />

        <meshBasicMaterial
          color="#ff4b42"
          transparent
          opacity={0.35}
        />

      </mesh>


      {/* =================================================
          FUTURISTIC TARGET RING
      ================================================= */}

      <mesh
        ref={ringRef}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >

        <torusGeometry
          args={[
            0.55,
            0.015,
            16,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#E8352B"
          transparent
          opacity={0.8}
        />

      </mesh>


      {/* =================================================
          SECOND SCANNER RING
      ================================================= */}

      <mesh
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >

        <torusGeometry
          args={[
            0.45,
            0.008,
            16,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#ff5a50"
          transparent
          opacity={0.45}
        />

      </mesh>


      {/* =================================================
          POINT LIGHT
      ================================================= */}

      <pointLight
        color="#E8352B"
        intensity={2}
        distance={2}
      />

    </group>

  );
}