import React from 'react';
import { MarkerType } from '../types';
import { XIcon, TrashIcon, MARKER_ICONS, HelpIcon } from '../constants';

interface MarkerProps {
  marker: MarkerType;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const Marker: React.FC<MarkerProps> = ({ marker, isActive, onClick, onDelete }) => {
  const IconComponent = MARKER_ICONS[marker.icon] || HelpIcon;
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
      style={{ left: `${marker.x}%`, top: `${marker.y}%`, zIndex: isActive ? 20 : 10 }}
      onClick={onClick}
    >
      <div 
        style={{ color: marker.color }}
        className="text-[#228BE6] filter drop-shadow-md transition-transform duration-200 hover:scale-110"
        aria-label={`Marker: ${marker.title}`}
      >
        <div className="w-8 h-8 flex items-center justify-center">
            <IconComponent />
        </div>
      </div>

      {isActive && (
        <div 
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-white border border-slate-300 rounded-lg shadow-2xl p-4 z-10 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-[#228BE6] break-words">{marker.title}</h3>
            <button onClick={onClick} className="text-slate-500 hover:text-slate-800 flex-shrink-0 ml-2"><XIcon /></button>
          </div>
          <div 
             className="text-slate-700 text-sm break-words whitespace-pre-wrap mb-4 marker-content"
             dangerouslySetInnerHTML={{ __html: marker.content.replace(/\n/g, '<br />') }}
          />
          <button 
            onClick={onDelete} 
            className="w-full flex items-center justify-center text-sm text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md transition-colors"
            aria-label="Delete marker"
          >
            <TrashIcon />
            <span className="ml-2">Delete Marker</span>
          </button>
        </div>
      )}
       <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        .marker-content b { font-weight: bold; }
        .marker-content i { font-style: italic; }
      `}</style>
    </div>
  );
};

export default Marker;