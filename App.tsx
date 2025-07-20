import React, { useState, useCallback } from 'react';
import { PageType } from './types';
import ImageUploader from './components/ImageUploader';
import FlipBook from './components/FlipBook';
import { MARKER_ICONS } from './constants';
import ReactDOMServer from 'react-dom/server';


const App: React.FC = () => {
  const [pages, setPages] = useState<PageType[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const handleUpload = useCallback((uploadedPages: PageType[]) => {
    setPages(uploadedPages);
    setCurrentPageIndex(0);
  }, []);

  const handleReset = useCallback(() => {
    setPages([]);
    setCurrentPageIndex(0);
  }, []);
  
  const handleNavigate = useCallback((direction: 'next' | 'prev') => {
    setCurrentPageIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % pages.length;
      } else {
        return (prevIndex - 1 + pages.length) % pages.length;
      }
    });
  }, [pages.length]);

  const handleUpdatePage = useCallback((updatedPage: PageType) => {
    setPages(prevPages => 
      prevPages.map(p => p.id === updatedPage.id ? updatedPage : p)
    );
  }, []);

  const generateGuideHtml = (pages: PageType[]) => {
      const pagesJson = JSON.stringify(pages, null, 2).replace(/</g, '\\u003c');

      const iconsSvgStrings: { [key: string]: string } = {};
      for (const key in MARKER_ICONS) {
          const IconComponent = MARKER_ICONS[key];
          const svgString = ReactDOMServer.renderToString(<IconComponent />);
          // Make it compatible for template literal
          iconsSvgStrings[key] = svgString.replace(/class="[^"]*"/, 'class="w-8 h-8"');
      }

      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Training Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }
      .marker-popup { animation: fade-in-up 0.3s ease-out forwards; }
      @keyframes fade-in-up { 0% { opacity: 0; transform: translate(-50%, 10px); } 100% { opacity: 1; transform: translate(-50%, 0); } }
      .marker-popup b { font-weight: bold; } .marker-popup i { font-style: italic; }
    </style>
</head>
<body class="bg-slate-200 text-slate-800 flex flex-col items-center justify-center min-h-screen p-4">
  <div id="app-container" class="w-full max-w-7xl mx-auto flex flex-col items-center">
    <h1 class="text-2xl md:text-3xl font-bold text-[#0D375E] tracking-tight mb-4">Training Guide</h1>
    <div id="image-container" class="relative w-full aspect-video bg-slate-100 rounded-lg shadow-lg overflow-hidden mb-4 border border-slate-300">
      <img id="page-image" src="" alt="Guide Page" class="w-full h-full object-contain" />
      <div id="markers-container"></div>
    </div>
    <div class="w-full flex justify-between items-center px-2">
      <button id="prev-btn" class="p-3 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 transition-colors duration-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
      <div id="page-indicator" class="font-semibold text-slate-500"></div>
      <button id="next-btn" class="p-3 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 transition-colors duration-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg></button>
    </div>
  </div>
  <script id="guide-data" type="application/json">${pagesJson}</script>
  <script type="module">
    const pages = JSON.parse(document.getElementById('guide-data').textContent);
    let currentPageIndex = 0;
    let activeMarkerId = null;

    const ICONS = ${JSON.stringify(iconsSvgStrings)};
    const pageImage = document.getElementById('page-image');
    const markersContainer = document.getElementById('markers-container');
    const pageIndicator = document.getElementById('page-indicator');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function renderPage() {
      if (!pages || !pages.length) return;
      const page = pages[currentPageIndex];
      pageImage.src = page.imageSrc;
      pageIndicator.textContent = \`Page \${currentPageIndex + 1} of \${pages.length}\`;
      markersContainer.innerHTML = '';
      
      (page.markers || []).forEach(marker => {
        const markerEl = document.createElement('div');
        markerEl.className = 'absolute transform -translate-x-1/2 -translate-y-full';
        markerEl.style.left = \`\${marker.x}%\`;
        markerEl.style.top = \`\${marker.y}%\`;
        markerEl.style.color = marker.color || '#228BE6';
        markerEl.style.zIndex = marker.id === activeMarkerId ? 20 : 10;
        
        const iconSvg = ICONS[marker.icon] || ICONS['help'];
        markerEl.innerHTML = \`<button class="text-current filter drop-shadow-md transition-transform duration-200 hover:scale-110">\${iconSvg}</button>\`;
        
        if (marker.id === activeMarkerId) {
            const popup = document.createElement('div');
            popup.className = 'marker-popup absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-white border border-slate-300 rounded-lg shadow-2xl p-4 z-10';
            popup.innerHTML = \`<div class="flex justify-between items-start mb-2"><h3 class="font-bold text-lg text-[#228BE6] break-words">\${marker.title}</h3></div><div class="text-slate-700 text-sm break-words whitespace-pre-wrap">\${marker.content}</div>\`;
            markerEl.appendChild(popup);
        }

        markerEl.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            activeMarkerId = activeMarkerId === marker.id ? null : marker.id;
            renderPage();
        });
        markersContainer.appendChild(markerEl);
      });
      prevBtn.disabled = pages.length <= 1;
      nextBtn.disabled = pages.length <= 1;
    }
    function navigate(dir) {
      activeMarkerId = null;
      currentPageIndex = (currentPageIndex + (dir === 'next' ? 1 : -1) + pages.length) % pages.length;
      renderPage();
    }
    prevBtn.addEventListener('click', () => navigate('prev'));
    nextBtn.addEventListener('click', () => navigate('next'));
    document.body.addEventListener('click', (e) => {
        if (activeMarkerId && !e.target.closest('.marker-popup')) {
            activeMarkerId = null;
            renderPage();
        }
    });
    renderPage();
  </script>
</body>
</html>`;
  };

  const handleDownload = () => {
      const htmlContent = generateGuideHtml(pages);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'interactive-guide.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-7xl mx-auto p-4 mb-4 flex justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0D375E] tracking-tight">
          Interactive Training Guide Creator
        </h1>
        {pages.length > 0 && (
          <div className="flex items-center gap-2">
             <button
              onClick={handleDownload}
              className="px-4 py-2 bg-[#2F9E44] hover:bg-[#69DB7C] text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              Download Guide
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-[#94A3B8] hover:bg-slate-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              Start Over
            </button>
          </div>
        )}
      </header>
      <main className="w-full flex-grow flex items-center justify-center">
        {pages.length === 0 ? (
          <ImageUploader onUpload={handleUpload} />
        ) : (
          <FlipBook 
            pages={pages}
            currentPageIndex={currentPageIndex}
            onNavigate={handleNavigate}
            onUpdatePage={handleUpdatePage}
          />
        )}
      </main>
    </div>
  );
};

export default App;