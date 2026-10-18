import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery.jsx';
import { Camera, Sparkles } from 'lucide-react';

import { API_BASE } from '../apiConfig.js';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/gallery`);
        if (!res.ok) throw new Error('Failed to load gallery');
        const data = await res.json();
        setGalleryItems(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Unable to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="bg-[#fafaf9] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Visual Journey</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Moments & Workshop Highlights
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            A glimpse into live workshops, interactive masterclasses, 1-on-1 coaching sessions, 
            and learner milestones. Click any image to view in high resolution.
          </p>
        </div>

        {/* Gallery State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-9 w-9 border-4 border-amber-800 border-t-transparent" />
            <p className="mt-4 text-stone-600 text-sm font-medium">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
            <p>{error}</p>
          </div>
        ) : (
          <Gallery items={galleryItems} />
        )}

      </div>
    </div>
  );
}
