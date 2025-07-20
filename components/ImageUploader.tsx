import React, { useState, useCallback, useRef } from 'react';
import { PageType } from '../types';
import { PlusIcon } from '../constants';

interface ImageUploaderProps {
  onUpload: (pages: PageType[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [loading, setLoading] = useState(false);
  const guideUploadRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setLoading(true);
    const pagePromises: Promise<PageType>[] = Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            resolve({
              id: `${file.name}-${Date.now()}`,
              imageSrc: e.target.result,
              markers: []
            });
          } else {
            reject(new Error('Failed to read file.'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(pagePromises)
      .then(pages => {
        onUpload(pages);
      })
      .catch(error => {
        console.error("Error creating pages:", error);
        setLoading(false);
      });
  }, [onUpload]);

  const handleGuideFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const htmlContent = e.target?.result;
      if (typeof htmlContent !== 'string') {
        setLoading(false);
        return;
      }
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const dataScript = doc.getElementById('guide-data');
        if (!dataScript?.textContent) {
          throw new Error('Could not find guide data in the uploaded file.');
        }
        const pagesData = JSON.parse(dataScript.textContent);
        if (Array.isArray(pagesData)) {
          onUpload(pagesData);
        } else {
          throw new Error('Invalid data format in the uploaded file.');
        }
      } catch (error) {
        console.error('Failed to parse guide file:', error);
        alert('Could not load the guide. The file may be invalid or corrupted.');
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-3xl text-center p-8 border-2 border-dashed border-slate-400 rounded-2xl bg-white/70 shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Create Your Guide</h2>
      <p className="text-slate-500 mb-6">Upload images to start a new guide, or load a previously saved one.</p>
      
      <div className="flex justify-center items-center gap-4">
        <label
          htmlFor="image-upload"
          className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-[#228BE6] hover:bg-[#004C8F] text-white font-bold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
        >
          <PlusIcon />
          <span className="ml-2">{loading ? 'Processing...' : 'Upload New Images'}</span>
        </label>
        <button
          onClick={() => guideUploadRef.current?.click()}
          className="px-6 py-3 bg-[#94A3B8] hover:bg-slate-500 text-white font-bold rounded-lg shadow-md transition-all duration-200"
        >
          Load Guide (.html)
        </button>
      </div>

      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />
      <input
        ref={guideUploadRef}
        type="file"
        accept=".html"
        className="hidden"
        onChange={handleGuideFileChange}
        disabled={loading}
      />
      <p className="text-xs text-slate-400 mt-4">You can select multiple image files at once.</p>

      <div className="mt-8 pt-6 border-t border-slate-300 text-left max-w-lg mx-auto">
        <h3 className="text-lg font-semibold text-[#228BE6] mb-4 text-center">How It Works</h3>
        <ul className="space-y-4 text-slate-600">
          <li className="flex items-start">
            <span className="bg-[#228BE6] text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 flex-shrink-0 ring-2 ring-[#A5D8FF]">1</span>
            <span><strong className="font-semibold text-slate-800">Upload Images or Guide:</strong> Click to upload new images or a previously saved `.html` guide file.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#228BE6] text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 flex-shrink-0 ring-2 ring-[#A5D8FF]">2</span>
            <span><strong className="font-semibold text-slate-800">Add & Customize Markers:</strong> Click 'Add Marker', place it on the image, and customize its icon, color, and content in the popup.</span>
          </li>
           <li className="flex items-start">
            <span className="bg-[#228BE6] text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-4 flex-shrink-0 ring-2 ring-[#A5D8FF]">3</span>
            <span><strong className="font-semibold text-slate-800">Download:</strong> Once finished, click 'Download Guide' to save your work as a single interactive HTML file.</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default ImageUploader;