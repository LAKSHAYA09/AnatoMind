import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <main className="min-h-[200vh] bg-[#050303]">
      <div className="sticky top-0 h-screen">
        <Navbar />
        <Hero scrollProgress={scrollProgress} />
      </div>

      <section className="relative z-20 flex min-h-screen items-center justify-center bg-gradient-to-b from-transparent via-[#090303] to-[#050303] px-8 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-red-500">
            Interactive Anatomy
          </p>

          <h2 className="mt-6 text-4xl font-semibold text-white md:text-6xl">
            Explore Beyond the Surface.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-white/50">
            Continue scrolling to move through the heart and enter AnatoMind’s
            interactive anatomy platform.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;