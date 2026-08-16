import { useNavigate } from "react-router-dom";
import HeartModel from "./HeartModel";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Main red glow */}
        <div className="absolute left-[50%] top-[35%] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-red-950/30 blur-[140px]" />

        {/* Secondary red glow */}
        <div className="absolute right-[-120px] top-[-100px] h-[400px] w-[400px] rounded-full bg-red-900/10 blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="relative z-50">

        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">

          {/* LOGO */}

          <button
            onClick={() => navigate("/")}
            className="text-left"
          >

            <div className="text-xl font-bold tracking-[0.16em]">
              ANATO<span className="text-red-500">MIND</span>
            </div>

            <div className="mt-0.5 font-mono text-[6px] tracking-[0.3em] text-red-500/60">
              LISTENING TO WHAT YOUR BODY SAYS. 24/7.
            </div>

          </button>


          {/* CENTER NAVIGATION */}

          <div className="hidden items-center gap-8 lg:flex">

            <button className="text-sm font-medium text-white/50 transition hover:text-white">
              Explore
            </button>

            <button className="text-sm font-medium text-white/50 transition hover:text-white">
              Systems
            </button>

            <button className="text-sm font-medium text-white/50 transition hover:text-white">
              AI Assistant
            </button>

            <button className="text-sm font-medium text-white/50 transition hover:text-white">
              Learn
            </button>

            <button className="text-sm font-medium text-white/50 transition hover:text-white">
              About
            </button>

          </div>


          {/* RIGHT NAVIGATION */}

          <div className="flex items-center gap-3">

            {/* LOGIN */}

            <button
              onClick={() => navigate("/login")}
              className="px-3 py-2 text-sm text-white/70 transition hover:text-white"
            >
              Login
            </button>


            {/* GET STARTED */}

            <button
              onClick={() => navigate("/login")}
              className="rounded-full border border-red-500/70 px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-red-400 transition duration-300 hover:bg-red-500 hover:text-white"
            >
              Get Started
            </button>

          </div>

        </nav>

      </header>


      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <main className="relative z-10 mx-auto grid h-[calc(100vh-72px)] max-w-[1400px] items-center px-6 lg:grid-cols-[1fr_1.15fr_0.5fr] lg:px-10">


        {/* =================================================
            LEFT CONTENT
        ================================================== */}

        <section className="relative z-30">

          {/* LABEL */}

          <div className="mb-4 flex items-center gap-3">

            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />

            <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-red-500">
              Welcome to AnatoMind
            </span>

          </div>


          {/* MAIN HEADING */}

          <h1 className="max-w-[560px] text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[62px] xl:text-[68px]">

            Explore the

            <br />

            Human Body

            <br />

            <span className="text-red-500">
              Like Never Before.
            </span>

          </h1>


          {/* BUTTONS */}

          <div className="mt-8 flex flex-wrap items-center gap-3">

            {/* START EXPLORING */}

            <button
              onClick={() => navigate("/login")}
              className="group flex h-12 items-center justify-center rounded-full bg-red-600 px-7 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_30px_rgba(239,68,68,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_12px_40px_rgba(239,68,68,0.4)]"
            >

              START EXPLORING

              <span className="ml-4 text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </button>


            {/* TALK TO ANATOBOT */}

            <button
              className="flex h-12 items-center justify-center rounded-full border border-white/15 px-6 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60 transition duration-300 hover:border-white/30 hover:text-white"
            >

              TALK TO ANATOBOT

              <span className="ml-3 text-red-500">
                ✦
              </span>

            </button>

          </div>

        </section>


        {/* =================================================
            CENTER 3D HEART
        ================================================== */}

        <section className="relative h-[400px] w-full lg:h-[calc(100vh-72px)]">

          {/* Smaller Heart background glow */}

          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/30 blur-[100px]" />


          {/* Smaller 3D HEART */}

          <div className="relative z-10 mx-auto h-[75%] w-[75%]">

            <HeartModel />

          </div>

        </section>


        {/* =================================================
            LIVE VITALS PANEL
        ================================================== */}

        <section className="relative z-30 hidden lg:block">

          <div className="rounded-[18px] border border-red-900/50 bg-black/70 p-5 backdrop-blur-xl">

            {/* PANEL HEADER */}

            <div className="mb-6 flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />

              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-500">
                Live Vitals
              </span>

            </div>


            {/* CARDIAC RHYTHM */}

            <div className="border-b border-white/10 pb-5">

              <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/30">
                Cardiac Rhythm
              </p>

              <div className="mt-3 h-[30px]">

                <svg
                  viewBox="0 0 200 50"
                  className="h-full w-full"
                >

                  <polyline
                    points="0,35 45,35 55,35 65,10 72,45 80,35 120,35 135,35 145,10 152,45 160,35 200,35"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />

                </svg>

              </div>

            </div>


            {/* CELLS ANALYZED */}

            <div className="border-b border-white/10 py-5">

              <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/30">
                Cells Analyzed
              </p>

              <p className="mt-2 font-mono text-2xl tracking-[0.12em]">
                12,610
              </p>

              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.25em] text-red-500">
                Live Processing
              </p>

            </div>


            {/* O2 */}

            <div className="border-b border-white/10 py-5">

              <div className="flex items-center justify-between">

                <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/30">
                  O2 Sat
                </p>

                <p className="font-mono text-base text-red-500">
                  98%
                </p>

              </div>

            </div>


            {/* HEART RATE */}

            <div className="pt-5">

              <div className="flex items-center justify-between">

                <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/30">
                  Heart Rate
                </p>

                <p className="font-mono text-base text-red-500">
                  72 BPM
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          BOTTOM STATS
      ====================================================== */}

      <div className="absolute bottom-6 left-1/2 z-30 hidden w-[58%] -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-7 py-3.5 backdrop-blur-xl lg:block">

        <div className="grid grid-cols-4 divide-x divide-white/10">

          {/* STAT 1 */}

          <div className="flex items-center justify-center gap-3">

            <span className="text-lg text-red-500">
              ♥
            </span>

            <div>

              <p className="text-base font-semibold">
                100,000
              </p>

              <p className="font-mono text-[6px] uppercase tracking-[0.18em] text-white/30">
                Beats Per Day
              </p>

            </div>

          </div>


          {/* STAT 2 */}

          <div className="flex items-center justify-center gap-3">

            <span className="text-lg text-red-500">
              ◉
            </span>

            <div>

              <p className="text-base font-semibold">
                2,000
              </p>

              <p className="font-mono text-[6px] uppercase tracking-[0.18em] text-white/30">
                Gallons of Blood
              </p>

            </div>

          </div>


          {/* STAT 3 */}

          <div className="flex items-center justify-center gap-3">

            <span className="text-lg text-red-500">
              ◷
            </span>

            <div>

              <p className="text-base font-semibold">
                1.2 Sec
              </p>

              <p className="font-mono text-[6px] uppercase tracking-[0.18em] text-white/30">
                Average Heartbeat
              </p>

            </div>

          </div>


          {/* STAT 4 */}

          <div className="flex items-center justify-center gap-3">

            <span className="text-lg text-red-500">
              ∞
            </span>

            <div>

              <p className="text-base font-semibold">
                24/7
              </p>

              <p className="font-mono text-[6px] uppercase tracking-[0.18em] text-white/30">
                Never Stops
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM LABEL
      ====================================================== */}

      <div className="absolute bottom-2 left-8 z-30 font-mono text-[6px] uppercase tracking-[0.3em] text-white/20">

        Visual Health Technology

      </div>


      <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 font-mono text-[6px] uppercase tracking-[0.3em] text-white/20">

        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-red-500" />

        Scroll to Explore

        <span className="ml-2 text-red-500">
          ↓
        </span>

      </div>

    </div>
  );
}