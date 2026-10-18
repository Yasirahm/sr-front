import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import About from './pages/About.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

import { API_BASE } from './apiConfig.js';

/**
 * ScrollToTop component
 * Ensures every page opens at the very top upon route navigation
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
    document.documentElement.scrollTop = 0;
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const [settings, setSettings] = useState({
    heroImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80',
    heroHeading: 'Learn. Grow. Transform.',
    heroDescription:
      'Professional learning and personal development programs designed to help you build confidence, improve your skills and achieve your goals.',
    button1Text: 'Explore Courses',
    button1Link: '/courses',
    button2Text: 'Contact Us',
    button2Link: '/contact',
    whatsappNumber: '919876543210',
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return !!localStorage.getItem('sara_aijaz_admin_token');
  });

  // Fetch website settings on initial mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.warn('Using default hero & website settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <BrowserRouter>
      {/* Scroll listener guaranteeing all pages open at top */}
      <ScrollToTop />

      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin Routes without Public Navbar/Footer */}
          <Route
            path="/admin"
            element={
              isAdminAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isAdminAuthenticated ? (
                <AdminDashboard
                  onLogout={() => setIsAdminAuthenticated(false)}
                  onSettingsUpdated={(updated) => setSettings(updated)}
                />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />

          {/* Public Website Routes with Navbar & Footer */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home settings={settings} />} />
                    <Route path="/courses" element={<Courses settings={settings} />} />
                    <Route path="/about" element={<About settings={settings} />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<Contact settings={settings} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer whatsappNumber={settings?.whatsappNumber} />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
