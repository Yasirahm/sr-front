import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import CourseCard from '../components/CourseCard.jsx';
import {
  BookOpen,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  TrendingUp,
} from 'lucide-react';

import { API_BASE } from '../apiConfig.js';

export default function Home({ settings }) {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courseError, setCourseError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const res = await fetch(`${API_BASE}/courses`);
        if (!res.ok) throw new Error('Failed to load courses');
        const data = await res.json();
        setCourses(data);
        setCourseError(null);
      } catch (err) {
        console.error('Error fetching courses for Home:', err);
        setCourseError('Unable to load courses. Please try again later.');
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const whatsappNumber = settings?.whatsappNumber || '919876543210';

  return (
    <div className="bg-[#fafaf9]">
      {/* 1. Dynamic Hero Section */}
      <Hero settings={settings} />

      {/* 2. Welcome / About Preview Section */}
      <section className="py-12 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image & Credibility Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Sara Aijaz"
                  className="w-full h-72 sm:h-[450px] object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                  <span className="text-amber-300 font-serif text-base sm:text-lg font-semibold block">
                    Sara Aijaz
                  </span>
                  <span className="text-stone-300 text-[11px] sm:text-xs tracking-wide">
                    Master Corporate Trainer & Personal Growth Specialist
                  </span>
                </div>
              </div>

              {/* Stat Badge: responsive on mobile too */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-amber-50 border border-amber-200/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-800 text-white flex items-center justify-center font-bold text-lg sm:text-xl font-serif shrink-0">
                  10+
                </div>
                <div>
                  <div className="text-stone-900 font-bold text-xs sm:text-sm">
                    Years Experience
                  </div>
                  <div className="text-stone-600 text-[11px] sm:text-xs">
                    Mentoring 5,000+ Learners
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 pt-2 sm:pt-0">
              <div className="inline-flex items-center space-x-2 text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>About Sara Aijaz</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                Discover a learning environment focused on knowledge, confidence,
                communication and personal growth.
              </h2>

              <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Sara Aijaz is dedicated to empowering students, young professionals, and executives to unlock their highest potential. Through actionable methodologies, individual feedback, and experiential drills, each program transforms self-doubt into clear, persuasive authority.
              </p>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2">
                <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800 mb-1.5" />
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Confidence</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1">Conquer stage anxiety and build assertive body language.</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800 mb-1.5" />
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Communication</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1">Express ideas with articulation, structure, and impact.</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800 mb-1.5" />
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Transformation</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1">Lifelong mental models for leadership and career success.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-95 transition-colors shadow-sm space-x-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Fast Access Section (Two Attractive Cards) */}
      <section className="py-12 sm:py-16 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Card 1: Explore Courses */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:bg-amber-800 group-hover:text-white transition-colors">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-stone-900">
                  Explore Courses
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  Discover available courses and learning plans crafted to elevate your public speaking, corporate presence, and emotional intelligence.
                </p>
              </div>
              <div className="pt-6 sm:pt-8">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 group-hover:bg-stone-900 group-hover:text-white transition-all space-x-2"
                >
                  <span>View Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Get in Touch */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-stone-900">
                  Get in Touch
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  Have questions regarding batches, one-on-one sessions, or customized corporate workshops? Contact Sara Aijaz directly.
                </p>
              </div>
              <div className="pt-6 sm:pt-8">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 group-hover:bg-stone-900 group-hover:text-white transition-all space-x-2"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Courses Preview Section */}
      <section className="py-12 sm:py-20 bg-stone-50 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Featured Programs
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mt-1 sm:mt-2">
                Popular Learning Paths
              </h2>
            </div>
            <Link
              to="/courses"
              className="mt-3 sm:mt-0 inline-flex items-center text-xs sm:text-sm font-semibold text-amber-900 hover:text-amber-700 space-x-1"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Courses State */}
          {loadingCourses ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-800 border-t-transparent" />
              <p className="mt-4 text-stone-600 text-sm">Loading courses...</p>
            </div>
          ) : courseError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
              <p>{courseError}</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              No courses found. Add courses from the admin dashboard.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {courses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-95 transition-colors shadow-sm"
            >
              Explore Full Course Catalog
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Trust / Mentorship Philosophy Banner */}
      <section className="py-14 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4 sm:space-y-6">
          <p className="text-amber-400 font-serif italic text-base sm:text-xl">
            "Your voice is your most potent instrument. When trained with purpose, it opens doors you never imagined."
          </p>
          <h3 className="font-serif text-xl sm:text-3xl font-bold">
            Ready to Begin Your Transformation?
          </h3>
          <p className="text-stone-300 text-xs sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Whether for career advancement, interview preparation, or mastering public stages, take your first step today.
          </p>
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto w-full">
            <Link
              to="/courses"
              className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              Browse Programs
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-semibold text-white bg-stone-800 hover:bg-stone-700 transition-colors border border-stone-700"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
