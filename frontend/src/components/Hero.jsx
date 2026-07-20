function Hero() {
  return (
    <section className="min-h-[80vh] bg-slate-900 text-white flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-6xl font-extrabold mb-6">
        Explore the Human Body
      </h1>

      <p className="text-xl text-gray-300 max-w-2xl">
        Learn anatomy through interactive visuals, quizzes, and AI-powered explanations.
      </p>

      <button className="mt-8 px-8 py-4 bg-cyan-500 rounded-xl text-xl font-semibold hover:bg-cyan-400 transition">
        Start Learning
      </button>
    </section>
  );
}

export default Hero;