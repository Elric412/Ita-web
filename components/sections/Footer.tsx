import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../../utils/audio';

const TOMOE_QUOTES = [
  "Self-sacrifice.",
  "Protect the peace.",
  "Honor the name."
];

const Footer: React.FC = () => {
  const [activeTomoe, setActiveTomoe] = useState<number | null>(null);

  const handleMouseEnter = (i: number) => {
    setActiveTomoe(i);
    audioManager.playHover();
  };

  return (
    <footer className="relative py-24 px-4 bg-void text-center overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="w-16 h-[1px] bg-crimson mx-auto mb-8" />
          
          <h2 className="font-cormorant text-3xl md:text-5xl text-white italic mb-6">
            "Forgive me, Sasuke."
          </h2>
          
          <p className="font-geist text-xs text-stone-600 uppercase tracking-[0.3em] mb-12">
            The Truth within the Darkness
          </p>
          
          {/* Interactive Tomoe Section */}
          <div className="flex justify-center gap-16 mb-12 h-8 items-center relative">
             {TOMOE_QUOTES.map((quote, i) => (
               <div 
                 key={i} 
                 className="relative group"
                 onMouseEnter={() => handleMouseEnter(i)}
                 onMouseLeave={() => setActiveTomoe(null)}
               >
                 {/* The Tomoe Icon */}
                 <motion.div 
                    className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-500 ${activeTomoe === i ? 'bg-crimson shadow-[0_0_15px_crimson]' : 'bg-stone-800'}`}
                    animate={{ scale: activeTomoe === i ? 1.5 : 1 }}
                 />
                 
                 {/* Reveal Quote on Hover */}
                 <AnimatePresence>
                   {activeTomoe === i && (
                     <motion.div
                       initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                       animate={{ opacity: 1, y: 20, filter: 'blur(0px)' }}
                       exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                       className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                     >
                       <span className="font-cinzel text-[10px] text-crimson tracking-widest uppercase">
                         {quote}
                       </span>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
          </div>

          <div className="text-stone-800 text-[10px] font-mono">
            DESIGN SYSTEM: TSUKUYOMI v1.0 <br/>
            PROJECT: ITACHI MEMORIAL
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;