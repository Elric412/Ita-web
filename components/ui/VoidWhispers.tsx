import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUOTES } from '../../constants';

const VoidWhispers: React.FC = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Percentage
  
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let quoteInterval: ReturnType<typeof setInterval> | undefined;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      clearInterval(quoteInterval);
      
      // If user stops moving for 3.5 seconds, they are "lost in the void"
      idleTimer = setTimeout(() => {
        setIsIdle(true);
        
        // Pick a random quote initially
        setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
        // Pick a random position (mostly centered but slightly off)
        setPosition({ 
            x: 30 + Math.random() * 40, 
            y: 40 + Math.random() * 20 
        });

      }, 3500);
    };

    // Cycle quotes if they stay idle for a long time
    if (isIdle) {
        quoteInterval = setInterval(() => {
             setQuoteIndex(prev => (prev + 1) % QUOTES.length);
             setPosition({ 
                x: 20 + Math.random() * 60, 
                y: 30 + Math.random() * 40 
            });
        }, 6000);
    }

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer(); // Init

    return () => {
      clearTimeout(idleTimer);
      clearInterval(quoteInterval);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [isIdle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {isIdle && (
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.3 } }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute max-w-2xl text-center px-6"
            style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)' 
            }}
          >
            <p className="font-cormorant text-2xl md:text-4xl text-stone-500/80 italic leading-relaxed tracking-wide mix-blend-screen drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              "{QUOTES[quoteIndex]}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Darken the world slightly when idle to emphasize the whisper */}
      <AnimatePresence>
        {isIdle && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.4 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1 }}
               className="absolute inset-0 bg-black mix-blend-multiply"
             />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoidWhispers;