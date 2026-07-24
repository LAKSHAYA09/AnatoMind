function CinematicLoader({ onComplete }) {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950">
      <button
        onClick={onComplete}
        className="rounded-xl bg-cyan-500 px-10 py-5 text-xl font-bold text-slate-950 transition hover:scale-105 hover:bg-cyan-400"
      >
        ENTER ANATOMIND
      </button>
    </div>
  );
}

export default CinematicLoader;