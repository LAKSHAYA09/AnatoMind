import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CinematicLoader from "../components/common/CinematicLoader";

function Home() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <>
      {/* Cinematic Loader mounts on entry and unmounts once the boot logs terminate */}
      <CinematicLoader onComplete={() => setIsBooted(true)} />

      {/* Render core home environment once loader finishes */}
      {isBooted && (
        <div className="animate-fade-in duration-700">
          <Navbar />
          <Hero />
        </div>
      )}
    </>
  );
}

export default Home;