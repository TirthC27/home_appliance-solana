import React from 'react';
import { motion } from 'framer-motion';

const CyberPulseBackground: React.FC = () => {
  return (
    <div className="cyberpulse-background">
      {/* Main rotating pulse */}
      <motion.div
        className="cyberpulse-orb main"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary pulse */}
      <motion.div
        className="cyberpulse-orb secondary"
        animate={{
          rotate: [360, 0],
          scale: [1.1, 0.8, 1.1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Tertiary pulse */}
      <motion.div
        className="cyberpulse-orb tertiary"
        animate={{
          rotate: [0, -360],
          scale: [0.9, 1.3, 0.9],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default CyberPulseBackground;