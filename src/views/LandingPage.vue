<template>
  <div class="landing-page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <h2>InvoicePro</h2>
        </div>
        <nav class="nav">
          <button @click="showLogin = true" class="btn btn-outline">Sign In</button>
          <button @click="showRegister = true" class="btn btn-primary">Get Started</button>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Professional Invoice Management Made Simple</h1>
          <p>Create, manage, and track your invoices with ease. Perfect for freelancers, small businesses, and agencies.</p>
          <div class="hero-buttons">
            <button @click="showRegister = true" class="btn btn-primary btn-large">Start Free Trial</button>
            <button @click="showLogin = true" class="btn btn-outline btn-large">Sign In</button>
          </div>
        </div>
        <div class="hero-image">
          <div class="mockup">
            <div class="mockup-screen">
              <div class="mockup-header"></div>
              <div class="mockup-content">
                <div class="mockup-line"></div>
                <div class="mockup-line short"></div>
                <div class="mockup-line"></div>
                <div class="mockup-line medium"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Everything You Need to Manage Invoices</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">📄</div>
            <h3>Create Professional Invoices</h3>
            <p>Generate beautiful, professional invoices in seconds with customizable templates.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📊</div>
            <h3>Track Payment Status</h3>
            <p>Monitor paid, pending, and draft invoices with real-time status updates.</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💾</div>
            <h3>Secure Data Storage</h3>
            <p>Your invoice data is securely stored and accessible from anywhere.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Login Modal -->
    <div v-if="showLogin" class="modal-overlay" @click="closeModals">
      <div class="auth-modal" @click.stop>
        <button class="modal-close" @click="closeModals">&times;</button>
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              v-model="loginForm.email"
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div class="form-group">
            <label for="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              v-model="loginForm.password"
              required
              placeholder="Enter your password"
            />
          </div>

          <div v-if="loginError" class="error-message">{{ loginError }}</div>
          
          <button type="submit" class="btn btn-primary btn-full" :disabled="loginLoading">
            {{ loginLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="auth-switch">
          <p>Don't have an account? 
            <a href="#" @click.prevent="switchToRegister">Sign up here</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Register Modal -->
    <div v-if="showRegister" class="modal-overlay" @click="closeModals">
      <div class="auth-modal" @click.stop>
        <button class="modal-close" @click="closeModals">&times;</button>
        <h2>Get Started</h2>
        <p>Create your free account</p>
        
        <form @submit.prevent="handleRegister">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="registerForm.firstName"
                required
                placeholder="John"
              />
            </div>
            
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="registerForm.lastName"
                required
                placeholder="Smith"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="registerEmail">Email</label>
            <input
              type="email"
              id="registerEmail"
              v-model="registerForm.email"
              required
              placeholder="john@example.com"
            />
          </div>

          <div class="form-group">
            <label for="company">Company (Optional)</label>
            <input
              type="text"
              id="company"
              v-model="registerForm.company"
              placeholder="Your Company Name"
            />
          </div>
          
          <div class="form-group">
            <label for="registerPassword">Password</label>
            <input
              type="password"
              id="registerPassword"
              v-model="registerForm.password"
              required
              placeholder="Create a strong password"
              minlength="6"
            />
          </div>

          <div v-if="registerError" class="error-message">{{ registerError }}</div>
          
          <button type="submit" class="btn btn-primary btn-full" :disabled="registerLoading">
            {{ registerLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="auth-switch">
          <p>Already have an account? 
            <a href="#" @click.prevent="switchToLogin">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LandingPage',
  data() {
    return {
      showLogin: false,
      showRegister: false,
      loginLoading: false,
      registerLoading: false,
      loginError: '',
      registerError: '',
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['LOGIN', 'REGISTER']),
    
    closeModals() {
      this.showLogin = false;
      this.showRegister = false;
      this.loginError = '';
      this.registerError = '';
    },

    switchToRegister() {
      this.showLogin = false;
      this.showRegister = true;
      this.loginError = '';
    },

    switchToLogin() {
      this.showRegister = false;
      this.showLogin = true;
      this.registerError = '';
    },

    async handleLogin() {
      this.loginLoading = true;
      this.loginError = '';

      // Basic validation
      if (!this.loginForm.email || !this.loginForm.password) {
        this.loginError = 'Please enter both email and password.';
        this.loginLoading = false;
        return;
      }

      try {
        console.log('LandingPage: Starting login...', { email: this.loginForm.email });
        
        await this.LOGIN({
          email: this.loginForm.email,
          password: this.loginForm.password
        });
        
        console.log('LandingPage: Login completed successfully');
        
        // Show success message
        alert('🎉 Welcome back! Successfully signed in.');
        
        // Emit success event to parent
        this.$emit('login-success');
        
        // Clear form
        this.loginForm = { email: '', password: '' };
        this.closeModals();
      } catch (error) {
        console.error('LandingPage: Login error:', error);
        this.loginError = error.message || 'Login failed. Please check your credentials and try again.';
      } finally {
        this.loginLoading = false;
      }
    },

    async handleRegister() {
      this.registerLoading = true;
      this.registerError = '';

      // Basic validation
      if (!this.registerForm.firstName || !this.registerForm.lastName || 
          !this.registerForm.email || !this.registerForm.password) {
        this.registerError = 'Please fill in all required fields.';
        this.registerLoading = false;
        return;
      }

      if (this.registerForm.password.length < 6) {
        this.registerError = 'Password must be at least 6 characters long.';
        this.registerLoading = false;
        return;
      }

      try {
        console.log('LandingPage: Starting registration...', this.registerForm);
        
        await this.REGISTER({
          firstName: this.registerForm.firstName,
          lastName: this.registerForm.lastName,
          email: this.registerForm.email,
          company: this.registerForm.company,
          password: this.registerForm.password
        });
        
        console.log('LandingPage: Registration completed successfully');
        
        // Show success message
        alert(`🎉 Account created successfully! Welcome ${this.registerForm.firstName}!`);
        
        // Emit success event to parent
        this.$emit('register-success');
        
        // Clear form
        this.registerForm = {
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          password: ''
        };
        this.closeModals();
      } catch (error) {
        console.error('LandingPage: Registration error:', error);
        this.registerError = error.message || 'Registration failed. Please try again.';
      } finally {
        this.registerLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.landing-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Header
.header {
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo h2 {
    color: white;
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .nav {
    display: flex;
    gap: 15px;
  }
}

// Hero Section
.hero {
  padding: 80px 0;

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .hero-content h1 {
    color: white;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 24px;
  }

  .hero-content p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .hero-buttons {
    display: flex;
    gap: 20px;
  }
}

// Mockup
.hero-image {
  display: flex;
  justify-content: center;
}

.mockup {
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.mockup-header {
  height: 8px;
  background: #667eea;
  border-radius: 4px;
  margin-bottom: 16px;
}

.mockup-line {
  height: 12px;
  background: #f1f3f4;
  border-radius: 6px;
  margin-bottom: 8px;

  &.short { width: 60%; }
  &.medium { width: 80%; }
}

// Features
.features {
  padding: 80px 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  h2 {
    text-align: center;
    color: white;
    font-size: 2.5rem;
    margin-bottom: 60px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
  }

  .feature {
    text-align: center;
    padding: 40px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .feature h3 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: 16px;
  }

  .feature p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
}

// Buttons
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &.btn-primary {
    background: #4f46e5;
    color: white;

    &:hover {
      background: #4338ca;
      transform: translateY(-2px);
    }
  }

  &.btn-outline {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &.btn-large {
    padding: 16px 32px;
    font-size: 1.1rem;
  }

  &.btn-full {
    width: 100%;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// Modal
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.auth-modal {
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  h2 {
    text-align: center;
    margin-bottom: 8px;
    color: #1f2937;
  }

  p {
    text-align: center;
    color: #6b7280;
    margin-bottom: 32px;
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #9ca3af;
}

// Forms
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #374151;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #4f46e5;
      outline: none;
    }
  }
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.auth-switch {
  text-align: center;
  margin-top: 24px;

  p {
    color: #6b7280;
    margin: 0;
  }

  a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content h1 {
    font-size: 2.2rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .auth-modal {
    margin: 20px;
    padding: 24px;
  }
}
</style>