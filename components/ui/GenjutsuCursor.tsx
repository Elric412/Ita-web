import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GenjutsuCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse position state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth following (The "Delay" of the Genjutsu)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Rotation based on movement (Dynamic Eye Tracking)
  // We'll calculate a simple rotation based on velocity later or just spin on hover
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
        
      setIsHovering(!!isInteractive);
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary Dot (The Pupil - Instant) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-crimson rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Secondary Ring (The Iris - Lagging) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className={`relative border border-crimson/80 rounded-full flex items-center justify-center transition-colors duration-300 ${isHovering ? 'bg-crimson/10' : 'bg-transparent'}`}
          animate={{
            width: isHovering ? 48 : 24,
            height: isHovering ? 48 : 24,
            rotate: isHovering ? 180 : 0, // Spin when focusing on target
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.4, ease: "circOut" }}
        >
          {/* Tomoe markings that appear on hover */}
          <motion.div 
            className="absolute inset-0"
            animate={{ opacity: isHovering ? 1 : 0 }}
          >
             {[0, 120, 240].map((deg) => (
               <div 
                 key={deg}
                 className="absolute top-1 w-1.5 h-1.5 bg-crimson rounded-full"
                 style={{ 
                   left: '50%', 
                   transform: `translateX(-50%) rotate(${deg}deg) translateY(-2px)`, 
                   transformOrigin: 'center 22px' // Rotate around center of expanded ring
                 }}
               />
             ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default GenjutsuCursor;
