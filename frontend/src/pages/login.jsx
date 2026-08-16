import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    navigate("/patient-details");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050505] text-white">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#180303] to-[#4a0808]" />

        {/* Red glow */}
        <div className="absolute right-[-10%] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full bg-red-600/15 blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ================= HEADER ================= */}

      <header className="relative z-20 flex h-[70px] items-center justify-between px-6 lg:px-12">
        {/* Logo */}

        <button
          onClick={() => navigate("/")}
          className="text-left transition hover:opacity-80"
        >
          <h1 className="text-lg font-bold tracking-[0.18em]">
            ANATO<span className="text-red-500">MIND</span>
          </h1>

          <p className="mt-0.5 font-mono text-[5px] tracking-[0.25em] text-white/30">
            AI-POWERED ANATOMY EXPLORER
          </p>
        </button>

        {/* Back button */}

        <button
          onClick={() => navigate("/")}
          className="rounded-full border border-white/10 bg-black/20 px-4 py-2 font-mono text-[7px] uppercase tracking-[0.15em] text-white/60 transition hover:border-red-500/50 hover:text-white"
        >
          ← Back to home
        </button>
      </header>

      {/* ================= MAIN ================= */}

      <main className="relative z-10 grid h-[calc(100vh-70px)] grid-cols-1 items-center gap-6 px-6 pb-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        
        {/* ================= LEFT SIDE ================= */}

        <section className="mx-auto flex h-full w-full max-w-[500px] flex-col justify-center lg:mx-0">
          
          {/* Welcome label */}

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_red]" />

            <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-red-400">
              Welcome back
            </span>
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-[54px]">
            Enter your
            <br />

            <span className="text-red-500">health</span> space.
          </h2>

          {/* Description */}

          <p className="mt-3 text-xs leading-5 text-white/45">
            Reconnect with your health profile and continue
            exploring the human body.
          </p>

          {/* ================= LOGIN FORM ================= */}

          <form
            onSubmit={handleLogin}
            className="mt-5 rounded-[20px] border border-white/10 bg-black/40 p-5 shadow-[0_15px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            
            {/* Email */}

            <div>
              <label className="mb-2 block text-xs text-white/60">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-red-500"
              />
            </div>

            {/* Password */}

            <div className="mt-3">
              <label className="mb-2 block text-xs text-white/60">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 pr-16 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-red-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-red-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Options */}

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] text-white/35">
                🔒 Your data is encrypted
              </span>

              <button
                type="button"
                className="text-[10px] text-red-400 transition hover:text-red-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="group mt-4 flex h-11 w-full items-center justify-center gap-3 rounded-full bg-red-600 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_25px_rgba(220,38,38,0.3)] transition hover:-translate-y-0.5 hover:bg-red-500"
            >
              Enter Anatomind

              <span className="text-base transition group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Divider */}

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />

              <span className="font-mono text-[6px] tracking-[0.2em] text-white/20">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Social Login */}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="h-10 rounded-full border border-white/10 bg-black/20 text-xs text-white/60 transition hover:border-white/25"
              >
                <span className="mr-1 text-red-400">G</span>
                Google
              </button>

              <button
                type="button"
                className="h-10 rounded-full border border-white/10 bg-black/20 text-xs text-white/60 transition hover:border-white/25"
              >
                ● Apple
              </button>
            </div>

            {/* Signup */}

            <p className="mt-4 text-center text-[10px] text-white/30">
              New to AnatoMind?

              <button
                type="button"
                className="ml-1 text-red-400 transition hover:text-red-300"
              >
                Create account →
              </button>
            </p>
          </form>
        </section>

        {/* ================= RIGHT ANATOMY IMAGE ================= */}

        <section className="relative hidden h-full overflow-hidden lg:flex lg:items-center lg:justify-center">
          
          {/* Background glow */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78vh] w-[78vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[130px]" />

          {/* Outer HUD circle */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72vh] w-[72vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/10" />

          {/* Inner HUD circle */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58vh] w-[58vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/10" />

          {/* ================= HUMAN ANATOMY IMAGE ================= */}

          <img
            src="/login-anatomy.png"
            alt="Human anatomy"
            className="relative z-10 max-h-[88vh] w-auto max-w-full scale-110 object-contain drop-shadow-[0_0_55px_rgba(239,68,68,0.45)]"
          />

          {/* ================= STATUS ================= */}

          <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
            <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-red-500/20 bg-black/50 px-5 py-2 backdrop-blur-xl">
              
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_red]" />

              <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/50">
                Anatomy system online
              </span>

            </div>
          </div>

        </section>
      </main>
    </div>
  );
}