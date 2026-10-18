import React from 'react';
import { MessageCircle, Clock, Tag } from 'lucide-react';

export default function CourseCard({ course, whatsappNumber = '+919796559364' }) {
  if (!course) return null;

  const defaultMsg = `Hello Sara Aijaz, I am interested in the ${course.title} course. Please provide me with more details.`;
  const messageToSend = course.whatsappMessage || defaultMsg;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageToSend)}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Course Image */}
      <div className="relative h-52 w-full overflow-hidden bg-stone-100">
        
        <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <Clock className="w-3 h-3 text-amber-400 mr-1" />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {course.description}
        </p>

        {/* Price & Meta */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between mb-5">
          <div className="flex items-center space-x-1.5 text-stone-500 text-xs">
            <Tag className="w-3.5 h-3.5 text-amber-600" />
            <span>Course Fee</span>
          </div>
          <span className="text-lg font-bold text-stone-900 font-sans">
            {course.price}
          </span>
        </div>

        {/* Direct WhatsApp CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm hover:shadow space-x-2"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
