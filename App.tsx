import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SharinganLoader from './components/ui/SharinganLoader';
import Hero from './components/sections/Hero';
import Chapter from './components/sections/Chapter';
import Footer from './components/sections/Footer';
import Navbar from './components/navigation/Navbar';
import CrowParticles from './components/ui/CrowParticles';
import GenjutsuCursor from './components/ui/GenjutsuCursor';
import VoidWhispers from './components/ui/VoidWhispers';
import SoundController from './components/ui/SoundController';
import { CHAPTERS } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GenjutsuCursor />

      <AnimatePresence mode="wait">
        {loading && (
          <SharinganLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          className="bg-uchihablack min-h-screen text-white selection:bg-crimson selection:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Global Effects */}
          <div className="vignette" />
          <VoidWhispers />
          <div 
             className="fixed inset-0 pointer-events-none z-[40] opacity-[0.05] mix-blend-overlay"
             style={{ filter: 'url(#noiseFilter)' }}
          />

          <CrowParticles density={20} />
          <Navbar />
          <SoundController />
          
          <main className="relative z-10">
            <Hero />
            
            <div className="relative">
              {CHAPTERS.map((chapter, index) => (
                <Chapter key={chapter.id} data={chapter} index={index} />
              ))}
            </div>
            
            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
};

export default App;