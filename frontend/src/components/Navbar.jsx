function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-50 w-full px-8 py-6 lg:px-12">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg
            width="38"
            height="42"
            viewBox="0 0 80 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 78C35 69 12 52 10 32C8 16 18 8 30 12C36 14 39 20 40 24C41 20 44 14 50 12C62 8 72 16 70 32C68 52 45 69 40 78Z"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35 24C31 17 27 9 29 3"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M42 24C43 15 47 8 51 3"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M32 19C27 14 23 11 18 10"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M47 18C52 13 57 10 62 10"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div>
            <p className="text-lg font-semibold tracking-[0.22em] text-white">
              ANATOMIND
            </p>

            <p className="mt-1 text-[7px] tracking-[0.18em] text-red-400/75">
              LISTENING TO WHAT YOUR BODY SAYS, 24/7.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          <a className="text-xs text-white/60 transition hover:text-red-400">
            Explore
          </a>

          <a className="text-xs text-white/60 transition hover:text-red-400">
            Systems
          </a>

          <a className="text-xs text-white/60 transition hover:text-red-400">
            AI Assistant
          </a>

          <a className="text-xs text-white/60 transition hover:text-red-400">
            Learn
          </a>

          <a className="text-xs text-white/60 transition hover:text-red-400">
            About
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="text-xs text-white/60 transition hover:text-white">
            Login
          </button>

          <button className="rounded-full border border-red-500/50 bg-red-600/10 px-5 py-2.5 text-[9px] tracking-[0.2em] text-red-400 transition hover:bg-red-600 hover:text-white">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;