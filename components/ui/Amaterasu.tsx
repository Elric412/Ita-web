import React from 'react';
import { motion } from 'framer-motion';

const Amaterasu: React.FC = () => {
  // Generate a fixed number of particles for the flame effect
  const particles = Array.from({ length: 18 });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
    >
       {/* Backlight Pulse - Essential to make the black flames visible against the dark background */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         className="absolute w-[120%] h-[120%] max-w-[800px] max-h-[800px] bg-gradient-radial from-crimson/30 via-purple-900/10 to-transparent blur-3xl mix-blend-screen"
       />
       
       {/* The Black Flames Container using the Gooey SVG Filter */}
       <div className="relative w-full max-w-[500px] h-[500px] flex items-end justify-center pb-32" style={{ filter: 'url(#goo)' }}>
          {particles.map((_, i) => (
            <FlameParticle key={i} index={i} />
          ))}
       </div>

       {/* SVG Filter for Gooey Effect */}
       <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};

const FlameParticle: React.FC<{ index: number }> = ({ index }) => {
   // Randomize animation parameters
   // We use deterministic values based on index to avoid hydration mismatches if we were using SSR, 
   // but Math.random is fine for client-side only effects.
   const randomXOffset = (Math.random() - 0.5) * 300;
   const delay = Math.random() * 2;
   const duration = 2 + Math.random() * 2.5;
   const size = 50 + Math.random() * 70;

   return (
     <motion.div
       className="absolute bottom-0 bg-black rounded-full blur-sm"
       style={{ 
         width: size, 
         height: size,
         left: `calc(50% + ${randomXOffset}px)`
       }}
       initial={{ y: 50, scale: 0 }}
       animate={{ 
         y: -350 - Math.random() * 150,
         x: (Math.random() - 0.5) * 80,
         scale: [0, 1 + Math.random() * 0.5, 0],
       }}
       transition={{
         duration: duration,
         repeat: Infinity,
         delay: delay,
         ease: "circOut" // Starts fast (explosion) then slows
       }}
     />
   );
}

export default Amaterasu;