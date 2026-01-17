import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { audioManager } from '../../utils/audio';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id);
      
      // Find the section that occupies the middle of the screen
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the middle of the screen falls within this element
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    audioManager.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id);
    audioManager.playHover();
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-6 pointer-events-none"
    >
      {NAV_ITEMS.map((item) => (
        <div 
          key={item.id} 
          className="relative flex items-center justify-end group pointer-events-auto"
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => scrollTo(item.id)}
        >
          {/* Label */}
          <AnimatePresence>
            {(hoveredItem === item.id || activeSection === item.id) && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: -16 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 whitespace-nowrap"
              >
                <span className={`font-cinzel text-[10px] tracking-[0.2em] uppercase ${activeSection === item.id ? 'text-crimson' : 'text-stone-500'}`}>
                  {item.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dot Indicator */}
          <motion.button
            layout
            className={`rounded-full transition-all duration-300 relative ${
              activeSection === item.id ? 'w-1 h-8 bg-crimson' : 'w-1 h-1 bg-white/20 hover:bg-white/60'
            }`}
            whileHover={{ scale: 1.5 }}
          >
             {activeSection === item.id && (
                <motion.div 
                   layoutId="active-glow"
                   className="absolute inset-0 bg-crimson blur-[4px] rounded-full"
                />
             )}
          </motion.button>
        </div>
      ))}
      
      {/* Decorative Line */}
      <div className="absolute top-0 bottom-0 right-[1.5px] w-[1px] bg-white/5 -z-10" />
    </motion.nav>
  );
};

export default Navbar;