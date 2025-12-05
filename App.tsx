import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, MapPin, Footprints, Info } from 'lucide-react';
import MapViewer from './components/MapViewer';
import { TOUR_PATH, MAPS } from './constants';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentStep = TOUR_PATH[currentStepIndex];
  const currentFloor = currentStep.floorIndex;
  
  // Calculate progress
  const progress = Math.round(((currentStepIndex + 1) / TOUR_PATH.length) * 100);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      const step = TOUR_PATH[currentStepIndex];
      // Default step time + specific pause duration if any
      const timeToNext = (step.duration || 1) * 1000 + (step.pauseDuration || 0);

      timerRef.current = window.setTimeout(() => {
        if (currentStepIndex < TOUR_PATH.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false); // End of tour
        }
      }, timeToNext);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const jumpToFloor = (floorIdx: number) => {
    setIsPlaying(false);
    // Find the first waypoint for this floor
    const firstPointIndex = TOUR_PATH.findIndex(p => p.floorIndex === floorIdx);
    if (firstPointIndex !== -1) {
      setCurrentStepIndex(firstPointIndex);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row h-screen overflow-hidden">
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white border-r border-stone-200 flex flex-col z-50 shadow-xl">
        <div className="p-6 border-b border-stone-100 bg-[#342e37] text-white">
          <div className="flex items-center gap-2 mb-2">
             <div className="bg-yellow-500 p-1 rounded-full">
                <Footprints size={20} className="text-white" />
             </div>
             <h1 className="text-xl font-bold tracking-tight">AMNH Tour</h1>
          </div>
          <p className="text-xs text-stone-300 opacity-80">Interactive Family Observation Route</p>
        </div>

        {/* Current Status */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Current Location</h3>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-600 mt-1 shrink-0" size={20} />
                <div>
                  <h2 className="text-lg font-bold text-blue-900 leading-tight">{currentStep.label}</h2>
                  <p className="text-sm text-blue-700 mt-1">{currentStep.description}</p>
                  {currentStep.pauseDuration && (
                     <span className="inline-block mt-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                       Stopping for observation...
                     </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Tour Progress</h3>
            <div className="w-full bg-stone-200 rounded-full h-2.5 mb-2">
              <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-stone-500 text-right">{progress}% Completed</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Jump to Floor</h3>
            {MAPS.map((map) => (
              <button
                key={map.floorIndex}
                onClick={() => jumpToFloor(map.floorIndex)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between
                  ${currentFloor === map.floorIndex 
                    ? 'bg-stone-800 text-white shadow-md' 
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
              >
                <span>{map.name}</span>
                {currentFloor === map.floorIndex && <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
              </button>
            ))}
          </div>
        </div>

        {/* Playback Controls */}
        <div className="p-6 border-t border-stone-200 bg-stone-50">
          <div className="flex gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-sm
                ${isPlaying 
                  ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'}`}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              {isPlaying ? 'Pause' : 'Start Tour'}
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-white text-stone-600 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors"
              title="Reset Tour"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative bg-stone-200 p-4 md:p-8 flex flex-col">
        <div className="flex-1 flex items-center justify-center min-h-0">
          <MapViewer 
            currentFloorIndex={currentFloor} 
            currentStepIndex={currentStepIndex}
            visitedPoints={Array.from({length: currentStepIndex + 1}, (_, i) => i)}
          />
        </div>
        
        {/* Info Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs text-stone-500">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
             <span>Family Position (Child)</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-blue-600"></div>
             <span>Family Position (Parent)</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-6 h-1 border-t-2 border-dashed border-stone-400"></div>
             <span>Planned Route</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
