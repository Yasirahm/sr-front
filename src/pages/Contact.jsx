import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Send,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

import { API_BASE } from '../apiConfig.js';

export default function Contact({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
const WHATSAPP_PHONE_NUMBER = '+919796559374';
 const whatsappMessage = 'Hello Sara Aijaz, I am interested in the ${course.title} course. Please provide me with more details.';
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
  const whatsappNumber = settings?.whatsappNumber || '+919796559364';
  const defaultWhatsAppMsg = 'Hello Sara Aijaz, I would like to know more about your courses.';
  

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Even if network fails, show friendly note or fallback
      setSubmitError('Unable to send message directly. Please contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafaf9] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Connect Directly</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mb-3 sm:mb-4">
            Get in Touch
          </h1>
          <p className="text-stone-600 text-sm sm:text-lg leading-relaxed">
            Have a question about a course or want to know more? Fill out the form below 
            or reach out directly on WhatsApp for an immediate response.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Channels & Fast WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout Card */}
            <div className="bg-emerald-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-3 sm:space-y-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-800/80 text-emerald-200 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Quick WhatsApp Support
                </h3>
                <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                  Fastest way to check upcoming batch availability, personalized curriculum, 
                  and corporate training slots.
                </p>

                {/* Big WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 active:scale-98 transition-all shadow-md space-x-2 mt-1 sm:mt-2"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Information Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5 sm:space-y-6">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 border-b border-stone-100 pb-3 sm:pb-4">
                Contact Information
              </h4>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      Email Address
                    </span>
                    <a
                      href="mailto:contact@saraaijaz.com"
                      className="text-stone-900 font-medium hover:text-amber-800 transition-colors text-sm sm:text-base break-all"
                    >
                      contact@saraaijaz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      Phone / WhatsApp
                    </span>
                    <span className="text-stone-900 font-medium text-sm sm:text-base">
                      +{whatsappNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      Location
                    </span>
                    <span className="text-stone-900 font-medium text-sm sm:text-base">
                      Delhi NCR, India (Online Worldwide)
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                      Operating Hours
                    </span>
                    <span className="text-stone-900 font-medium text-sm sm:text-base">
                      Mon – Sat: 9:00 AM – 7:00 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1 sm:mb-2">
                Send a Message
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mb-6 sm:mb-8">
                Please leave your details and we will reply within 24 business hours.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-emerald-800 text-xs sm:text-sm max-w-md mx-auto">
                    Thank you for reaching out to Sara Aijaz. Our team has received your inquiry and will be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-5 py-2.5 rounded-full text-xs font-semibold text-emerald-900 bg-emerald-200/60 hover:bg-emerald-200 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1.5 sm:mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800 text-base transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1.5 sm:mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800 text-base transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1.5 sm:mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800 text-base transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1.5 sm:mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the courses or coaching you are interested in..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800 text-base transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-98 transition-all shadow-md space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
