import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/models/human-body.glb");

  return (
    <Center>
      <primitive
        object={scene}
        scale={2}
      />
    </Center>
  );
}

function LoadingModel() {
  return null;
}

export default function HumanBodyModel() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        style={{
          background: "transparent",
        }}
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-5, 2, 5]}
          intensity={2}
          color="#ff4444"
        />

        <pointLight
          position={[0, 5, 3]}
          intensity={3}
          color="#ff0000"
        />

        <Suspense fallback={<LoadingModel />}>
          <Model />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/human-body.glb");