import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, KeyRound, ArrowLeft, ShieldAlert } from 'lucide-react';

import { API_BASE } from '../apiConfig.js';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Try Backend API auth first
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('sara_aijaz_admin_token', data.token || 'admin_session_token');
        localStorage.setItem('sara_aijaz_admin_user', username);
        if (onLoginSuccess) onLoginSuccess();
        navigate('/admin/dashboard');
        return;
      }

      if (res.status === 401 || !data.success) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend auth request error, checking credentials directly:', err);
    }

    // 2. Direct hardcoded fallback verification matching requirement specification
    if (username.trim() === 'yasir' && password === '22250040') {
      localStorage.setItem('sara_aijaz_admin_token', 'admin_session_token_fallback');
      localStorage.setItem('sara_aijaz_admin_user', 'yasir');
      if (onLoginSuccess) onLoginSuccess();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
        
        {/* Top Header Banner */}
        <div className="bg-stone-900 p-6 sm:p-8 text-center text-white relative">
          <Link
            to="/"
            className="absolute left-4 top-4 sm:left-6 sm:top-6 text-stone-400 hover:text-white p-2 rounded-lg transition-colors"
            title="Return to Website"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-600/30 border border-amber-500/40 text-amber-300 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
            Admin Authentication
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Sara Aijaz Content Management Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="p-5 sm:p-8">
          {error && (
            <div className="mb-5 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center space-x-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 sm:mb-2">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800 text-base transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800 text-base transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-98 transition-all shadow-md disabled:opacity-50 mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-100 text-center">
            <Link
              to="/"
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors p-2 inline-block"
            >
              &larr; Back to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
