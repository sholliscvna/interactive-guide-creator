import React, { useState, useRef } from 'react';
import { XIcon, MARKER_COLORS, MARKER_ICONS } from '../constants';
import { MarkerType } from '../types';

interface MarkerModalProps {
  onClose: () => void;
  onSave: (data: Omit<MarkerType, 'id' | 'x' | 'y'>) => void;
}

const MarkerModal: React.FC<MarkerModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(MARKER_COLORS[0]);
  const [icon, setIcon] = useState('help');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ title, content, color, icon });
    }
  };

  const applyStyle = (style: 'bold' | 'italic') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (!selectedText) return;

    const tag = style === 'bold' ? 'b' : 'i';
    const newText = `${content.substring(0, start)}<${tag}>${selectedText}</${tag}>${content.substring(end)}`;
    
    setContent(newText);
    textarea.focus();
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-[#E2E8F0] rounded-xl shadow-2xl w-full max-w-lg p-6 border border-[#94A3B8]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#0D375E]">Add Marker Info</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
            <XIcon/>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-slate-600 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#94A3B8] rounded-md p-2 text-slate-800 focus:ring-2 focus:ring-[#228BE6] focus:border-[#228BE6] outline-none"
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-2">Content / Notes</label>
            <div className="flex items-center gap-2 mb-0 p-2 bg-slate-200 rounded-t-md border-x border-t border-slate-300">
               <button type="button" onClick={() => applyStyle('bold')} className="font-bold w-8 h-8 rounded hover:bg-slate-300 text-slate-700">B</button>
               <button type="button" onClick={() => applyStyle('italic')} className="italic w-8 h-8 rounded hover:bg-slate-300 text-slate-700">I</button>
            </div>
            <textarea
              id="content"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full bg-white border border-slate-300 rounded-b-md p-2 text-slate-800 focus:ring-2 focus:ring-[#228BE6] focus:border-[#228BE6] outline-none resize-y"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Marker Color</label>
                <div className="flex gap-3">
                    {MARKER_COLORS.map(c => (
                        <button key={c} type="button" onClick={() => setColor(c)} style={{backgroundColor: c}} className={`w-8 h-8 rounded-full transition-all border-2 border-white/50 ${color === c ? 'ring-2 ring-offset-2 ring-offset-[#E2E8F0] ring-[#228BE6]' : ''}`}/>
                    ))}
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Marker Icon</label>
                <div className="flex flex-wrap gap-2 p-2 bg-slate-200 rounded-md border border-slate-300">
                    {Object.entries(MARKER_ICONS).map(([key, IconComponent]) => (
                         <button key={key} type="button" onClick={() => setIcon(key)} className={`p-1 rounded-md transition-colors text-slate-700 ${icon === key ? 'bg-[#228BE6] text-white' : 'hover:bg-slate-300'}`}>
                           <IconComponent />
                         </button>
                    ))}
                </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#228BE6] text-white font-semibold hover:bg-[#004C8F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!title.trim() || !content.trim()}
            >
              Save Marker
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MarkerModal;