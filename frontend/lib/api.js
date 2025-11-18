import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Helper method to get token from localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper method to set token in localStorage
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Helper method to remove token from localStorage
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
};

// Helper method to check if user is authenticated
export const isAuthenticated = () => {
  return getToken() !== null;
};

// Helper methods for auth endpoints
export const auth = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  },
  register: async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  logout: () => {
    removeToken();
  },
};

// Helper methods for suppliers
export const suppliers = {
  getAll: () => api.get('/suppliers').then((res) => res.data),
  getById: (id) => api.get(`/suppliers/${id}`).then((res) => res.data),
  create: (data) => api.post('/suppliers', data).then((res) => res.data),
  update: (id, data) => api.put(`/suppliers/${id}`, data).then((res) => res.data),
};

// Helper methods for products
export const products = {
  getAll: () => api.get('/products').then((res) => res.data),
  getById: (id) => api.get(`/products/${id}`).then((res) => res.data),
  search: (query) => api.get(`/products/search?q=${encodeURIComponent(query)}`).then((res) => res.data),
  create: (data) => api.post('/products', data).then((res) => res.data),
  update: (id, data) => api.put(`/products/${id}`, data).then((res) => res.data),
  uploadImage: (productId, file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('productId', productId);
    return api.post('/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },
};

// Export default axios instance
export default api;

