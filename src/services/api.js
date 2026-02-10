import axios from 'axios';

// API Base URL - change this for production
const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized (token expired)
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

// User API
export const userAPI = {
  register(userData) {
    return apiClient.post('/users/register', userData);
  },
  
  login(credentials) {
    return apiClient.post('/users/login', credentials);
  },
  
  getProfile() {
    return apiClient.get('/users/me');
  },
  
  updateProfile(userData) {
    return apiClient.put('/users/me', userData);
  },
  
  verifyToken() {
    return apiClient.post('/users/verify-token');
  }
};

// Invoice API
export const invoiceAPI = {
  getAll(status = null) {
    const params = status ? { status } : {};
    return apiClient.get('/invoices', { params });
  },
  
  getById(invoiceId) {
    return apiClient.get(`/invoices/${invoiceId}`);
  },
  
  create(invoiceData) {
    return apiClient.post('/invoices', invoiceData);
  },
  
  update(invoiceId, invoiceData) {
    return apiClient.put(`/invoices/${invoiceId}`, invoiceData);
  },
  
  delete(invoiceId) {
    return apiClient.delete(`/invoices/${invoiceId}`);
  },
  
  updateStatus(invoiceId, status) {
    return apiClient.patch(`/invoices/${invoiceId}/status`, { status });
  }
};

// Health check
export const healthCheck = () => {
  return apiClient.get('/health');
};

export default apiClient;
