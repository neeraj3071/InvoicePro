<template>
  <!-- Show Landing Page when not authenticated -->
  <LandingPage 
    v-if="!isAuthenticated" 
    @login-success="handleAuthSuccess"
    @register-success="handleAuthSuccess"
  />
  
  <!-- Show Main App when authenticated -->
  <div v-else-if="isAuthenticated">
    <!-- Loading State -->
    <div v-if="!invoicesLoaded" class="loading-screen">
      <div class="loading-content">
        <h2>Loading your invoices...</h2>
        <p>Please wait a moment</p>
      </div>
    </div>
    
    <!-- Main Application -->
    <div v-else>
      <div v-if="!mobile" class="app flex flex-column">
        <Navigation />
        <div class="app-content flex flex-column">
          <Modal v-if="modalActive" />
          <transition name="invoice">
            <InvoiceModal v-if="invoiceModal" />
          </transition>
          <router-view />
        </div>
      </div>
      <div v-else class="mobile-message flex flex-column">
        <h2>Sorry, this app is not supported on Mobile Devices</h2>
        <p>To use this app, please use a computer or Tablet</p>
      </div>
    </div>
  </div>
  
  <!-- Fallback loading state -->
  <div v-else class="loading-screen">
    <div class="loading-content">
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navigation from "./components/Navigation";
import InvoiceModal from "./components/InvoiceModal";
import Modal from "./components/Modal";
import LandingPage from "./views/LandingPage";
export default {
  data() {
    return {
      mobile: null,
    };
  },
  components: {
    Navigation,
    InvoiceModal,
    Modal,
    LandingPage,
  },
  created() {
    console.log('App.vue created - checking authentication...');
    
    // Check if user is already authenticated
    const user = this.CHECK_AUTH();
    console.log('Authentication check result:', user);
    
    // Load invoices if authenticated
    if (this.isAuthenticated) {
      console.log('User is authenticated, loading invoices...');
      this.GET_INVOICES();
    } else {
      console.log('User not authenticated, showing landing page');
    }
    
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    ...mapActions(["GET_INVOICES", "CHECK_AUTH"]),

    handleAuthSuccess() {
      console.log('Authentication successful! Loading user data...');
      
      // Load user's invoices after successful authentication
      this.GET_INVOICES().then(() => {
        console.log('Invoices loaded successfully');
      }).catch(error => {
        console.error('Error loading invoices:', error);
      });
    },

    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },
  computed: {
    ...mapState(["invoiceModal", "modalActive", "invoicesLoaded", "isAuthenticated"]),
  },
  watch: {
    // Watch for authentication state changes
    isAuthenticated(newVal) {
      console.log('Authentication state changed:', newVal);
      if (!newVal) {
        // User logged out, redirect to home route to trigger landing page
        this.$router.push('/').catch(() => {});
      }
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background-color: #141625;
  min-height: 100vh;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}

.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;

  p {
    margin-top: 16px;
  }
}

// animated invoice

.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

// Loading screen styles
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .loading-content {
    text-align: center;
    color: white;

    h2 {
      font-size: 2rem;
      margin-bottom: 16px;
      font-weight: 600;
    }

    p {
      font-size: 1.1rem;
      opacity: 0.8;
    }
  }
}
</style>
