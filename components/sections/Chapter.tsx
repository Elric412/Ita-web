import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ChapterDataWithKanji } from '../../constants';
import Amaterasu from '../ui/Amaterasu';

interface ChapterProps {
  data: ChapterDataWithKanji;
  index: number;
}

// --- VISUALS DEFINED BEFORE COMPONENT TO AVOID HOISTING ISSUES ---

const ProdigyVisual = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const rotate = useTransform(scrollY, [0, 1], [0, 180]);
  const rotateReverse = useTransform(scrollY, [0, 1], [0, -90]);
  
  return (
    <div className="relative w-[80%] h-[80%]">
      {/* Concentric Geometry */}
      <motion.div style={{ rotate }} className="absolute inset-0 border border-white/20 rounded-full border-dashed" />
      <motion.div style={{ rotate: rotateReverse }} className="absolute inset-[15%] border border-white/30 rounded-full border-dotted" />
      <div className="absolute inset-[30%] border border-white/10 rounded-full" />
      
      {/* Center Target */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_30px_white]" />
      
      {/* Scanning Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent animate-spin-slow opacity-50" />
    </div>
  );
};

const MassacreVisual = ({ kanji, scrollY }: { kanji: string, scrollY: MotionValue<number> }) => {
  // Make the kanji shake when near the edges (0 or 1)
  const shake = useTransform(scrollY, [0.4, 0.5, 0.6], ["-2px", "0px", "2px"]);
  
  return (
    <div className="relative w-full h-full">
        {/* Chaotic Red/Black Glitch */}
        <div className="absolute inset-0 bg-crimson/10 mix-blend-overlay animate-pulse" />
        
        {/* Glitch Text */}
        <motion.div style={{ x: shake }} className="absolute inset-0 flex items-center justify-center">
          <span className="font-cinzel text-9xl font-bold text-crimson/40 blur-sm glitch-wrapper scale-150" data-text={kanji}>
            {kanji}
          </span>
        </motion.div>
        
        {/* Slash Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 rotate-12 transform origin-left shadow-[0_0_10px_white]" 
          />
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute top-1/3 right-0 w-full h-[1px] bg-crimson/60 -rotate-12 transform origin-right shadow-[0_0_10px_crimson]" 
          />
        </div>
    </div>
  );
}

const AkatsukiVisual = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const y = useTransform(scrollY, [0, 1], [20, -20]);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 animate-[float_6s_ease-in-out_infinite]">
         {/* Cloud 1 */}
         <svg className="absolute top-[20%] right-[10%] w-32 h-20 text-crimson/80 fill-current drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]" viewBox="0 0 100 60">
           <path d="M20,40 Q10,40 10,30 Q10,10 30,10 Q40,0 60,10 Q80,0 90,20 Q100,20 100,30 Q100,50 80,50 L20,50" />
           <path d="M20,40 Q10,40 10,30 Q10,10 30,10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5"/>
         </svg>
      </motion.div>
      <motion.div style={{ y: useTransform(y, v => -v) }} className="absolute inset-0 animate-[float_8s_ease-in-out_infinite_reverse]">
         {/* Cloud 2 */}
         <svg className="absolute bottom-[20%] left-[10%] w-40 h-24 text-crimson/60 fill-current blur-[1px]" viewBox="0 0 100 60">
           <path d="M20,40 Q10,40 10,30 Q10,10 30,10 Q40,0 60,10 Q80,0 90,20 Q100,20 100,30 Q100,50 80,50 L20,50" />
         </svg>
      </motion.div>
    </div>
  );
}

const TechniquesVisual = () => (
  <div className="w-full h-full relative">
     <Amaterasu />
     {/* Eye Overlay */}
     <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay opacity-30">
        <div className="w-[80%] h-[80%] border border-crimson rounded-full animate-spin-slow" />
     </div>
  </div>
);

const BattleVisual = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const pulse = useTransform(scrollY, [0.3, 0.5, 0.7], [1, 1.2, 1]);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Susanoo Ribs Abstract */}
      <motion.div style={{ scale: pulse }} className="absolute w-[60%] h-[80%] border-x-4 border-crimson/40 rounded-[50%] blur-sm shadow-[0_0_20px_crimson]" />
      <div className="absolute w-[40%] h-[60%] border-x-4 border-crimson/60 rounded-[50%]" />
      <div className="absolute w-[20%] h-[40%] border-x-4 border-crimson/80 rounded-[50%] bg-crimson/10" />
      
      {/* Energy crackles */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20 mix-blend-color-dodge animate-pulse" />
    </div>
  );
}

const LegacyVisual = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const opacity = useTransform(scrollY, [0.4, 0.6], [0, 1]);
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
       {/* Feathers */}
       {[...Array(5)].map((_, i) => (
         <div 
           key={i}
           className="absolute w-8 h-20 bg-white/10 rounded-[100%] blur-sm"
           style={{
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             transform: `rotate(${Math.random() * 360}deg)`,
             animation: `float ${5 + Math.random() * 5}s infinite`
           }}
         />
       ))}
       <div className="absolute inset-0 bg-gradient-to-t from-uchihablack via-transparent to-transparent" />
       <motion.div style={{ opacity }} className="text-stone-600 font-cinzel text-xs tracking-[1em] absolute bottom-10">
         REMEMBER
       </motion.div>
    </div>
  );
}

const DefaultVisual = () => <div className="w-20 h-20 bg-white/10 rotate-45" />;

