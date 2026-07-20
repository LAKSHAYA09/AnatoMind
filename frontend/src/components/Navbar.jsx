function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-slate-950 text-white">
      <h1 className="text-3xl font-bold text-cyan-400">
        🧠 AnatoMind
      </h1>

      <div className="flex gap-8 text-lg">
        <a href="#" className="hover:text-cyan-400 transition">
          Home
        </a>

        <a href="#" className="hover:text-cyan-400 transition">
          Systems
        </a>

        <a href="#" className="hover:text-cyan-400 transition">
          Quiz
        </a>

        <a href="#" className="hover:text-cyan-400 transition">
          About
        </a>
      </div>
    </nav>
  );
}

export default Navbar;