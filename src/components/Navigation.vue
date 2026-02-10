<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="" />
    </div>
    
    <!-- Bottom Section with Avatar and Logout -->
    <div class="bottom-section">
      <div class="user-avatar-section">
        <div class="user-avatar">
          {{ userInitials }}
        </div>
      </div>
      
      <div class="bottom-logout">
        <button class="bottom-logout-btn" @click="handleLogout" title="Logout">
          <span class="logout-icon">🚪</span>
          <span class="logout-text">Logout</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "navigation",
  computed: {
    ...mapState(['currentUser']),
    userInitials() {
      if (!this.currentUser) return '';
      const first = this.currentUser.firstName ? this.currentUser.firstName.charAt(0) : '';
      const last = this.currentUser.lastName ? this.currentUser.lastName.charAt(0) : '';
      return (first + last).toUpperCase();
    }
  },
  methods: {
    ...mapActions(['LOGOUT']),
    handleLogout() {
      console.log('Logout button clicked');
      if (confirm('Are you sure you want to logout?')) {
        this.LOGOUT();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: #1e2139;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  position: relative;
  
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
    padding-right: 0;
    padding-bottom: 0;
  }

  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    
    @media (min-width: 900px) {
      width: 100%;
      margin-bottom: auto;
    }

    img {
      width: auto;
      height: 30px;
    }
  }

  .bottom-section {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 16px;
    
    @media (max-width: 899px) {
      flex-direction: row;
      justify-content: space-between;
      padding: 0 20px;
      margin-top: 0;
    }
  }

  .user-avatar-section {
    display: flex;
    justify-content: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 14px;
      
      @media (min-width: 900px) {
        width: 44px;
        height: 44px;
        font-size: 16px;
      }
    }
  }
  
  .bottom-logout {
    width: 100%;
    
    @media (max-width: 899px) {
      width: auto;
    }
    
    .bottom-logout-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px 16px;
      background: #ff4757;
      border: none;
      color: white;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: #ff3742;
      }
      
      .logout-icon {
        font-size: 16px;
      }
      
      .logout-text {
        display: block;
        
        @media (max-width: 899px) {
          font-size: 12px;
        }
      }
      
      @media (min-width: 900px) {
        flex-direction: column;
        gap: 4px;
        padding: 16px 8px;
        
        .logout-icon {
          font-size: 18px;
        }
        
        .logout-text {
          font-size: 11px;
          display: block;
        }
      }
    }
  }
}
</style>
