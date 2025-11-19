import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (email: string, password: string, name?: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Suppliers API
export const suppliersAPI = {
  getAll: async () => {
    const response = await api.get('/suppliers');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  },
  create: async (data: { name: string; email: string; phone: string }) => {
    const response = await api.post('/suppliers', data);
    return response.data;
  },
  update: async (id: string, data: { name: string; email: string; phone: string }) => {
    const response = await api.put(`/suppliers/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  search: async (query: string) => {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  create: async (data: {
    name: string;
    description: string;
    price: number;
    supplierId: string;
    imagePath?: string;
  }) => {
    const response = await api.post('/products', data);
    return response.data;
  },
  update: async (
    id: string,
    data: {
      name: string;
      description: string;
      price: number;
      supplierId: string;
      imagePath?: string;
    }
  ) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;

