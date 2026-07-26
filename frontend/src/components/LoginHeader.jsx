import { useNavigate } from "react-router-dom";

export default function LoginHeader() {
  const navigate = useNavigate();

  return (
    <header className="absolute left-0 right-0 top-0 z-50">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

        {/* LOGO */}

        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2.5"
        >

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-950/20 transition-all duration-300 group-hover:border-red-500/60 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]">

            <span className="text-lg text-red-500">
              ♥
            </span>

          </div>


          <div className="text-left">

            <h1 className="text-xs font-semibold tracking-[0.25em] text-white">
              ANATOMIND
            </h1>

            <p className="mt-0.5 text-[5px] tracking-[0.3em] text-red-500/60">
              AI-POWERED ANATOMY EXPLORER
            </p>

          </div>

        </button>


        {/* BACK TO HOME */}

        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:bg-red-950/20 hover:text-white"
        >

          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          Back to Home

        </button>

      </div>

    </header>
  );
}