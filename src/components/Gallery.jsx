import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ items = [] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Close modal on Escape key press or arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === 'ArrowLeft' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, items.length]);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-stone-500 text-sm">
        No gallery images currently available.
      </div>
    );
  }

  const currentItem = selectedImageIndex !== null ? items[selectedImageIndex] : null;

  return (
    <div>
      {/* Responsive Gallery Grid: 1 col on mobile phone, 2 on tablet, 3-4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <div
            key={item._id || index}
            onClick={() => setSelectedImageIndex(index)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-100 border border-stone-200/80 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Gradient Overlay & Details: Visible on tap or hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-base sm:text-lg font-bold leading-snug">
                  {item.title}
                </span>
                <span className="p-1 sm:p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white shrink-0 ml-2">
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </div>
              {item.description && (
                <p className="text-[11px] sm:text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal for enlarged image preview on mobile & desktop */}
      {selectedImageIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close button with high tap target for phone thumbs */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-white transition-colors z-30"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Previous image */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev - 1 + items.length) % items.length);
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors z-20 flex items-center justify-center active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Next image */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev + 1) % items.length);
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors z-20 flex items-center justify-center active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Main Modal Image Box */}
          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-[60vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl"
            />
            <div className="mt-3 sm:mt-4 text-center max-w-xl">
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mb-1">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="text-xs sm:text-sm text-stone-300">
                  {currentItem.description}
                </p>
              )}
              <span className="text-[10px] sm:text-xs text-stone-500 mt-1 sm:mt-2 block">
                {selectedImageIndex + 1} of {items.length} • Tap background to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
