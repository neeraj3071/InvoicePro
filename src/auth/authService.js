import { userAPI } from '../services/api';

// Authentication utility for user management with backend API
export default {
  // Get current user from localStorage
  getCurrentUser() {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error reading current user:', error);
      return null;
    }
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('authToken');
  },

  // Register a new user - now uses backend API
  async register(userData) {
    try {
      console.log('AuthService: register called with:', userData);
      
      const response = await userAPI.register({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      });

      console.log('AuthService: registration successful:', response);

      // Store token and user data
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      if (response.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }

      return {
        success: true,
        user: response.user,
        message: response.message || 'User created successfully'
      };
    } catch (error) {
      console.error('AuthService: registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  },

  // Login user - now uses backend API
  async login(email, password) {
    try {
      console.log('AuthService: login called for email:', email);
      
      const response = await userAPI.login({ email, password });
      
      console.log('AuthService: login successful:', response);

      // Store token and user data
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      if (response.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }

      return {
        success: true,
        user: response.user,
        message: response.message || 'Login successful'
      };
    } catch (error) {
      console.error('AuthService: login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  // Verify token is still valid
  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }

      const response = await userAPI.verifyToken();
      
      // Update user data if needed
      if (response.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }

      return true;
    } catch (error) {
      console.error('AuthService: token verification failed:', error);
      this.logout();
      return false;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return this.getCurrentUser() !== null && this.getToken() !== null;
  },

  // Get user initials for display
  getUserInitials(user) {
    if (!user) return '??';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  },

  // Generate ID (kept for compatibility, but not used with backend)
  generateId(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
  }
};