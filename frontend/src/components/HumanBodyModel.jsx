import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  useGLTF,
} from "@react-three/drei";
import { Suspense } from "react";

function HumanModel() {
  const { scene } = useGLTF("/models/human-body.glb");

  return (
    <primitive
      object={scene}
      scale={2.8}
      position={[0, -2.2, 0]}
    />
  );
}

export default function HumanBodyModel() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 35,
      }}
      gl={{
        alpha: true,
        antialias: true,
      }}
    >

      {/* Ambient Light */}

      <ambientLight intensity={0.25} />


      {/* Red Medical Glow */}

      <pointLight
        position={[2, 2, 3]}
        intensity={3}
        color="#ff1f35"
      />

      <pointLight
        position={[-3, 0, 2]}
        intensity={1.5}
        color="#8b0000"
      />


      {/* Environment */}

      <Environment preset="night" />


      {/* Human Body */}

      <Suspense fallback={null}>

        <Float
          speed={1}
          rotationIntensity={0.15}
          floatIntensity={0.15}
        >

          <HumanModel />

        </Float>

      </Suspense>


      {/* Mouse Interaction */}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 1.8}
      />

    </Canvas>
  );
}

useGLTF.preload("/models/human-body.glb");