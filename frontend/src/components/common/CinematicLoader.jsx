import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANNOTATIONS = [
  { id: 1, text: "Aorta Arch", x: 74, y: 14, lineX: 58, lineY: 22, align: "right" },
  { id: 2, text: "Pulmonary Arteries", x: 12, y: 22, lineX: 38, lineY: 24, align: "left" },
  { id: 3, text: "Left Ventricle", x: 78, y: 64, lineX: 60, lineY: 58, align: "right" },
  { id: 4, text: "Myocardium", x: 14, y: 70, lineX: 34, lineY: 62, align: "left" }
];

export default function CinematicLoader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [isRevealFlashing, setIsRevealFlashing] = useState(false);
  
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);

  // 1. Sync percent loading progression (1.5 seconds)
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      if (start < 100) {
        start += 1;
        setPercent(start);
      } else {
        clearInterval(interval);
        // Peak visual completion triggers flash reveal
        setIsRevealFlashing(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }
    }, 45); // ~4.5 seconds total sequence

    return () => clearInterval(interval);
  }, [onComplete]);

  // 2. Synthesize organic "lub-dub" heartbeat sound
  const playHeartbeatAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Synthesize low-frequency nodes
      const playNode = (frequency, duration, delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(8, ctx.currentTime + delay + duration);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration + 0.1);
      };

      // Lub sound (low pitch)
      playNode(50, 0.15, 0);
      // Dub sound (slightly higher pitch, 150ms later)
      playNode(62, 0.12, 0.15);
      
      setIsAudioInitialized(true);
    } catch (err) {
      console.warn("Web Audio API failed:", err);
    }
  };

  // 3. Keep heartbeat audio loop active at 60 BPM (1000ms cycle)
  useEffect(() => {
    // Check state first. Auto-trigger if clicked or authorized
    const audioInterval = setInterval(() => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        playHeartbeatAudio();
      }
    }, 1000);

    // Initial click listener to resume/activate AudioContext
    const handleFirstInteraction = () => {
      playHeartbeatAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      clearInterval(audioInterval);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // 4. Subtle background particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * -0.3 - 0.05,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 90, 121, 0.3)'; // Soft crimson tint
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Anatomical Heart SVG outlines
  const heartOutlinePath = "M50,28 C62,28 72,37 72,50 C72,65 54,78 50,82 C46,78 28,65 28,50 C28,37 38,28 50,28 Z";
  const aortaArchPath = "M48,24 C48,16 56,13 60,18 C62,21 60,25 56,26";
  const venaCavaPaths = "M40,24 L40,17 M34,26 L34,19";

  return (
    <div className="fixed inset-0 z-[99999] bg-[#02040a] flex flex-col items-center justify-between p-8 md:p-12 overflow-hidden select-none font-sans">
      
      {/* Background canvas and grids */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 90, 121, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top micro HUD bar */}
      <div className="w-full flex justify-between items-center z-10 opacity-60">
        <span className="font-mono text-[9px] text-[#ff5a79] tracking-widest">
          CARDIOVASCULAR SCANNER
        </span>
        <span className="font-mono text-[9px] text-slate-500">
          SYS_SYNC: READY
        </span>
      </div>

      {/* Main visual core centering the heart */}
      <div className="relative flex-1 flex flex-col items-center justify-center py-6 w-full max-w-lg z-10">
        
        {/* Heart container with pulsing glows */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          
          {/* Concentric expanding ripples (Rhythm of Life) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-28 h-28 border border-[#ff5a79]/15 rounded-full animate-ripple" />
            <div className="absolute w-28 h-28 border border-[#ff5a79]/10 rounded-full animate-ripple [animation-delay:0.3s]" />
            <div className="absolute w-28 h-28 border border-[#ff5a79]/5 rounded-full animate-ripple [animation-delay:0.6s]" />
          </div>

          {/* Glowing heartbeat body backdrop */}
          <div className="absolute w-36 h-36 bg-[#ff5a79]/5 rounded-full blur-2xl animate-pulse" />

          {/* Floating Medical Annotations */}
          {percent > 30 && (
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-700 pointer-events-none z-0">
              {ANNOTATIONS.map((ann) => {
                const isVisible = percent > 30 + ann.id * 10;
                return isVisible && (
                  <motion.path
                    key={ann.id}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.25 }}
                    transition={{ duration: 0.8 }}
                    d={`M${ann.x},${ann.y} L${ann.lineX},${ann.lineY}`}
                    fill="none"
                    stroke="#ff5a79"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                );
              })}
            </svg>
          )}

          {/* Frosted text chips for labels */}
          {ANNOTATIONS.map((ann) => {
            const isVisible = percent > 30 + ann.id * 10;
            return (
              <AnimatePresence key={ann.id}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-10"
                    style={{
                      top: `${ann.y}%`,
                      left: ann.align === "left" ? `${ann.x}%` : "auto",
                      right: ann.align === "right" ? `${100 - ann.x}%` : "auto",
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <div className="px-2.5 py-1 rounded-full border border-white/[0.04] bg-[#0c0f1d]/60 backdrop-blur-md text-[9px] font-medium text-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      {ann.text}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}

          {/* Central Anatomical Heart Outline SVG */}
          <motion.div
            className="w-28 h-28 md:w-36 md:h-36 text-[#ff5a79] z-20 flex items-center justify-center cursor-pointer animate-glow-pulse"
            onClick={playHeartbeatAudio}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2">
              {/* Vena Cava Tubes */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0.1 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5 }}
                d={venaCavaPaths}
              />
              {/* Aorta Arch */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0.1 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                d={aortaArchPath}
              />
              {/* Main Cardiac Muscle */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0.1 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ type: "spring", duration: 3, bounce: 0, delay: 0.6 }}
                d={heartOutlinePath}
              />
              {/* Arteries / veins layout detailing */}
              <path d="M48,42 C44,48 43,56 46,64" stroke="currentColor" strokeWidth="0.6" className="opacity-40" strokeDasharray="1,1" />
              <path d="M54,44 C56,51 54,60 51,68" stroke="currentColor" strokeWidth="0.6" className="opacity-40" strokeDasharray="1,1" />
            </svg>
          </motion.div>
        </div>

        {/* Brand name emerging elegantly */}
        <div className="mt-8 text-center min-h-[40px] flex flex-col items-center justify-center">
          <AnimatePresence>
            {percent > 55 && (
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                className="text-slate-100 font-extralight text-lg md:text-xl uppercase transition-all"
              >
                ANATOMIND
              </motion.h1>
            )}
          </AnimatePresence>
          <span className="font-mono text-[9px] text-[#ff5a79]/50 tracking-wider mt-1">
            SYNAPSE CONNECTION: {percent}%
          </span>
        </div>
      </div>

      {/* Bottom audio alert helper */}
      <div className="w-full flex justify-center z-10 select-none">
        <AnimatePresence>
          {!isAudioInitialized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-mono text-[8px] text-slate-500 tracking-wider text-center"
            >
              [ CLICK ANYWHERE TO INITIALIZE AUDITORY TELEMETRY ]
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full screen cyan transition overlay */}
      <AnimatePresence>
        {isRevealFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-[#00d2ff] z-[999999] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
