import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle,
  Award,
  Heart,
  Target,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export default function About({ settings }) {
  const whatsappNumber = settings?.whatsappNumber || '919876543210';

  return (
    <div className="bg-[#fafaf9] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner / Introduction with Image Beside Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-20">
          
          {/* Portrait Image Column */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Sara Aijaz"
                  className="w-full h-80 sm:h-[480px] object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Decorative accent card: responsive on mobile */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-stone-200/80 max-w-sm">
                <p className="font-serif italic text-amber-900 text-xs sm:text-sm font-semibold">
                  "Knowledge illuminates the mind, but communication gives it power."
                </p>
                <span className="text-[10px] sm:text-xs text-stone-500 mt-1 sm:mt-2 block font-medium">
                  — Sara Aijaz
                </span>
              </div>
            </div>
          </div>

          {/* Text Description Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Meet The Educator</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
              About Sara Aijaz
            </h1>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              Sara Aijaz is dedicated to helping learners develop their knowledge,
              confidence, communication skills and personal growth through practical
              and engaging learning experiences.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              With a decade of experience across corporate training, higher education, and personal coaching, Sara bridges the critical gap between academic knowledge and real-world executive charisma. Her holistic approach combines behavioral psychology, stage presence exercises, and cognitive structuring.
            </p>

            {/* Core Values Bullet List */}
            <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <span className="text-stone-700 text-xs sm:text-sm">
                  <strong className="text-stone-900">Personalized Guidance:</strong> Tailored coaching focused on individual challenges and unique speech patterns.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <span className="text-stone-700 text-xs sm:text-sm">
                  <strong className="text-stone-900">Psychological Grounding:</strong> Practical tools to silence internal criticism and replace hesitation with composure.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <span className="text-stone-700 text-xs sm:text-sm">
                  <strong className="text-stone-900">Executive Impact:</strong> Structured frameworks for meetings, elevator pitches, and formal public keynotes.
                </span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-sm space-x-2"
              >
                <span>Explore Learning Paths</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  'Hello Sara Aijaz, I would like to connect and discuss training opportunities.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Sara</span>
              </a>
            </div>

          </div>
        </div>

        {/* 4 Pillars of Success */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm mb-12 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2 sm:mb-3">
              The Training Philosophy
            </h2>
            <p className="text-stone-600 text-xs sm:text-base">
              Every course is built upon foundational principles that deliver noticeable, lasting change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3 sm:mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-1.5">
                Clarity of Thought
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Clear communication begins in the mind. Learn to synthesize complex ideas into concise, engaging narratives.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3 sm:mb-4">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-1.5">
                Emotional Connection
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Audiences remember how you make them feel. Develop resonance, active listening, and genuine empathy.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3 sm:mb-4">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-1.5">
                Unshakable Poise
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Master body language, vocal modulation, eye contact, and physical presence in any setting.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
