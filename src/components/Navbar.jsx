import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-2.5 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-base sm:text-xl font-bold tracking-wider group-hover:bg-amber-800 transition-colors shadow-sm">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors leading-tight">
                Sara Aijaz
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                Learning & Growth
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-amber-800 relative py-1 ${
                  isActive(link.path)
                    ? 'text-amber-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-800'
                    : 'text-stone-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all shadow-sm hover:shadow active:scale-95 space-x-2"
            >
              <span>Join a Course</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all shadow-sm active:scale-98"
              >
                Join a Course
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
