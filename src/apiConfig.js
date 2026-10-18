/**
 * Central API Configuration for Sara Aijaz Website
 * Configured for Render backend (https://sr-backendd.onrender.com)
 * and Netlify frontend (saraaijaz.netlify.app)
 */
export const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' &&
  (window.location.hostname.includes('netlify.app') || window.location.hostname === 'saraaijaz.netlify.app')
    ? 'https://sr-backendd.onrender.com/api'
    : '/api');

export default API_BASE;
