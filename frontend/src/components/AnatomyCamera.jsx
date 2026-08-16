import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// =====================================================
// CAMERA PRESETS
// =====================================================

const CAMERA_PRESETS = {
  default: {
    position: new THREE.Vector3(0, 0, 8),
    target: new THREE.Vector3(0, 0, 0),
  },

  left_lung: {
    position: new THREE.Vector3(-1.6, 0.4, 3.2),
    target: new THREE.Vector3(-0.8, 0.4, 0),
  },

  heart: {
    position: new THREE.Vector3(0, 0.3, 3),
    target: new THREE.Vector3(0, 0.2, 0),
  },

  brain: {
    position: new THREE.Vector3(0, 1.8, 3.5),
    target: new THREE.Vector3(0, 1.7, 0),
  },
};


// =====================================================
// ANATOMY CAMERA
// =====================================================

export default function AnatomyCamera({
  activeOrgan = "default",
}) {

  const { camera } = useThree();

  // Current smooth camera position
  const currentPosition = useRef(
    new THREE.Vector3()
  );

  // Current smooth look-at target
  const currentTarget = useRef(
    new THREE.Vector3()
  );


  // ===================================================
  // INITIAL CAMERA SETUP
  // ===================================================

  useEffect(() => {

    const preset =
      CAMERA_PRESETS[activeOrgan] ||
      CAMERA_PRESETS.default;


    // Start camera at current position
    currentPosition.current.copy(
      camera.position
    );


    // Start target at preset target
    currentTarget.current.copy(
      preset.target
    );

  }, []);


  // ===================================================
  // CAMERA MOVEMENT
  // ===================================================

  useFrame((state, delta) => {

    const preset =
      CAMERA_PRESETS[activeOrgan] ||
      CAMERA_PRESETS.default;


    // -------------------------------------------------
    // Frame-rate independent smoothing
    // -------------------------------------------------

    const smoothSpeed =
      1 - Math.exp(-5 * delta);


    // -------------------------------------------------
    // Smooth camera position
    // -------------------------------------------------

    currentPosition.current.lerp(
      preset.position,
      smoothSpeed
    );


    // -------------------------------------------------
    // Smooth camera look-at target
    // -------------------------------------------------

    currentTarget.current.lerp(
      preset.target,
      smoothSpeed
    );


    // -------------------------------------------------
    // Apply camera position
    // -------------------------------------------------

    camera.position.copy(
      currentPosition.current
    );


    // -------------------------------------------------
    // Apply camera look-at
    // -------------------------------------------------

    camera.lookAt(
      currentTarget.current
    );

  });


  return null;
}