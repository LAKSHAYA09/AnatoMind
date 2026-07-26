import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020202] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">

        {/* Main vignette */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 65% 45%, rgba(35,5,8,0.45) 0%, rgba(5,2,3,0.85) 50%, #020202 100%)",
          }}
        />

        {/* Wide red glow connecting login + anatomy */}

        <div className="absolute left-[42%] top-[25%] h-[650px] w-[900px] rounded-full bg-red-950/20 blur-[190px]" />

        {/* Main anatomy glow */}

        <div className="absolute right-[5%] top-[25%] h-[600px] w-[600px] rounded-full bg-red-900/20 blur-[180px]" />

        {/* Subtle blue edge */}

        <div className="absolute right-[-250px] top-[10%] h-[700px] w-[350px] rounded-full bg-blue-950/10 blur-[180px]" />

        {/* Subtle grid */}

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

      </div>


      {/* ================= HEADER ================= */}

      <header className="relative z-50 flex h-[72px] items-center justify-between px-6 sm:px-10 lg:px-14">

        {/* LOGO */}

        <button
          onClick={() => navigate("/")}
          className="text-left"
        >

          <div className="text-lg font-bold tracking-[0.12em]">
            ANATO<span className="text-red-500">MIND</span>
          </div>

          <div className="mt-1 font-mono text-[6px] tracking-[0.35em] text-white/35">
            AI-POWERED ANATOMY EXPLORER
          </div>

        </button>


        {/* BACK TO HOME */}

        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.15em] text-white/55 transition hover:border-red-500/40 hover:text-white sm:px-5 sm:text-[9px]"
        >

          <span className="text-base transition-transform group-hover:-translate-x-1">
            ←
          </span>

          Back to Home

        </button>

      </header>


      {/* ================= MAIN ================= */}

      <main className="relative z-10 flex min-h-[calc(100vh-72px)] items-center px-6 pb-8 sm:px-10 lg:px-14">

        <div className="mx-auto grid w-full max-w-[1350px] items-center gap-4 lg:grid-cols-[0.9fr_1.1fr]">


          {/* ================= LOGIN ================= */}

          <section className="mx-auto w-full max-w-[460px] lg:mx-0">

            {/* WELCOME */}

            <div className="mb-3 flex items-center gap-3">

              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-red-400">
                Welcome Back
              </span>

            </div>


            {/* TITLE */}

            <h1 className="text-[40px] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-[50px]">

              Enter your

              <br />

              <span className="text-red-500">
                health
              </span>{" "}

              space.

            </h1>


            {/* DESCRIPTION */}

            <p className="mt-4 text-xs leading-5 text-white/45 sm:text-sm">

              Reconnect with your living health profile

              <br />

              and continue exploring the human body.

            </p>


            {/* ================= CARD ================= */}

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#080808]/95 shadow-[0_0_40px_rgba(239,68,68,0.08),0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">

              {/* Top red line */}

              <div className="h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />


              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-6"
              >

                {/* EMAIL */}

                <div className="mb-4">

                  <label className="mb-2 block text-[11px] text-white/60">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 text-xs text-white outline-none transition placeholder:text-white/25 focus:border-red-500/60 focus:bg-red-950/10"
                  />

                </div>


                {/* PASSWORD */}

                <div className="mb-2">

                  <label className="mb-2 block text-[11px] text-white/60">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 pr-20 text-xs text-white outline-none transition placeholder:text-white/25 focus:border-red-500/60 focus:bg-red-950/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/45 transition hover:text-red-400"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>


                {/* SECURITY */}

                <div className="mb-5 flex items-center justify-between">

                  <span className="flex items-center gap-2 text-[10px] text-white/55">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5 text-red-400"
                    >

                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />

                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />

                    </svg>

                    Your data is encrypted

                  </span>


                  <button
                    type="button"
                    className="text-[10px] text-red-500 transition hover:text-red-400"
                  >
                    Forgot password?
                  </button>

                </div>


                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-11 w-full items-center justify-center gap-4 rounded-full bg-red-600 text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_10px_35px_rgba(220,30,45,0.25)] transition hover:bg-red-500 hover:shadow-[0_15px_45px_rgba(220,30,45,0.4)] disabled:opacity-70"
                >

                  {loading ? (

                    <>

                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Signing in...

                    </>

                  ) : (

                    <>

                      Enter AnatoMind

                      <span className="text-lg transition-transform group-hover:translate-x-1">
                        →
                      </span>

                    </>

                  )}

                </button>


                {/* DIVIDER */}

                <div className="my-5 flex items-center gap-3">

                  <div className="h-px flex-1 bg-white/10" />

                  <span className="font-mono text-[8px] text-white/30">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-white/10" />

                </div>


                {/* SOCIAL */}

                <div className="grid grid-cols-2 gap-3">

                  {/* GOOGLE */}

                  <button
                    type="button"
                    className="flex h-10 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/50 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                  >

                    <span className="mr-2 font-bold text-red-500">
                      G
                    </span>

                    Google

                  </button>


                  {/* APPLE */}

                  <button
                    type="button"
                    className="flex h-10 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/50 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                  >

                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2 h-4 w-4"
                    >

                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25z" />

                    </svg>

                    Apple

                  </button>

                </div>


                {/* SIGN UP */}

                <div className="mt-5 text-center">

                  <span className="text-[10px] text-white/35">
                    New to AnatoMind?
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="ml-2 text-[10px] text-red-500 underline decoration-red-500/40 underline-offset-4 transition hover:text-red-400"
                  >
                    Create your account →
                  </button>

                </div>

              </form>

            </div>


            {/* TRUST */}

            <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[8px] uppercase tracking-[0.15em] text-white/40">

              🔒

              Your health data stays private

            </div>

          </section>


          {/* ================= ANATOMY ================= */}

          <section className="relative hidden h-[650px] w-full lg:block">


            {/* Wide red glow */}

            <div className="absolute left-[5%] top-1/2 h-[550px] w-[800px] -translate-y-1/2 rounded-full bg-red-900/15 blur-[190px]" />


            {/* Main glow */}

            <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/20 blur-[170px]" />


            {/* IMAGE */}

            <div className="absolute inset-0 flex items-center justify-center">

              <img
                src="/login-anatomy.png"
                alt="Anatomical Visualization"
                className="relative z-10 h-[125%] w-[125%] max-w-none object-contain"
              />

            </div>


            {/* STATUS */}

            <div className="absolute bottom-[4%] left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/75 px-5 py-2.5 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

                <span className="whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                  Anatomy System Online
                </span>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}