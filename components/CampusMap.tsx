import React, { useState } from 'react';
import { LocationMarker } from '../types';
import { MapPin, Navigation, Info } from 'lucide-react';

const MARKERS: LocationMarker[] = [
  { id: '1', name: 'North Hall Dorms', category: 'dorm', x: 20, y: 30, status: 'Quiet Hours' },
  { id: '2', name: 'Student Center', category: 'food', x: 50, y: 50, status: 'Open Now' },
  { id: '3', name: 'Science Library', category: 'academic', x: 75, y: 25, status: 'Closing 10PM' },
  { id: '4', name: 'Recreation Gym', category: 'recreation', x: 60, y: 80, status: 'Busy' },
  { id: '5', name: 'Cafeteria', category: 'food', x: 30, y: 65, status: 'Lunch Service' },
];

const CampusMap: React.FC = () => {
  const [activeMarker, setActiveMarker] = useState<LocationMarker | null>(null);

  return (
    <div className="relative h-full w-full bg-gray-100">
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200 w-[90%] max-w-sm">
        <h2 className="font-bold text-gray-800 flex items-center">
          <Navigation size={18} className="mr-2 text-primary-600" /> Campus Map
        </h2>
        <p className="text-xs text-gray-500 mt-1">Tap a location for details</p>
      </div>

      {/* Interactive Map Area */}
      <div className="w-full h-full relative overflow-hidden bg-emerald-50">
        {/* SVG Background Layer simulating paths and buildings */}
        <svg className="w-full h-full absolute inset-0 text-emerald-100" preserveAspectRatio="none">
           {/* Abstract Roads */}
           <path d="M0 30 Q 50 20 100 30" stroke="#e5e7eb" strokeWidth="20" fill="none" />
           <path d="M50 0 L 50 100" stroke="#e5e7eb" strokeWidth="20" fill="none" />
           <path d="M20 100 Q 40 50 80 100" stroke="#e5e7eb" strokeWidth="15" fill="none" />
           {/* Abstract Grass patches */}
           <circle cx="20%" cy="30%" r="15%" fill="#d1fae5" />
           <circle cx="75%" cy="25%" r="12%" fill="#d1fae5" />
           <circle cx="60%" cy="80%" r="10%" fill="#d1fae5" />
        </svg>

        {/* Markers */}
        {MARKERS.map((marker) => (
          <button
            key={marker.id}
            onClick={() => setActiveMarker(marker)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${activeMarker?.id === marker.id ? 'scale-125 z-20' : 'hover:scale-110 z-10 active:scale-90'}`}
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          >
            <div className={`
              flex items-center justify-center h-10 w-10 rounded-full shadow-lg border-2 border-white
              ${marker.category === 'dorm' ? 'bg-indigo-500' : ''}
              ${marker.category === 'food' ? 'bg-orange-500' : ''}
              ${marker.category === 'academic' ? 'bg-blue-500' : ''}
              ${marker.category === 'recreation' ? 'bg-green-500' : ''}
            `}>
              <MapPin className="text-white" size={20} fill="currentColor" />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Sheet for Active Marker */}
      {activeMarker && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 z-30 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex justify-between items-start">
            <div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                activeMarker.category === 'dorm' ? 'bg-indigo-100 text-indigo-700' :
                activeMarker.category === 'food' ? 'bg-orange-100 text-orange-700' :
                activeMarker.category === 'academic' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {activeMarker.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">{activeMarker.name}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Info size={14} className="mr-1" />
                {activeMarker.status}
              </div>
            </div>
            <button 
              onClick={() => setActiveMarker(null)}
              className="text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full p-1 transition-transform hover:scale-110 active:scale-90 hover:bg-gray-100"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <button className="w-full mt-4 bg-primary-600 text-white font-medium py-2.5 rounded-xl hover:bg-primary-700 transition-all hover:scale-[1.02] active:scale-95 hover:shadow-lg">
            Get Directions
          </button>
        </div>
      )}
    </div>
  );
};

export default CampusMap;