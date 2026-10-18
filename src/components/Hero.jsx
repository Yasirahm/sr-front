import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function Hero({ settings }) {
  const defaultImage =
    settings?.heroImage || '/images/hero.jpg';
  const heading = settings?.heroHeading || 'Learn. Grow. Transform.';
  const description =
    settings?.heroDescription ||
    'Professional learning and personal development programs designed to help you build confidence, improve your skills and achieve your goals.';
  const button1Text = settings?.button1Text || 'Explore Courses';
  const button1Link = settings?.button1Link || '/courses';
  const button2Text = settings?.button2Text || 'Contact Us';
  const button2Link = settings?.button2Link || '/contact';

  return (
    <section
      className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden bg-stone-900"
      style={{
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8LMWJyXFBG-aYKjDW1YMSa63Pr4jZtone6TPNrFH_Qg&s=10)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark/Soft Gradient Overlay for crisp Readability on all screens */}
      <div className="absolute inset-0 bg-stone-950/80 sm:bg-gradient-to-r sm:from-stone-950/90 sm:via-stone-950/75 sm:to-stone-900/65" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 text-xs sm:text-sm font-medium tracking-wide mb-4 sm:mb-6 max-w-full truncate">
          
          <span className="truncate">Sara Aijaz • Professional Educator</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight drop-shadow-sm">
          {heading}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-stone-200/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light">
          {description}
        </p>

        {/* Action Buttons: Full width on phone, side-by-side on tablet/desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto w-full">
          <Link
            to={button1Link}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all shadow-lg hover:shadow-amber-400/20 space-x-2"
          >
            <span>{button1Text}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            to={button2Link}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 active:scale-95 transition-all space-x-2"
          >
            <span>{button2Text}</span>
            <MessageSquare className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
