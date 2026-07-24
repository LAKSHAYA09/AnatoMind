import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";
import { useMemo, useRef } from "react";

function CameraMotion({ scrollProgress }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const targetX = MathUtils.lerp(0, 0.8, scrollProgress);
    const targetY = MathUtils.lerp(0, 0.3, scrollProgress);
    const targetZ = MathUtils.lerp(5, 2.9, scrollProgress);

    camera.position.x = MathUtils.damp(camera.position.x, targetX, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, targetY, 3, delta);
    camera.position.z = MathUtils.damp(camera.position.z, targetZ, 3, delta);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Heart() {
  const { scene } = useGLTF("/models/heart.glb");
  const heartRef = useRef();
  const redLightRef = useRef();

  const heartScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.color.set("#7f0808");
        child.material.roughness = 0.28;
        child.material.metalness = 0.05;
      }
    });

    return cloned;
  }, [scene]);

  useFrame((state) => {
    if (!heartRef.current) return;

    const bpm = 72;
    const cycle = (state.clock.elapsedTime * bpm) / 60;
    const phase = cycle % 1;

    const lub = Math.exp(-Math.pow((phase - 0.05) / 0.06, 2));
    const dub = Math.exp(-Math.pow((phase - 0.22) / 0.05, 2));
    const heartbeat = lub + dub * 0.7;

    const baseScale = 1.65;
    const pulseScale = baseScale * (1 + heartbeat * 0.075);

    heartRef.current.scale.setScalar(pulseScale);
    heartRef.current.rotation.y += 0.0025;
    heartRef.current.position.y =
      -0.12 + Math.sin(state.clock.elapsedTime * 1.2) * 0.025;

    if (redLightRef.current) {
      redLightRef.current.intensity = 6 + heartbeat * 7;
    }
  });

  return (
    <>
      <primitive
        ref={heartRef}
        object={heartScene}
        position={[-0.1, -0.12, 0]}
      />

      <pointLight
        ref={redLightRef}
        position={[0, -3, 2]}
        color="#d00000"
        intensity={6}
        distance={7}
      />
    </>
  );
}

function HeartModel({ scrollProgress = 0 }) {
  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(190,0,0,0.5)_0%,rgba(105,0,0,0.27)_38%,transparent_72%)] blur-[42px]" />

      <Canvas camera={{ position: [0, 0, 5], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />

        <directionalLight position={[5, 6, 5]} intensity={2.2} />

        <pointLight
          position={[-3, 1, 2]}
          color="#7f0000"
          intensity={3}
          distance={6}
        />

        <Environment preset="studio" />

        <Heart />

        <CameraMotion scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/heart.glb");

export default HeartModel;