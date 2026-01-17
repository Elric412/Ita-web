import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../../utils/audio';

interface SharinganLoaderProps {
  onComplete: () => void;
}

const SharinganLoader: React.FC<SharinganLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    // Sequence Logic:
    // 0: Init
    // 1: Eye Open -> "Reality"
    // 2: Spin Up (Accelerating) -> "Illusion"
    // 3: SNAP (Instant Switch) -> "TSUKUYOMI" -> SOUND EFFECT
    // 4: Hold (Genjutsu Effect)
    // 5: Bleed
    // 6: Complete
    
    const seq = [
      setTimeout(() => { setStage(1); setText("REALITY"); }, 200),
      setTimeout(() => { setStage(2); setText("ILLUSION"); }, 1200), // Start spinning
      setTimeout(() => { 
          setStage(3); 
          setText("TSUKUYOMI"); 
          // Attempt to play sound, might be blocked by browser policy until user gesture, 
          // but we try anyway for "refresh" scenarios or if user has interacted.
          audioManager.playActivation(); 
      }, 2400), // SNAP! (The Genjutsu triggers)
      setTimeout(() => setStage(4), 2600), // Pulse
      setTimeout(() => setStage(5), 3600), // Bleed
      setTimeout(() => onComplete(), 4600)
    ];

    return () => seq.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-uchihablack flex items-center justify-center overflow-hidden cursor-none"
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', transition: { duration: 1.2, ease: "easeInOut" } }}
    >
      <div className="relative w-[80vw] max-w-[500px] aspect-square flex items-center justify-center">
        
        {/* Glow/Bloom Background - Subtle Pulse */}
        <motion.div 
          className="absolute inset-0 bg-crimson rounded-full blur-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 1 ? [0.1, 0.25, 0.1] : 0 }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* The Eye Container */}
        <motion.div 
          className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border-[1px] border-white/5 bg-black"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: stage >= 1 ? 1 : 0.8, opacity: stage >= 1 ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Iris Texture - High Fidelity */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#b91c1c_0%,#991b1b_30%,#450a0a_70%,#000000_100%)]">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
             <div className="absolute inset-0 bg-[repeating-conic-gradient(rgba(0,0,0,0.4)_0deg,rgba(0,0,0,0.4)_1deg,transparent_1deg,transparent_3deg)] mix-blend-multiply opacity-50" />
             <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/90" />
          </div>

          {/* Pattern Container - Physics: Accel -> SNAP -> Stop */}
          <motion.div 
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ 
              rotate: stage === 2 ? 720 : stage >= 3 ? 720 : 0 
            }}
            transition={{ 
              rotate: { 
                duration: stage === 2 ? 1.2 : 0, // 1s spin, 0s stop (Instant Snap)
                ease: stage === 2 ? "circIn" : "linear" 
              }
            }}
          >
             {/* 3-Tomoe Mode (Base) */}
             <motion.div
               className="absolute inset-0"
               animate={{ opacity: stage >= 3 ? 0 : 1 }}
               transition={{ duration: 0.05 }} // Fast disappearance
             >
                {/* Center Pupil */}
                <div className="absolute top-1/2 left-1/2 w-[15%] h-[15%] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
                
                {/* Connecting Ring */}
                <div className="absolute inset-[27%] border-[1px] border-black/40 rounded-full" />

                {[0, 120, 240].map((deg) => (
                  <div key={deg} className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
                    <div className="absolute top-[14%] left-1/2 transform -translate-x-1/2 w-[12%] h-[12%] bg-black rounded-full">
                       <div className="absolute -bottom-1 w-full h-[140%] bg-black rounded-full skew-x-[15deg] origin-top scale-y-125" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                    </div>
                  </div>
                ))}
             </motion.div>

             {/* Itachi Mangekyo Mode (Morph Target) */}
             <motion.div
               className="absolute inset-0 flex items-center justify-center"
               initial={{ opacity: 0, scale: 1.4 }}
               animate={{ 
                 opacity: stage >= 3 ? 1 : 0,
                 scale: stage >= 3 ? 1 : 1.4, // Slam into position
               }}
               transition={{ 
                 duration: 0.15, 
                 type: "spring", 
                 stiffness: 400, 
                 damping: 25 
               }}
             >
                {/* 
                   Perfected Geometry for Itachi's Mangekyo 
                   Using cubic bezier curves relative to center (50,50)
                */}
                <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] overflow-visible drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                   <g fill="black">
                     {/* Center Pupil - Perfectly Aligned */}
                     <circle cx="50" cy="50" r="11" />
                     
                     {/* The 3 Blades - Rotationally Symmetric */}
                     {[0, 120, 240].map(deg => (
                       <g key={deg} transform={`rotate(${deg} 50 50)`}>
                          {/* 
                             Blade Logic:
                             Start at center (50,50).
                             Control Point 1 pulls OUT and RIGHT.
                             Control Point 2 pulls IN and RIGHT.
                             End at Center.
                             This creates the signature curved shuriken shape.
                           */}
                          <path d="M 50 50 C 60 50, 90 35, 68 5 C 60 5, 50 35, 50 50 Z" />
                       </g>
                     ))}
                   </g>
                </svg>
             </motion.div>
          </motion.div>

          {/* Visual Shockwave on Snap */}
          {stage === 3 && (
            <motion.div 
               className="absolute inset-0 border-[40px] border-crimson/30 rounded-full z-40"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1.2, opacity: 0 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}

          {/* Amaterasu Bleed Effect */}
          <motion.div 
            className="absolute inset-0 z-30 pointer-events-none"
            animate={{ opacity: stage >= 5 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-90" />
          </motion.div>
          
        </motion.div>
        
        {/* Cinematic Text Overlay */}
        <AnimatePresence mode="wait">
          {text && (
            <motion.div 
              key={text}
              className="absolute -bottom-32 text-center w-full z-50"
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.5 }}
            >
              <p className={`font-cinzel text-lg tracking-[0.5em] font-bold drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] ${text === 'TSUKUYOMI' ? 'text-crimson scale-125' : 'text-stone-400'}`}>
                {text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SharinganLoader;