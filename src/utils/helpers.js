export const getImageUrl = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop';
  if (url.startsWith('http')) return url;
  // Local storage: prefix with backend host from environment
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';
  const baseUrl = apiUrl.replace('/api', '');
  return `${baseUrl}${url}`;
};
