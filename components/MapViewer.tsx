import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MAPS, TOUR_PATH } from '../constants';
import FamilyMarker from './FamilyMarker';
import { Waypoint } from '../types';

interface MapViewerProps {
  currentFloorIndex: number;
  currentStepIndex: number;
  visitedPoints: number[]; // Indices of points already visited
}

const MapViewer: React.FC<MapViewerProps> = ({ currentFloorIndex, currentStepIndex, visitedPoints }) => {
  const currentMap = MAPS[currentFloorIndex];
  
  // Filter waypoints that belong to the current floor
  const floorWaypoints = useMemo(() => {
    return TOUR_PATH.filter(p => p.floorIndex === currentFloorIndex);
  }, [currentFloorIndex]);

  // Determine active target position
  const activePoint = TOUR_PATH[currentStepIndex];

  // Calculate the path lines for SVG overlay
  // We only want to draw lines between consecutive points on this floor
  const pathSegments = useMemo(() => {
    const segments: { start: Waypoint; end: Waypoint; isVisited: boolean }[] = [];
    
    for (let i = 0; i < floorWaypoints.length - 1; i++) {
      const start = floorWaypoints[i];
      const end = floorWaypoints[i + 1];
      
      // Only connect them if they are sequential in the main tour array
      const startIndexGlobal = TOUR_PATH.findIndex(p => p.id === start.id);
      const endIndexGlobal = TOUR_PATH.findIndex(p => p.id === end.id);
      
      if (endIndexGlobal === startIndexGlobal + 1) {
        // It's a direct path
        const isVisited = currentStepIndex >= endIndexGlobal;
        segments.push({ start, end, isVisited });
      }
    }
    return segments;
  }, [floorWaypoints, currentStepIndex]);

  return (
    <div className="relative w-full h-full bg-stone-100 rounded-xl overflow-hidden shadow-2xl border-4 border-stone-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMap.floorIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center bg-[#FDF8F0]"
        >
          {/* Map Image */}
          <div className="relative w-full h-full max-w-4xl aspect-[4/3] mx-auto">
            <img 
              src={currentMap.imageUrl} 
              alt={currentMap.name} 
              className="w-full h-full object-contain p-4"
            />

            {/* SVG Overlay for Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none p-4 box-border">
               {/* Definitions for dashed lines */}
               <defs>
                <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
                  <polygon points="0 0, 5 1.75, 0 3.5" fill="#94a3b8" />
                </marker>
              </defs>

              {pathSegments.map((seg, idx) => (
                <motion.line
                  key={`${seg.start.id}-${seg.end.id}`}
                  x1={`${seg.start.x}%`}
                  y1={`${seg.start.y}%`}
                  x2={`${seg.end.x}%`}
                  y2={`${seg.end.y}%`}
                  stroke={seg.isVisited ? "#f59e0b" : "#cbd5e1"} // Amber for visited, Slate for future
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                />
              ))}

              {/* Waypoint Dots */}
              {floorWaypoints.map((wp, idx) => {
                 const isVisited = visitedPoints.includes(TOUR_PATH.findIndex(p => p.id === wp.id));
                 const isCurrent = activePoint.id === wp.id;

                 return (
                   <g key={wp.id}>
                     <motion.circle
                       cx={`${wp.x}%`}
                       cy={`${wp.y}%`}
                       r={isCurrent ? 6 : 4}
                       fill={isVisited ? "#f59e0b" : "#cbd5e1"}
                       stroke="#fff"
                       strokeWidth="2"
                       animate={{ scale: isCurrent ? [1, 1.2, 1] : 1 }}
                       transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                     />
                     {/* Label on Hover or Active */}
                     {(isCurrent) && (
                       <foreignObject x={`${wp.x - 10}%`} y={`${wp.y + 2}%`} width="20%" height="50px">
                          <div className="flex justify-center">
                            <span className="text-[10px] bg-black/75 text-white px-2 py-1 rounded shadow-md whitespace-nowrap">
                              {wp.label}
                            </span>
                          </div>
                       </foreignObject>
                     )}
                   </g>
                 )
              })}
            </svg>

            {/* The Moving Family Marker */}
            {activePoint && activePoint.floorIndex === currentFloorIndex && (
               <FamilyMarker x={activePoint.x} y={activePoint.y} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floor Indicator Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-stone-200 z-40">
        <h2 className="text-lg font-bold text-stone-800">{currentMap.name}</h2>
      </div>
    </div>
  );
};

export default MapViewer;
