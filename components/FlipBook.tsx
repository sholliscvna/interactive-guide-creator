import React, { useState, useCallback, useRef, MouseEvent } from 'react';
import { PageType, MarkerType } from '../types';
import Marker from './Marker';
import MarkerModal from './MarkerModal';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, MARKER_COLORS } from '../constants';

interface FlipBookProps {
  pages: PageType[];
  currentPageIndex: number;
  onNavigate: (direction: 'next' | 'prev') => void;
  onUpdatePage: (page: PageType) => void;
}

const FlipBook: React.FC<FlipBookProps> = ({ pages, currentPageIndex, onNavigate, onUpdatePage }) => {
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [newMarkerCoords, setNewMarkerCoords] = useState<{ x: number; y: number } | null>(null);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const currentPage = pages[currentPageIndex];

  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAddingMarker || !imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setNewMarkerCoords({ x, y });
  };

  const handleSaveMarker = useCallback((markerData: Omit<MarkerType, 'id' | 'x' | 'y'>) => {
    if (!newMarkerCoords) return;
    const newMarker: MarkerType = {
      id: `marker-${Date.now()}`,
      x: newMarkerCoords.x,
      y: newMarkerCoords.y,
      ...markerData,
    };
    const updatedPage = { ...currentPage, markers: [...currentPage.markers, newMarker] };
    onUpdatePage(updatedPage);
    setNewMarkerCoords(null);
    setIsAddingMarker(false);
  }, [newMarkerCoords, currentPage, onUpdatePage]);

  const handleDeleteMarker = useCallback((markerId: string) => {
    const updatedMarkers = currentPage.markers.filter(m => m.id !== markerId);
    const updatedPage = { ...currentPage, markers: updatedMarkers };
    onUpdatePage(updatedPage);
    setActiveMarkerId(null);
  }, [currentPage, onUpdatePage]);
  
  const toggleAddMarkerMode = () => {
    setIsAddingMarker(!isAddingMarker);
    setActiveMarkerId(null);
  };

  return (
    <div className="w-full max-w-7xl flex flex-col items-center">
      <div 
        ref={imageContainerRef}
        className={`relative w-full aspect-video bg-white rounded-lg shadow-lg overflow-hidden mb-4 border border-slate-300 ${isAddingMarker ? 'cursor-crosshair' : ''}`}
        onClick={handleImageClick}
      >
        <img src={currentPage.imageSrc} alt={`Page ${currentPageIndex + 1}`} className="w-full h-full object-contain" />
        {currentPage.markers.map(marker => (
          <Marker 
            key={marker.id}
            marker={marker}
            isActive={activeMarkerId === marker.id}
            onClick={() => {
              if (!isAddingMarker) setActiveMarkerId(activeMarkerId === marker.id ? null : marker.id);
            }}
            onDelete={() => handleDeleteMarker(marker.id)}
          />
        ))}
      </div>
      
      <div className="w-full flex justify-between items-center px-2">
        <button
          onClick={() => onNavigate('prev')}
          className="p-3 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous Page"
          disabled={pages.length <= 1}
        >
          <ChevronLeftIcon />
        </button>
        
        <div className="flex flex-col items-center">
           <button 
                onClick={toggleAddMarkerMode}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold text-white transition-all duration-200 border-2 shadow-md ${isAddingMarker ? 'bg-red-500 hover:bg-red-600 border-red-300' : 'bg-[#228BE6] hover:bg-[#004C8F] border-[#A5D8FF]'}`}
            >
                <PlusIcon />
                <span className="ml-2">{isAddingMarker ? 'Cancel' : 'Add Marker'}</span>
            </button>
            {isAddingMarker && <p className="text-sm text-[#228BE6] mt-2 animate-pulse">Click on the image to place a marker</p>}
        </div>

        <button
          onClick={() => onNavigate('next')}
          className="p-3 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next Page"
          disabled={pages.length <= 1}
        >
          <ChevronRightIcon />
        </button>
      </div>

       <div className="mt-4 font-semibold text-slate-500">
        Page {currentPageIndex + 1} of {pages.length}
      </div>

      {newMarkerCoords && (
        <MarkerModal
          onClose={() => {
            setNewMarkerCoords(null);
            setIsAddingMarker(false);
          }}
          onSave={handleSaveMarker}
        />
      )}
    </div>
  );
};

export default FlipBook;