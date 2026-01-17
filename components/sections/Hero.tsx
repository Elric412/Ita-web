import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // --- Scroll Parallax ---
  // Moon moves slower than text to create depth
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // --- Mouse Interaction (Tilt) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]); // Subtle tilt
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      id="hero" 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-uchihablack perspective-2000"
    >
      {/* 1. BACKGROUND LAYERS */}
      
      {/* Deep Space / Void Texture */}
      <div className="absolute inset-0 z-0 bg-[#020202]">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      </div>

      {/* The Moon - OPTICAL CENTER */}
      <motion.div 
        style={{ y: moonY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vh] h-[65vh] md:w-[80vh] md:h-[80vh] z-0 pointer-events-none"
      >
         {/* External Glow (Atmosphere) */}
         <div className="absolute inset-0 rounded-full bg-white/5 blur-[100px]" />
         <div className="absolute inset-0 rounded-full bg-crimson/10 blur-[150px] animate-pulse-slow" />
         
         {/* The Moon Body */}
         <div className="w-full h-full rounded-full relative overflow-hidden bg-[#e2e4dd] shadow-[0_0_100px_rgba(255,255,255,0.15)] ring-1 ring-white/20">
            {/* Texture */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] mix-blend-multiply scale-150" />
            
            {/* Craters - Subtle & Realistic */}
            <div className="absolute top-[30%] left-[25%] w-[15%] h-[15%] bg-[#cbd0c4] rounded-full blur-[3px] opacity-60 mix-blend-multiply" />
            <div className="absolute bottom-[25%] right-[20%] w-[20%] h-[20%] bg-[#cbd0c4] rounded-full blur-[5px] opacity-50 mix-blend-multiply" />
            <div className="absolute top-[20%] right-[30%] w-[8%] h-[8%] bg-[#cbd0c4] rounded-full blur-[2px] opacity-40 mix-blend-multiply" />
            
            {/* Spherical Volume Shading (Inner Shadow) */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,transparent_0%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.6)_100%)]" />
         </div>
      </motion.div>

      {/* Volumetric Fog Layers */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
        <div className="absolute bottom-0 w-[200%] h-full bg-[url('https://raw.githubusercontent.com/sannidhyakalyani/fog-effect/master/fog1.png')] opacity-20 animate-fog" />
      </div>

      {/* 2. FOREGROUND CONTENT */}
      
      <motion.div 
        style={{ opacity, rotateX, rotateY, z: 100 }}
        className="relative z-20 w-full flex flex-col items-center justify-center transform-style-3d mt-12 md:mt-0"
      >
        {/* Giant Background Kanji - Subtler */}
        <motion.div 
          style={{ y: kanjiY, z: -50 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-20 whitespace-nowrap"
        >
           <span className="font-cinzel text-[45vw] text-crimson leading-none blur-[4px] mix-blend-screen">
             イタチ
           </span>
        </motion.div>

        {/* Main Title - ITACHI */}
        <div className="relative group cursor-default">
          {/* Void Halo - Darkens the moon slightly behind text for legibility */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-black/60 to-transparent blur-3xl -z-10" />

          <div className="flex items-center justify-center overflow-hidden">
             {['I', 'T', 'A', 'C', 'H', 'I'].map((char, i) => (
               <motion.span
                 key={i}
                 initial={{ y: 150, opacity: 0, filter: 'blur(20px)' }}
                 animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                 transition={{ 
                   duration: 1.4, 
                   delay: 0.5 + (i * 0.1), 
                   ease: [0.22, 1, 0.36, 1] 
                 }}
                 className="font-cormorant font-medium text-[16vw] md:text-[18vw] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-500 tracking-tighter relative inline-block transform-style-3d hover:text-crimson transition-colors duration-500 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
               >
                 {char}
               </motion.span>
             ))}
          </div>
          
          {/* Divider Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
            className="h-[1px] w-[110%] bg-gradient-to-r from-transparent via-crimson to-transparent absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen shadow-[0_0_15px_crimson]"
          />
        </div>

        {/* Subtitle */}
        <motion.div 
          style={{ y: textY }}
          className="mt-8 md:mt-12 flex flex-col items-center gap-6"
        >
          <motion.p 
            initial={{ opacity: 0, letterSpacing: '0em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ delay: 2, duration: 1.5 }}
            className="font-cinzel text-[10px] md:text-sm text-stone-300 uppercase tracking-[0.4em] text-center drop-shadow-lg bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm border border-white/5"
          >
            The Truth Within The Darkness
          </motion.p>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2.5 }}
             className="text-[9px] text-crimson/80 font-mono tracking-widest flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
            GENJUTSU: ACTIVE
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3. SCROLL PROMPT */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-geist animate-pulse">Scroll</span>
        <div className="h-16 w-[1px] bg-gradient-to-b from-stone-800 to-transparent relative overflow-hidden">
           <motion.div 
             className="absolute top-0 w-full h-[30%] bg-crimson blur-[1px]"
             animate={{ top: ['-30%', '130%'] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           />
        </div>
      </motion.div>
      
      {/* Vignette Overlay for focus */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-radial-gradient from-transparent via-transparent to-uchihablack/90" />
    </section>
  );
};

export default Hero;
