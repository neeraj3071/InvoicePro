import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import InvoiceView from "../views/InvoiceView.vue";
import authService from "../auth/authService";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/invoice/:invoiceId",
    name: "Invoice",
    component: InvoiceView,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  
  console.log(`Router guard: navigating to ${to.path}, authenticated: ${isAuthenticated}`);
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // User is not authenticated, let App.vue handle showing landing page
    console.log('User not authenticated, allowing navigation to show landing page');
    next();
    return;
  }
  
  if (to.meta.requiresAuth && isAuthenticated) {
    // User is authenticated, proceed to the protected route
    console.log('User authenticated, proceeding to protected route');
    next();
    return;
  }
  
  // Default case
  next();
});

export default router;
