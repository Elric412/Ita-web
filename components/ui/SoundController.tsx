import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

const SoundController: React.FC = () => {
  // Default set to true (Sound On)
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    audioManager.toggleMute(newState);
    if (newState) {
        audioManager.playClick();
    }
  };

  return (
    <motion.button
      onClick={toggleSound}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-stone-800 bg-black/50 backdrop-blur-md text-stone-400 hover:text-crimson hover:border-crimson/50 transition-colors duration-300 group"
    >
      {isPlaying ? (
        <div className="relative">
             <Volume2 size={16} />
             {/* Audio visualizer effect */}
             <span className="absolute -inset-2 rounded-full border border-crimson/30 animate-ping opacity-20"></span>
        </div>
      ) : (
        <VolumeX size={16} />
      )}
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 text-[10px] tracking-widest font-cinzel opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-stone-500">
        {isPlaying ? 'MUTE AUDIO' : 'ENABLE AUDIO'}
      </span>
    </motion.button>
  );
};

export default SoundController;