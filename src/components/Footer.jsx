import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer({ whatsappNumber = '+919796559364' }) {
  const currentYear = 2026;

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-stone-800">
          
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-700 text-white flex items-center justify-center font-serif text-base sm:text-lg font-bold">
                S
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Sara Aijaz
              </span>
            </div>
            <p className="font-serif text-amber-200/90 italic text-sm sm:text-base">
              Learn. Grow. Transform.
            </p>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Empowering individuals and corporate professionals with communication mastery, 
              poise, leadership presence, and deep personal transformation.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-1 sm:pt-2">
              <a
                href="https://www.linkedin.com/in/sara-aijaz-363528204?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              
             
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors py-0.5 block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-300 transition-colors py-0.5 block">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors py-0.5 block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-300 transition-colors py-0.5 block">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors py-0.5 block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-stone-400 hover:text-amber-300 transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Chat</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:mirsarah16@gmail.com"
                  className="flex items-center space-x-2 text-stone-400 hover:text-amber-300 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>mirsarah16@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 text-stone-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Srinagar, Jammu and Kashmir</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with subtle hidden admin dot with generous tap area */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span>&copy; {currentYear} Sara Aijaz. All Rights Reserved.</span>
            
            {/* Subtle hidden admin access button with generous tap padding for phones */}
            <Link
              to="/admin"
              className="text-stone-700 hover:text-stone-400 p-2 -m-1 rounded-full transition-colors text-xs tracking-widest inline-flex items-center justify-center active:scale-95"
              title="Portal"
              aria-label="Staff Portal"
            >
              •
            </Link>
          </div>

          <div className="flex space-x-4">
            <span className="text-stone-500">Excellence in Training & Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
