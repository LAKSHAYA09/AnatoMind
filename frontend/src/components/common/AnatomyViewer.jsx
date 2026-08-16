import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { Suspense } from "react";

import HumanBodyModel from "./HumanBodyModel";
import AnatomyCamera from "./AnatomyCamera";
import OrganMesh from "./OrganMesh";


// =====================================================
// LOADING
// =====================================================

function LoadingModel() {
  return (
    <div className="flex h-full min-h-[500px] items-center justify-center">
      <div className="flex flex-col items-center">

        <div className="h-10 w-10 animate-pulse rounded-full border border-[#E8352B]/40 bg-[#E8352B]/10" />

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#8A8A8A]">
          Loading Anatomy
        </p>

      </div>
    </div>
  );
}


// =====================================================
// MAIN ANATOMY VIEWER
// =====================================================

export default function AnatomyViewer({
  activeOrgan = "default",
  visualizationLevel = "organ",
}) {

  // -----------------------------------------------
  // Organ positions
  // These are highlight positions only.
  // The actual human model remains untouched.
  // -----------------------------------------------

  const organPositions = {

    left_lung: [
      -0.8,
      0.4,
      0.3,
    ],

    heart: [
      0,
      0.1,
      0.5,
    ],

    brain: [
      0,
      2.2,
      0,
    ],

    femur: [
      0.35,
      -1.2,
      0.2,
    ],

  };


  const activePosition =
    organPositions[activeOrgan] ||
    [0, 0, 0];


  const isFocused =
    activeOrgan !== "default";


  return (

    <div className="relative h-full w-full overflow-hidden">


      {/* =================================================
          3D CANVAS
      ================================================= */}

      <Canvas

        camera={{
          position: [
            0,
            0,
            8,
          ],

          fov: 35,
        }}

        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
        }}

        dpr={[
          1,
          2,
        ]}

      >


        {/* =============================================
            CAMERA
        ============================================== */}

        <AnatomyCamera
          activeOrgan={
            activeOrgan
          }
        />


        {/* =============================================
            LIGHTING
        ============================================== */}

        <ambientLight
          intensity={0.4}
        />


        <pointLight
          position={[
            3,
            4,
            5,
          ]}
          intensity={2.5}
          color="#E8352B"
        />


        <pointLight
          position={[
            -3,
            1,
            2,
          ]}
          intensity={1.2}
          color="#8B0000"
        />


        <Environment
          preset="night"
        />


        {/* =============================================
            YOUR EXISTING WORKING HUMAN MODEL
        ============================================== */}

        <Suspense
          fallback={null}
        >

          <HumanBodyModel />

        </Suspense>


        {/* =============================================
            ORGAN HIGHLIGHT
        ============================================== */}

        {activeOrgan !== "default" && (

          <OrganMesh

            active={true}

            position={
              activePosition
            }

            visualizationLevel={
              visualizationLevel
            }

          />

        )}


        {/* =============================================
            CONTROLS
        ============================================== */}

        <OrbitControls

          enableZoom={false}

          enablePan={false}

          autoRotate={
            !isFocused
          }

          autoRotateSpeed={0.4}

        />

      </Canvas>


      {/* =================================================
          LOADING OVERLAY
      ================================================= */}

      <Suspense
        fallback={
          <LoadingModel />
        }
      />


      {/* =================================================
          ANATOMY HUD
      ================================================= */}

      {activeOrgan !== "default" && (

        <div className="pointer-events-none absolute left-6 top-6 z-20">


          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E8352B]">

            Active Anatomy

          </p>


          <h3 className="mt-2 text-xl font-semibold uppercase tracking-tight text-white">

            {activeOrgan.replace(
              "_",
              " "
            )}

          </h3>


          <div className="mt-2 flex items-center gap-2">


            <span className="h-2 w-2 animate-pulse rounded-full bg-[#E8352B]" />


            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#8A8A8A]">

              {visualizationLevel} analysis

            </span>


          </div>


        </div>

      )}


      {/* =================================================
          DEFAULT STATE LABEL
      ================================================= */}

      {activeOrgan === "default" && (

        <div className="pointer-events-none absolute left-6 top-6 z-20">

          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E8352B]">

            Visual Body Map

          </p>


          <p className="mt-2 text-xs text-[#8A8A8A]">

            Interactive 3D Human Anatomy

          </p>

        </div>

      )}

    </div>

  );

}