// --- CINEMATIC TITLE COMPONENT ---
const GlitchTitle = ({ text, distortion }: { text: string, distortion: MotionValue<number> }) => {
  const redShadow = useTransform(distortion, (v) => `${v}px 0px 0px rgba(255,0,0,0.5)`);
  const blueShadow = useTransform(distortion, (v) => `-${v}px 0px 0px rgba(0,255,255,0.5)`);
  const textShadow = useMotionTemplate`${redShadow}, ${blueShadow}`;
  
  // Occasional opacity flicker based on distortion level
  const opacity = useTransform(distortion, (v) => v > 3 ? 0.8 : 1);

  return (
    <motion.h2 
      style={{ textShadow, opacity }}
      className="font-cinzel text-4xl md:text-6xl text-white mix-blend-lighten shadow-black drop-shadow-lg relative"
    >
      {text}
    </motion.h2>
  );
}


// --- MAIN COMPONENT ---

const Chapter: React.FC<ChapterProps> = ({ data, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // --- Cinematic Transitions ---
  
  // 1. Zoom & Depth
  const scale = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0.8, 1, 1.2]);
  
  // 2. Visibility
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // 3. Genjutsu Blur
  const blurValue = useTransform(smoothProgress, [0.1, 0.5, 0.9], [10, 0, 10]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  // 4. Parallax Y
  const yParallax = useTransform(smoothProgress, [0, 1], [150, -150]);
  
  // 5. Chromatic Aberration Intensity
  const distortion = useTransform(smoothProgress, [0.1, 0.5, 0.9], [4, 0, 4]);
  
  // 6. Atmospheric Background Color
  const themeColor = 
    data.colorTheme === 'red' ? 'rgba(153, 27, 27, 0.15)' : 
    data.colorTheme === 'purple' ? 'rgba(88, 28, 135, 0.15)' : 
    data.colorTheme === 'grey' ? 'rgba(255, 255, 255, 0.05)' : 'transparent';
    
  const bgOpacity = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

  const isEven = index % 2 === 0;

  // Render specific visuals based on ID
  const renderVisuals = () => {
    switch(data.id) {
      case 'prodigy':
        return <ProdigyVisual scrollY={smoothProgress} />;
      case 'massacre':
        return <MassacreVisual kanji={data.kanji} scrollY={smoothProgress} />;
      case 'akatsuki':
        return <AkatsukiVisual scrollY={smoothProgress} />;
      case 'techniques':
        return <TechniquesVisual />;
      case 'battle':
        return <BattleVisual scrollY={smoothProgress} />;
      case 'legacy':
        return <LegacyVisual scrollY={smoothProgress} />;
      default:
        return <DefaultVisual />;
    }
  };

  return (
    <section 
      id={data.id} 
      ref={ref} 
      className="relative min-h-[160vh] w-full"
    >
      {/* --- ATMOSPHERE LAYER --- */}
      <motion.div 
        style={{ 
          backgroundColor: themeColor,
          opacity: bgOpacity
        }}
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000"
      />
      
      {/* --- CONNECTING THREAD --- */}
      <motion.div 
        style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
        className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-crimson/50 to-transparent z-0 hidden md:block" 
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-1000">
        
        {/* Background Visual Layer */}
        <motion.div 
          style={{ y: yParallax, opacity: 0.05 }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
        >
           <span className="font-cinzel font-black text-[30vw] text-white leading-none mix-blend-overlay blur-sm">
             {data.number}
           </span>
        </motion.div>

        {/* --- DYNAMIC VISUAL ART CONTAINER --- */}
        <motion.div 
          style={{ scale, opacity, filter }}
          className={`absolute ${isEven ? 'right-[5%] md:right-[10%]' : 'left-[5%] md:left-[10%]'} top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] z-10 hidden md:flex items-center justify-center`}
        >
           {/* The Container Frame */}
           <div className={`relative w-full h-full flex items-center justify-center transition-all duration-700`}>
              {/* Lens Flare */}
              <motion.div 
                style={{ opacity: bgOpacity }}
                className={`absolute inset-0 bg-gradient-radial ${data.colorTheme === 'red' ? 'from-crimson/30' : data.colorTheme === 'purple' ? 'from-purple-900/30' : 'from-white/10'} to-transparent blur-[60px] rounded-full`} 
              />
              
              {renderVisuals()}
           </div>
        </motion.div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className={`relative z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center min-h-screen ${isEven ? 'items-start' : 'items-end'}`}>
        <motion.div 
          style={{ y: yParallax, opacity }}
          className="max-w-xl p-8 md:p-12 relative group"
        >
          {/* Glass Card Background */}
          <div className="absolute inset-0 bg-uchihablack/40 backdrop-blur-sm border-l border-white/10 transition-colors duration-500 group-hover:border-crimson/40" />
          
          {/* Content Wrapper */}
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-4 overflow-hidden">
               <motion.span 
                 initial={{ x: -20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ duration: 0.5 }}
                 className="text-crimson font-mono text-sm tracking-widest"
               >
                 0{index + 1} // {data.kanjiTranslation.toUpperCase()}
               </motion.span>
            </div>
            
            {/* Cinematic Glitch Title */}
            <GlitchTitle text={data.title} distortion={distortion} />
            
            <p className="font-cormorant text-xl md:text-2xl text-stone-300 leading-relaxed drop-shadow-md text-balance">
              {data.description}
            </p>

            <motion.div 
              style={{ x: useTransform(distortion, (v) => v * 2) }}
              className="border-l-2 border-crimson/50 pl-6 py-2 mt-4 bg-gradient-to-r from-crimson/5 to-transparent"
            >
              <p className={`font-cinzel text-sm md:text-base text-stone-400 italic`} >
                "{data.quote}"
              </p>
            </motion.div>

            {data.stats && (
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-8 pt-8 border-t border-white/5">
                {data.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-[10px] uppercase text-stone-500 tracking-widest mb-1">{stat.label}</div>
                    <div className="font-mono text-crimson text-sm md:text-base">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Chapter;