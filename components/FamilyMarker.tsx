import React from 'react';
import { motion } from 'framer-motion';

interface FamilyMarkerProps {
  x: number;
  y: number;
  color?: string;
}

const FamilyMarker: React.FC<FamilyMarkerProps> = ({ x, y, color = "#ec4899" }) => {
  return (
    <motion.div
      className="absolute w-8 h-8 pointer-events-none z-30 flex items-center justify-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        // Center the marker on the coordinate
        x: "-50%",
        y: "-50%",
      }}
      initial={false}
      animate={{ left: `${x}%`, top: `${y}%` }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 150,
      }}
    >
      <div className="relative w-full h-full drop-shadow-lg">
        {/* Triangle (Parent) */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-600 w-full h-full">
            <path d="M12 2L2 22h20L12 2z" />
          </svg>
        </motion.div>
        
        {/* Circle (Child) */}
        <motion.div
          className="absolute -right-2 -bottom-1 w-5 h-5"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500 w-full h-full">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </motion.div>
      </div>
      
      {/* Pulse Effect */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
    </motion.div>
  );
};

export default FamilyMarker;
