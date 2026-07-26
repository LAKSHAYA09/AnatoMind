import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020202] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Main red atmospheric glow */}
        <div className="absolute left-1/2 top-[20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-950/10 blur-[200px]" />

        {/* Side glow */}
        <div className="absolute right-[-200px] top-[30%] h-[600px] w-[600px] rounded-full bg-red-950/10 blur-[180px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />

      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="relative z-50 border-b border-white/[0.07]">

        <nav className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-14">

          {/* LOGO */}

          <button
            onClick={() => navigate("/dashboard")}
            className="text-left"
          >

            <div className="text-lg font-bold tracking-[0.12em]">
              ANATO<span className="text-red-500">MIND</span>
            </div>

            <div className="mt-1 font-mono text-[6px] tracking-[0.35em] text-white/25">
              DIGITAL ANATOMY SYSTEM
            </div>

          </button>


          {/* NAVIGATION */}

          <div className="hidden items-center gap-8 md:flex">

            <button className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-500">
              Dashboard
            </button>

            <button className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white">
              Anatomy
            </button>

            <button className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white">
              Reports
            </button>

            <button className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white">
              Profile
            </button>

          </div>


          {/* USER */}

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">

              <p className="text-xs text-white/70">
                Laksss
              </p>

              <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
                Member
              </p>

            </div>


            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-950/20 text-xs text-red-400">
              L
            </div>


            <button
              onClick={() => navigate("/")}
              className="hidden rounded-full border border-white/10 px-4 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-white/35 transition hover:border-red-500/40 hover:text-white sm:block"
            >
              Log Out
            </button>

          </div>

        </nav>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="relative z-10 mx-auto max-w-[1500px] px-6 py-10 sm:px-10 lg:px-14">


        {/* =================================================
            WELCOME SECTION
        ================================================== */}

        <section className="mb-10">

          <div className="flex items-center gap-3">

            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-red-400">
              AnatoMind Dashboard
            </span>

          </div>


          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">

            Welcome back,

            <span className="text-red-500">
              {" "}Laksss
            </span>

            <span className="ml-2">
              👋
            </span>

          </h1>


          <p className="mt-4 max-w-xl text-sm leading-6 text-white/35">

            Your personal anatomy workspace is ready.
            Explore the human body, understand your health,
            and continue your journey with AnatoMind.

          </p>

        </section>


        {/* =================================================
            MAIN GRID
        ================================================== */}

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">


          {/* =================================================
              EXPLORE ANATOMY - MAIN CARD
          ================================================== */}

          <div className="group relative min-h-[440px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080808]/80">

            {/* Glow */}

            <div className="absolute right-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-red-950/20 blur-[130px]" />


            {/* Content */}

            <div className="relative z-10 p-8 sm:p-10">

              <div className="flex items-start justify-between">

                <div>

                  <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-red-500">
                    Core Experience
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                    Explore Anatomy
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-white/35">
                    Step inside the human body and explore
                    organs, systems, and structures through
                    an interactive 3D experience.
                  </p>

                </div>


                <div className="hidden text-4xl opacity-80 sm:block">
                  🧬
                </div>

              </div>


              {/* BODY PLACEHOLDER */}

              <div className="absolute bottom-0 left-1/2 flex h-[260px] w-[300px] -translate-x-1/2 items-end justify-center">

                <div className="relative flex h-[230px] w-[150px] items-center justify-center">

                  {/* Glow */}

                  <div className="absolute h-[200px] w-[200px] rounded-full bg-red-900/20 blur-[70px]" />

                  {/* Temporary body icon */}

                  <div className="relative text-[150px] opacity-20 grayscale">
                    🧍
                  </div>

                </div>

              </div>


              {/* BUTTON */}

              <button className="absolute bottom-7 left-8 rounded-full bg-red-600 px-7 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] transition hover:bg-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] sm:left-10">

                Start Exploring
                <span className="ml-3">
                  →
                </span>

              </button>

            </div>

          </div>


          {/* =================================================
              RIGHT CARDS
          ================================================== */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">


            {/* HEALTH PROFILE */}

            <button className="group rounded-2xl border border-white/[0.08] bg-[#080808]/80 p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-950/[0.08]">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-950/20 text-xl">
                  🫀
                </div>

                <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-red-500">
                  →
                </span>

              </div>


              <h3 className="mt-6 text-xl font-semibold">
                My Health Profile
              </h3>

              <p className="mt-2 text-xs leading-5 text-white/30">
                View your personal health information
                and keep your profile up to date.
              </p>

            </button>


            {/* MEDICAL REPORTS */}

            <button className="group rounded-2xl border border-white/[0.08] bg-[#080808]/80 p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-950/[0.08]">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-950/20 text-xl">
                  📄
                </div>

                <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-red-500">
                  →
                </span>

              </div>


              <h3 className="mt-6 text-xl font-semibold">
                Medical Reports
              </h3>

              <p className="mt-2 text-xs leading-5 text-white/30">
                Upload and understand your medical
                reports in a simpler way.
              </p>

            </button>

          </div>

        </section>


        {/* =================================================
            BOTTOM FEATURES
        ================================================== */}

        <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


          {/* AI ASSISTANT */}

          <button className="group rounded-2xl border border-white/[0.08] bg-[#080808]/70 p-6 text-left transition hover:border-red-500/30">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/30 text-lg">
                ✦
              </div>

              <div>

                <h3 className="text-sm font-semibold">
                  AnatoMind Assistant
                </h3>

                <p className="mt-1 text-[10px] text-white/25">
                  Your intelligent anatomy companion
                </p>

              </div>

            </div>

          </button>


          {/* RECENT ACTIVITY */}

          <button className="group rounded-2xl border border-white/[0.08] bg-[#080808]/70 p-6 text-left transition hover:border-red-500/30">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/30 text-lg">
                ◷
              </div>

              <div>

                <h3 className="text-sm font-semibold">
                  Recent Activity
                </h3>

                <p className="mt-1 text-[10px] text-white/25">
                  Your latest AnatoMind activity
                </p>

              </div>

            </div>

          </button>


          {/* SYSTEM STATUS */}

          <div className="rounded-2xl border border-white/[0.08] bg-[#080808]/70 p-6">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-950/20">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

              </div>

              <div>

                <h3 className="text-sm font-semibold">
                  System Online
                </h3>

                <p className="mt-1 text-[10px] text-white/25">
                  AnatoMind services operational
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            FOOTER MESSAGE
        ================================================== */}

        <section className="mt-10 border-t border-white/[0.06] pt-6">

          <p className="text-center font-mono text-[7px] uppercase tracking-[0.3em] text-white/15">

            AnatoMind • Your body. Your understanding. Your journey.

          </p>

        </section>

      </main>

    </div>
  );
}