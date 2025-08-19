import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

// Pickup API
export const pickupAPI = {
  createRequest: (requestData: any) => api.post('/pickup/request', requestData),
  getMyRequests: (page = 1, limit = 10) => api.get(`/pickup/my-requests?page=${page}&limit=${limit}`),
  trackRequest: (trackingNumber: string) => api.get(`/pickup/track/${trackingNumber}`),
  cancelRequest: (id: string) => api.patch(`/pickup/${id}/cancel`),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData: any) => api.put('/user/profile', profileData),
  updatePreferences: (preferences: any) => api.patch('/user/preferences', preferences),
  getDashboard: () => api.get('/user/dashboard'),
};

export default api;