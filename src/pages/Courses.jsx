import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import { BookOpen, Search, Sparkles } from 'lucide-react';

import { API_BASE } from '../apiConfig.js';

export default function Courses({ settings }) {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/courses`);
        if (!res.ok) throw new Error('Failed to load courses');
        const data = await res.json();
        setCourses(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Unable to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const whatsappNumber = settings?.whatsappNumber || '919876543210';

  const filteredCourses = courses.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.title?.toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term) ||
      c.duration?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-[#fafaf9] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Curated Curriculum</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Available Courses & Programs
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Targeted training modules designed for career breakthroughs, confident articulation, 
            and lasting personal growth. Enroll directly via WhatsApp.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search courses by topic, skill, duration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Content State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-9 w-9 border-4 border-amber-800 border-t-transparent" />
            <p className="mt-4 text-stone-600 text-sm font-medium">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
            <p>{error}</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
              No courses found
            </h3>
            <p className="text-stone-500 text-sm">
              {searchTerm
                ? 'Try adjusting your search criteria.'
                : 'Courses will be added shortly. Please check back soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
