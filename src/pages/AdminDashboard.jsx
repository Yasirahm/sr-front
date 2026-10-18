import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Sliders,
  BookOpen,
  Image as ImageIcon,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  X,
  Upload,
  Camera,
  Link as LinkIcon,
  RefreshCw,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  AlertTriangle,
  MessageCircle,
} from 'lucide-react';

import { API_BASE } from '../apiConfig.js';

/**
 * Image compressor for fast device uploads
 */
function compressImage(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve({ dataUrl: reader.result, name: file.name });
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve({ dataUrl: e.target.result, name: file.name });

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl, name: file.name.replace(/\.[^/.]+$/, '') + '.jpg' });
      };
      img.onerror = () => resolve({ dataUrl: e.target.result, name: file.name });
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Device Image Upload Component with instant preview
 */
function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState('upload');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const { dataUrl, name } = await compressImage(file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl, name }),
      });

      if (!res.ok) throw new Error('Failed to upload file');
      const data = await res.json();
      onChange(data.url || dataUrl);
    } catch (err) {
      console.error('Image upload failed, falling back to local data:', err);
      const reader = new FileReader();
      reader.onload = () => onChange(reader.result);
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setMode(mode === 'upload' ? 'url' : 'upload')}
          className="text-[11px] font-medium text-amber-800 hover:text-amber-900 flex items-center space-x-1"
        >
          {mode === 'upload' ? (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>Or enter web URL</span>
            </>
          ) : (
            <>
              <Upload className="w-3 h-3" />
              <span>Upload from device</span>
            </>
          )}
        </button>
      </div>

      {mode === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
              uploading
                ? 'bg-amber-50/50 border-amber-300 pointer-events-none'
                : 'bg-stone-50 hover:bg-stone-100/80 border-stone-300 hover:border-amber-700'
            }`}
          >
            {uploading ? (
              <div className="py-3 flex flex-col items-center space-y-2">
                <RefreshCw className="w-6 h-6 text-amber-700 animate-spin" />
                <span className="text-xs font-semibold text-stone-700">
                  Optimizing & uploading from device...
                </span>
              </div>
            ) : value ? (
              <div className="w-full flex flex-col items-center space-y-3">
                <div className="relative rounded-xl overflow-hidden w-full max-h-40 bg-stone-900 border border-stone-200">
                  <img
                    src={value}
                    alt="Current selection"
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Tap to change image from device
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-amber-900 font-semibold bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Another Image from Device</span>
                </div>
              </div>
            ) : (
              <div className="py-3 flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-800 block">
                    Upload Image from Device
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Tap to select photo from phone or computer
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/... or /images/hero.jpg"
            className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
          {value && (
            <div className="rounded-xl overflow-hidden h-28 bg-stone-100 border border-stone-200">
              <img src={value} alt="URL preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ onLogout, onSettingsUpdated }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // Settings State
  const [settings, setSettings] = useState({
    heroImage: '',
    heroHeading: '',
    heroDescription: '',
    button1Text: '',
    button1Link: '',
    button2Text: '',
    button2Link: '',
    whatsappNumber: '',
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Courses State
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    image: '',
    whatsappMessage: '',
  });

  // Gallery State
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  // Contact Messages State
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // In-App Delete Confirmation Modal State (Reliable fix for iframe window.confirm block)
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  // Feedback notifications
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch all initial data
  const loadData = async () => {
    try {
      const sRes = await fetch(`${API_BASE}/settings`);
      if (sRes.ok) {
        const sData = await sRes.json();
        setSettings(sData);
      }

      const cRes = await fetch(`${API_BASE}/courses`);
      if (cRes.ok) {
        const cData = await cRes.json();
        setCourses(cData);
      }

      const gRes = await fetch(`${API_BASE}/gallery`);
      if (gRes.ok) {
        const gData = await gRes.json();
        setGallery(gData);
      }

      const mRes = await fetch(`${API_BASE}/contact`);
      if (mRes.ok) {
        const mData = await mRes.json();
        setMessages(mData);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save Hero / Website Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to update settings');
      const updated = await res.json();
      setSettings(updated);
      setSettingsSaved(true);
      showNotification('Hero and website settings saved successfully!');
      if (onSettingsUpdated) onSettingsUpdated(updated);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      console.error(err);
      showNotification('Failed to save settings. Please retry.', 'error');
    } finally {
      setSettingsLoading(false);
    }
  };

  // COURSE ACTIONS
  const openAddCourseModal = () => {
    setEditingCourse(null);
    setCourseFormData({
      title: '',
      description: '',
      duration: '4 Weeks',
      price: '₹4,999',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      whatsappMessage: '',
    });
    setCourseModalOpen(true);
  };

  const openEditCourseModal = (course) => {
    setEditingCourse(course);
    setCourseFormData({
      title: course.title || '',
      description: course.description || '',
      duration: course.duration || '',
      price: course.price || '',
      image: course.image || '',
      whatsappMessage: course.whatsappMessage || '',
    });
    setCourseModalOpen(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setCoursesLoading(true);
    try {
      if (editingCourse) {
        const res = await fetch(`${API_BASE}/courses/${editingCourse._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseFormData),
        });
        if (!res.ok) throw new Error('Failed to update course');
        const updated = await res.json();
        setCourses(courses.map((c) => (c._id === editingCourse._id ? updated : c)));
        showNotification('Course updated successfully!');
      } else {
        const res = await fetch(`${API_BASE}/courses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseFormData),
        });
        if (!res.ok) throw new Error('Failed to add course');
        const created = await res.json();
        setCourses([created, ...courses]);
        showNotification('New course created successfully!');
      }
      setCourseModalOpen(false);
    } catch (err) {
      console.error(err);
      showNotification('Error saving course.', 'error');
    } finally {
      setCoursesLoading(false);
    }
  };

  // Trigger custom in-app confirmation modal for course deletion
  const confirmDeleteCourse = (course) => {
    setItemToDelete({
      type: 'course',
      id: course._id,
      title: course.title,
    });
  };

  // GALLERY ACTIONS
  const openAddGalleryModal = () => {
    setEditingGallery(null);
    setGalleryFormData({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    });
    setGalleryModalOpen(true);
  };

  const openEditGalleryModal = (item) => {
    setEditingGallery(item);
    setGalleryFormData({
      title: item.title || '',
      description: item.description || '',
      image: item.image || '',
    });
    setGalleryModalOpen(true);
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    setGalleryLoading(true);
    try {
      if (editingGallery) {
        const res = await fetch(`${API_BASE}/gallery/${editingGallery._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(galleryFormData),
        });
        if (!res.ok) throw new Error('Failed to update gallery item');
        const updated = await res.json();
        setGallery(gallery.map((g) => (g._id === editingGallery._id ? updated : g)));
        showNotification('Gallery item updated successfully!');
      } else {
        const res = await fetch(`${API_BASE}/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(galleryFormData),
        });
        if (!res.ok) throw new Error('Failed to add gallery item');
        const created = await res.json();
        setGallery([created, ...gallery]);
        showNotification('Gallery item added successfully!');
      }
      setGalleryModalOpen(false);
    } catch (err) {
      console.error(err);
      showNotification('Error saving gallery item.', 'error');
    } finally {
      setGalleryLoading(false);
    }
  };

  // Trigger custom in-app confirmation modal for gallery deletion
  const confirmDeleteGallery = (item) => {
    setItemToDelete({
      type: 'gallery',
      id: item._id,
      title: item.title,
    });
  };

  // Trigger custom in-app confirmation modal for contact message deletion
  const confirmDeleteMessage = (msg) => {
    setItemToDelete({
      type: 'message',
      id: msg._id,
      title: `Message from ${msg.name}`,
    });
  };

  // Toggle read/unread status on message
  const handleToggleReadMessage = async (msgId) => {
    try {
      const res = await fetch(`${API_BASE}/contact/${msgId}/read`, {
        method: 'PUT',
      });
      if (res.ok) {
        const updated = await res.json();
        setMessages(messages.map((m) => (m._id === msgId ? updated : m)));
      }
    } catch (err) {
      console.error('Error updating read status:', err);
    }
  };

  // Execute deletion when user confirms in modal
  const handleExecuteDelete = async () => {
    if (!itemToDelete) return;
    setDeleteInProgress(true);

    try {
      const { type, id } = itemToDelete;

      if (type === 'course') {
        const res = await fetch(`${API_BASE}/courses/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete course');
        setCourses(courses.filter((c) => String(c._id) !== String(id)));
        showNotification('Course deleted successfully.');
      } else if (type === 'gallery') {
        const res = await fetch(`${API_BASE}/gallery/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete gallery item');
        setGallery(gallery.filter((g) => String(g._id) !== String(id)));
        showNotification('Gallery item removed successfully.');
      } else if (type === 'message') {
        const res = await fetch(`${API_BASE}/contact/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete message');
        setMessages(messages.filter((m) => String(m._id) !== String(id)));
        showNotification('Contact inquiry removed.');
      }

      setItemToDelete(null);
    } catch (err) {
      console.error('Delete error:', err);
      showNotification('Error deleting item. Please retry.', 'error');
    } finally {
      setDeleteInProgress(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sara_aijaz_admin_token');
    localStorage.removeItem('sara_aijaz_admin_user');
    if (onLogout) onLogout();
    navigate('/admin');
  };

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 sm:top-5 sm:right-5 z-50 flex items-center space-x-2 px-4 py-3 sm:px-5 sm:py-3 rounded-xl shadow-xl text-xs sm:text-sm font-semibold transition-all max-w-[90vw] ${
            notification.type === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-emerald-700 text-white'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* MOBILE HEADER & HORIZONTAL TAB STRIP (< md) */}
      <header className="md:hidden bg-stone-900 text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-serif text-sm font-bold">
              S
            </div>
            <span className="font-serif font-bold text-base text-white">
              Sara Aijaz Admin
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/"
              target="_blank"
              className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-stone-800"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Mobile Tabs */}
        <div className="flex items-center space-x-1 px-2 py-2 overflow-x-auto no-scrollbar border-b border-stone-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-amber-800 text-white font-semibold'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'hero'
                ? 'bg-amber-800 text-white font-semibold'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Hero</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'courses'
                ? 'bg-amber-800 text-white font-semibold'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Courses ({courses.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'gallery'
                ? 'bg-amber-800 text-white font-semibold'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Gallery ({gallery.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'messages'
                ? 'bg-amber-800 text-white font-semibold'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Messages</span>
            {unreadMessagesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            )}
          </button>
        </div>
      </header>

      {/* DESKTOP SIDEBAR NAVIGATION (>= md) */}
      <aside className="hidden md:flex w-64 bg-stone-900 text-stone-200 flex-col justify-between shrink-0 min-h-screen">
        <div>
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-serif font-bold">
                S
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-white leading-tight">
                  Sara Aijaz
                </h2>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-amber-800 text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'hero'
                  ? 'bg-amber-800 text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Hero Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'bg-amber-800 text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Courses ({courses.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-amber-800 text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery ({gallery.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'bg-amber-800 text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>Inquiries</span>
              </div>
              {messages.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-600 text-white">
                  {messages.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-stone-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-300 hover:bg-stone-800 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 sm:space-y-8 max-w-5xl">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Welcome to Sara Aijaz CMS
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                Manage your homepage hero, courses catalog, image gallery, and view customer inquiries.
              </p>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Courses
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                    {courses.length}
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Gallery
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                    {gallery.length}
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('messages')}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-700 transition-colors"
              >
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Inquiries
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                    {messages.length}
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    WhatsApp
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 mt-2 font-mono truncate">
                    +{settings.whatsappNumber || '919876543210'}
                  </div>
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            {/* Recent Inquiries Preview */}
            <div className="bg-white p-5 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-amber-800" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                    Recent Contact Inquiries ({messages.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900"
                >
                  View All Messages &rarr;
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="text-xs text-stone-500 py-4 text-center">
                  No contact submissions yet. Any message sent from the website Contact page will show up here.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {messages.slice(0, 3).map((msg) => (
                    <div
                      key={msg._id}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-stone-900">
                            {msg.name}
                          </span>
                          <span className="text-xs text-stone-500">
                            ({msg.email})
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                          "{msg.message}"
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        {msg.phone && (
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 flex items-center space-x-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        <span className="text-[10px] text-stone-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hero Quick Snapshot */}
            <div className="bg-white p-5 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  Current Hero Section Preview
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('hero')}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900"
                >
                  Edit Hero Settings &rarr;
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden min-h-[160px] sm:h-48 bg-stone-900 text-white flex items-center p-5 sm:p-6">
                <img
                  src={settings.heroImage || '/images/hero.jpg'}
                  alt="Hero Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80';
                  }}
                />
                <div className="relative z-10 max-w-xl">
                  <span className="text-amber-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider block mb-1">
                    Heading
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                    {settings.heroHeading || 'Learn. Grow. Transform.'}
                  </h4>
                  <p className="text-xs text-stone-300 mt-2 line-clamp-2">
                    {settings.heroDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={openAddCourseModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>

              <button
                type="button"
                onClick={openAddGalleryModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: HERO SETTINGS */}
        {activeTab === 'hero' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Hero Section Settings
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                Upload a background photo directly from your device, edit headline copy, buttons, and WhatsApp contact phone.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="bg-white rounded-3xl p-5 sm:p-8 border border-stone-200/90 shadow-sm space-y-6"
            >
              <ImageUploadField
                label="Hero Background Photo (Upload from Device)"
                value={settings.heroImage}
                onChange={(newUrl) => setSettings({ ...settings, heroImage: newUrl })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  required
                  value={settings.heroHeading}
                  onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800 font-serif text-base sm:text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={settings.heroDescription}
                  onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-1">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Primary Button 1
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={settings.button1Text}
                      onChange={(e) => setSettings({ ...settings, button1Text: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Target Link
                    </label>
                    <input
                      type="text"
                      value={settings.button1Link}
                      onChange={(e) => setSettings({ ...settings, button1Link: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-sm font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    Secondary Button 2
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={settings.button2Text}
                      onChange={(e) => setSettings({ ...settings, button2Text: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Target Link
                    </label>
                    <input
                      type="text"
                      value={settings.button2Link}
                      onChange={(e) => setSettings({ ...settings, button2Link: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-200 text-sm font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Global WhatsApp Contact Number (Country code + phone without + sign)
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="919876543210"
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-emerald-300 text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <span className="text-[11px] text-emerald-700 block">
                  Used by all WhatsApp buttons across Course Cards, Hero, and Contact page.
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={settingsLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all shadow-md active:scale-98 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{settingsLoading ? 'Saving Changes...' : 'Save Hero Settings'}</span>
                </button>

                {settingsSaved && (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center space-x-1 animate-in fade-in">
                    <CheckCircle className="w-4 h-4" />
                    <span>Settings Updated & Live</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Manage Courses
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                  Add, edit, or remove courses with photos uploaded straight from your device.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddCourseModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Course</span>
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 sm:h-44 w-full bg-stone-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {course.duration}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-amber-800">
                          {course.price}
                        </span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-1.5">
                        {course.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditCourseModal(course)}
                      className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                      title="Edit Course"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDeleteCourse(course)}
                      className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {courses.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
                <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  No courses found
                </h3>
                <p className="text-stone-500 text-xs mt-1 mb-4">
                  Create your first course to display it on the website.
                </p>
                <button
                  type="button"
                  onClick={openAddCourseModal}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-stone-900"
                >
                  + Add First Course
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MANAGE GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Manage Gallery
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                  Upload photos directly from your phone camera or laptop.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddGalleryModal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Image</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {gallery.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-sm sm:text-base font-bold text-stone-900 mb-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-stone-600 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditGalleryModal(item)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDeleteGallery(item)}
                      className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {gallery.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
                <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  No gallery items found
                </h3>
                <p className="text-stone-500 text-xs mt-1 mb-4">
                  Add photos to showcase your sessions.
                </p>
                <button
                  type="button"
                  onClick={openAddGalleryModal}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-stone-900"
                >
                  + Add First Image
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CONTACT INQUIRIES & MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Contact Form Responses ({messages.length})
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                  Inquiries submitted by website visitors, with direct WhatsApp and email reply shortcuts.
                </p>
              </div>

              <button
                type="button"
                onClick={loadData}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Messages</span>
              </button>
            </div>

            {/* Messages List */}
            {messages.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
                <Mail className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  No inquiries yet
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  When a learner fills out the contact form on your website, their note will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all shadow-sm ${
                      msg.isRead
                        ? 'border-stone-200 opacity-90'
                        : 'border-amber-300/80 ring-1 ring-amber-100 bg-amber-50/20'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold font-serif text-sm">
                          {msg.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-stone-900 text-sm sm:text-base">
                              {msg.name}
                            </span>
                            {!msg.isRead && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                                New
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-stone-500">
                            Received {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Quick Communication Actions */}
                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        {msg.phone && (
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${msg.name}, thank you for contacting Sara Aijaz. Regarding your inquiry: `
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        <a
                          href={`mailto:${msg.email}?subject=Regarding your inquiry - Sara Aijaz`}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply Email</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleToggleReadMessage(msg._id)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                          title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        >
                          <CheckCircle
                            className={`w-4 h-4 ${
                              msg.isRead ? 'text-emerald-600' : 'text-stone-400'
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => confirmDeleteMessage(msg)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata & Message Text */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-4 text-xs text-stone-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span className="font-medium text-stone-800">{msg.email}</span>
                        </div>
                        {msg.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3.5 h-3.5 text-stone-400" />
                            <span className="font-medium text-stone-800">{msg.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line border border-stone-100">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* IN-APP CONFIRMATION MODAL (Reliably fixes iframe delete bug) */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Confirm Deletion
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Are you sure you want to permanently delete:
              </p>
              <div className="p-2.5 bg-stone-100 rounded-xl text-xs font-semibold text-stone-800 mt-2 truncate">
                {itemToDelete.title}
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                disabled={deleteInProgress}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm disabled:opacity-50"
              >
                {deleteInProgress ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT COURSE */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              <button
                type="button"
                onClick={() => setCourseModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Professional Communication"
                  value={courseFormData.title}
                  onChange={(e) =>
                    setCourseFormData({ ...courseFormData, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <ImageUploadField
                label="Course Photo (Upload from Device) *"
                value={courseFormData.image}
                onChange={(newUrl) => setCourseFormData({ ...courseFormData, image: newUrl })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Course highlights and learning outcomes..."
                  value={courseFormData.description}
                  onChange={(e) =>
                    setCourseFormData({ ...courseFormData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Weeks"
                    value={courseFormData.duration}
                    onChange={(e) =>
                      setCourseFormData({ ...courseFormData, duration: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹4,999"
                    value={courseFormData.price}
                    onChange={(e) =>
                      setCourseFormData({ ...courseFormData, price: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Custom WhatsApp Pre-filled Message (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Auto-generated if left blank."
                  value={courseFormData.whatsappMessage}
                  onChange={(e) =>
                    setCourseFormData({
                      ...courseFormData,
                      whatsappMessage: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={coursesLoading || !courseFormData.image}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50"
                >
                  {coursesLoading ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT GALLERY ITEM */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {editingGallery ? 'Edit Gallery Photo' : 'Add New Photo'}
              </h3>
              <button
                type="button"
                onClick={() => setGalleryModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              <ImageUploadField
                label="Gallery Photo (Upload from Device) *"
                value={galleryFormData.image}
                onChange={(newUrl) => setGalleryFormData({ ...galleryFormData, image: newUrl })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Title / Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass on Stage Presence"
                  value={galleryFormData.title}
                  onChange={(e) =>
                    setGalleryFormData({ ...galleryFormData, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief note about the session..."
                  value={galleryFormData.description}
                  onChange={(e) =>
                    setGalleryFormData({ ...galleryFormData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={galleryLoading || !galleryFormData.image}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50"
                >
                  {galleryLoading ? 'Saving...' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
