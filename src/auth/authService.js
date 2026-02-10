// Authentication utility for user management
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

  // Get all users from localStorage
  getUsers() {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  },

  // Register a new user
  register(userData) {
    try {
      console.log('AuthService: register called with:', userData);
      const users = this.getUsers();
      console.log('AuthService: current users count:', users.length);
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        console.log('AuthService: user already exists with email:', userData.email);
        throw new Error('User already exists with this email');
      }

      const newUser = {
        id: this.generateId(8),
        email: userData.email,
        password: userData.password, // In production, this should be hashed
        firstName: userData.firstName,
        lastName: userData.lastName,
        company: userData.company || '',
        createdAt: Date.now()
      };

      console.log('AuthService: creating new user:', newUser);
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('AuthService: saved users to localStorage, total count:', users.length);
      
      // Auto login after registration
      this.setCurrentUser(newUser);
      console.log('AuthService: set current user after registration');
      
      return newUser;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // Login user
  login(email, password) {
    try {
      console.log('AuthService: login called with:', { email });
      const users = this.getUsers();
      console.log('AuthService: checking against users:', users.map(u => u.email));
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        console.log('AuthService: login failed - invalid credentials');
        throw new Error('Invalid email or password');
      }

      console.log('AuthService: login successful for user:', user.email);
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Set current user
  setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  // Logout user
  logout() {
    localStorage.removeItem('currentUser');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  // Update user profile
  updateProfile(userId, updates) {
    try {
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(users));

      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        this.setCurrentUser(users[userIndex]);
      }

      return users[userIndex];
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Generate unique ID
  generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Clear all auth data (for development)
  clearAuthData() {
    localStorage.removeItem('users');
    localStorage.removeItem('currentUser');
  },

  // Debug method to create test user
  createTestUser() {
    const testUser = {
      firstName: 'Test',
      lastName: 'User', 
      email: 'test@example.com',
      company: 'Test Company',
      password: '123456'
    };

    try {
      return this.register(testUser);
    } catch (error) {
      console.log('Test user might already exist:', error.message);
      // Try to login with test user
      return this.login('test@example.com', '123456');
    }
  },

  // Debug method to view all users
  getAllUsers() {
    return this.getUsers();
  }
};