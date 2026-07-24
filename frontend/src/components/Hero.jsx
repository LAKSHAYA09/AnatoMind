import { useEffect, useState } from "react";
import HeartModel from "./HeartModel";

function VitalTicker() {
  const [cells, setCells] = useState(12552);

  useEffect(() => {
    const interval = setInterval(() => {
      setCells((value) => value + Math.floor(Math.random() * 15) + 5);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="absolute right-10 top-[18%] z-50 hidden h-[56%] w-[210px] rounded-2xl border border-red-500/20 bg-black/60 p-5 font-mono backdrop-blur-xl xl:flex xl:flex-col">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_3px_rgba(239,68,68,0.5)]" />

        <span className="text-[8px] uppercase tracking-[0.3em] text-red-400">
          Live Vitals
        </span>
      </div>

      <div className="mt-8">
        <p className="text-[7px] uppercase tracking-[0.25em] text-white/35">
          Cardiac Rhythm
        </p>

        <svg viewBox="0 0 180 50" className="mt-3 h-14 w-full">
          <path
            d="M0 25 H35 L43 25 L50 8 L58 42 L66 25 H95 L103 25 L110 12 L118 38 L126 25 H180"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="280"
            className="animate-vital-ekg"
          />
        </svg>
      </div>

      <div className="mt-7 border-t border-white/10 pt-5">
        <p className="text-[7px] uppercase tracking-[0.25em] text-white/35">
          Cells Analyzed
        </p>

        <p className="mt-2 text-2xl font-medium tracking-wider text-white">
          {cells.toLocaleString()}
        </p>

        <p className="mt-1 text-[7px] uppercase tracking-[0.2em] text-red-500/70">
          Live Processing
        </p>
      </div>

      <div className="mt-auto border-t border-white/10 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
            O2 Sat
          </span>

          <span className="text-sm font-medium tracking-wider text-red-400">
            98%
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
            Heart Rate
          </span>

          <span className="text-sm font-medium tracking-wider text-red-400">
            72 BPM
          </span>
        </div>
      </div>
    </aside>
  );
}

function BackgroundEcg() {
  return (
    <div className="pointer-events-none absolute left-0 top-[57%] z-10 w-full opacity-30">
      <svg
        viewBox="0 0 1920 180"
        className="h-44 w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 95 H280 L315 95 L335 55 L355 145 L375 95 H620 L655 95 L675 40 L695 155 L715 95 H1010 L1040 95 L1060 50 L1080 145 L1100 95 H1370 L1400 95 L1420 35 L1440 160 L1460 95 H1920"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2200"
          className="animate-background-ekg"
        />
      </svg>
    </div>
  );
}

function Hero({ scrollProgress = 0 }) {
  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#050303] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[61%] top-[43%] h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,0,0,0.4)_0%,rgba(110,0,0,0.22)_35%,rgba(35,0,0,0.08)_60%,transparent_75%)] blur-[50px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.4) 4px)",
          }}
        />
      </div>

      <BackgroundEcg />

      <div className="relative mx-auto h-full w-full max-w-[1500px] px-8 lg:px-12">
        {/* Left content */}
        <div className="absolute left-8 top-[47%] z-30 w-[42%] max-w-[560px] -translate-y-1/2 lg:left-14">
          <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-red-500">
            Welcome to AnatoMind
          </p>

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.045em] lg:text-[60px]">
            Explore the
            <br />
            Human Body
            <br />
            <span className="text-red-500">Like Never Before.</span>
          </h1>

          <div className="mt-9 flex items-center gap-4">
            <button className="rounded-full bg-red-600 px-7 py-3.5 text-[9px] uppercase tracking-[0.25em] text-white shadow-[0_0_25px_rgba(220,38,38,0.25)] transition hover:-translate-y-1 hover:bg-red-500">
              Start Exploring <span className="ml-3">→</span>
            </button>

            <button className="rounded-full border border-white/15 px-6 py-3.5 text-[9px] uppercase tracking-[0.2em] text-white/60 transition hover:-translate-y-1 hover:border-red-500/50 hover:text-white">
              Talk to AnatoBot <span className="ml-2 text-red-500">✦</span>
            </button>
          </div>
        </div>

        {/* Heart */}
        <div className="absolute left-[56%] top-[7%] z-20 h-[68%] w-[43%] -translate-x-1/2">
          <HeartModel scrollProgress={scrollProgress} />
        </div>

        {/* Right-side Vitals */}
        <VitalTicker />

        {/* Page dots */}
        <div className="absolute right-[112px] top-[77%] z-50 hidden flex-col items-center gap-4 xl:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_3px_rgba(239,68,68,0.5)]" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>

        {/* Statistics */}
        <div className="absolute bottom-[52px] left-1/2 z-50 w-[88%] max-w-[880px] -translate-x-1/2">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl sm:px-7">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 text-red-500">
                ♥
              </span>
              <div>
                <p className="text-xs font-medium">100,000</p>
                <p className="text-[6px] uppercase tracking-[0.2em] text-white/30">
                  Beats per day
                </p>
              </div>
            </div>

            <div className="hidden h-7 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 text-red-500">
                ◉
              </span>
              <div>
                <p className="text-xs font-medium">2,000</p>
                <p className="text-[6px] uppercase tracking-[0.2em] text-white/30">
                  Gallons of blood
                </p>
              </div>
            </div>

            <div className="hidden h-7 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 text-red-500">
                ◷
              </span>
              <div>
                <p className="text-xs font-medium">1.2 Sec</p>
                <p className="text-[6px] uppercase tracking-[0.2em] text-white/30">
                  Average heartbeat
                </p>
              </div>
            </div>

            <div className="hidden h-7 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 text-red-500">
                ∞
              </span>
              <div>
                <p className="text-xs font-medium">24/7</p>
                <p className="text-[6px] uppercase tracking-[0.2em] text-white/30">
                  Never stops
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="absolute bottom-5 left-8 z-50 text-[7px] uppercase tracking-[0.4em] text-white/20">
          Visual Health Technology
        </p>

        <div className="absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          <p className="text-[7px] uppercase tracking-[0.4em] text-white/30">
            Scroll to Explore
          </p>
          <span className="text-xs text-red-500">↓</span>
        </div>

        <div className="absolute bottom-5 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/50 bg-black/70 backdrop-blur-xl">
          <svg viewBox="0 0 100 40" width="40" height="24">
            <path
              d="M0 20 H20 L28 20 L36 20 L43 5 L50 35 L57 20 H72 L80 20 L87 10 L93 30 L100 20"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes vitalEkgDraw {
          0% { stroke-dashoffset: 280; opacity: 0.15; }
          15% { opacity: 1; }
          65% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -280; opacity: 0.15; }
        }

        @keyframes backgroundEkg {
          0% { stroke-dashoffset: 2200; opacity: 0.1; }
          25% { opacity: 0.75; }
          60% { stroke-dashoffset: 0; opacity: 0.6; }
          100% { stroke-dashoffset: -2200; opacity: 0.1; }
        }

        .animate-vital-ekg {
          stroke-dashoffset: 280;
          animation: vitalEkgDraw 2s linear infinite;
        }

        .animate-background-ekg {
          stroke-dashoffset: 2200;
          animation: backgroundEkg 5s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;