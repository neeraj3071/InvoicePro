import { createStore } from "vuex";
import { db, auth } from "../firebase/firebaseInit";
import firebase from "firebase/app";

export default createStore({
  state: {
    // Invoice state
    invoiceData: [],
    invoiceModal: null,
    modalActive: null,
    invoicesLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null,
    
    // Authentication state
    currentUser: null,
    isAuthenticated: false,
  },
  mutations: {
    // Invoice mutations
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoiceData.filter((invoice) => {
        return invoice.invoiceId === payload;
      });
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },
    DELETE_INVOICE(state, payload) {
      state.invoiceData = state.invoiceData.filter((invoice) => invoice.docId !== payload);
    },
    UPDATE_STATUS_TO_PAID(state, payload) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      });
    },
    UPDATE_STATUS_TO_PENDING(state, payload) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = false;
          invoice.invoicePending = true;
          invoice.invoiceDraft = false;
        }
      });
    },
    CLEAR_INVOICES(state) {
      state.invoiceData = [];
      state.invoicesLoaded = false;
    },
    
    // Authentication mutations
    SET_USER(state, user) {
      state.currentUser = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT_USER(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.invoiceData = [];
      state.invoicesLoaded = false;
    },
  },
  actions: {
    // Authentication actions
    async CHECK_AUTH({ commit }) {
      return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const userData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email.split('@')[0],
            };
            commit("SET_USER", userData);
            resolve(userData);
          } else {
            commit("SET_USER", null);
            resolve(null);
          }
        });
      });
    },
    
    async LOGIN({ commit }, { email, password }) {
      try {
        // Normalize email (trim and lowercase)
        const normalizedEmail = email.trim().toLowerCase();
        const userCredential = await auth.signInWithEmailAndPassword(normalizedEmail, password);
        const user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || normalizedEmail.split('@')[0],
        };
        commit("SET_USER", user);
        return user;
      } catch (error) {
        console.error('Firebase login error:', error);
        
        // Provide user-friendly error messages
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address format.';
        } else if (error.code === 'auth/user-disabled') {
          errorMessage = 'This account has been disabled.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'No account found with this email. Please sign up first.';
        } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (error.message && error.message.includes('INVALID_LOGIN_CREDENTIALS')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many failed attempts. Please try again later or reset your password.';
        } else if (error.code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Please check your internet connection.';
        }
        
        throw new Error(errorMessage);
      }
    },
    
    async REGISTER({ commit }, { firstName, lastName, email, password }) {
      try {
        // Normalize email (trim and lowercase)
        const normalizedEmail = email.trim().toLowerCase();
        const userCredential = await auth.createUserWithEmailAndPassword(normalizedEmail, password);
        
        // Update user profile with display name
        await userCredential.user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        
        const user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: `${firstName} ${lastName}`,
          firstName,
          lastName,
        };
        commit("SET_USER", user);
        return user;
      } catch (error) {
        console.error('Firebase registration error:', error);
        
        // Provide user-friendly error messages
        let errorMessage = 'Registration failed. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered. Please login instead.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address format.';
        } else if (error.code === 'auth/operation-not-allowed') {
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
        } else if (error.code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Please check your internet connection.';
        }
        
        throw new Error(errorMessage);
      }
    },
    
    async LOGOUT({ commit }) {
      try {
        await auth.signOut();
        commit("LOGOUT_USER");
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },

    // Invoice actions (Firebase Firestore)
    async GET_INVOICES({ commit, state }) {
      if (!state.isAuthenticated || !state.currentUser) {
        return;
      }

      try {
        // Clear existing data
        state.invoiceData = [];
        
        const results = await db.collection("invoices")
          .where("userId", "==", state.currentUser.uid)
          .get();
        
        results.forEach((doc) => {
          const data = {
            docId: doc.id,
            ...doc.data(),
          };
          commit("SET_INVOICE_DATA", data);
        });
        
        commit("INVOICES_LOADED");
        console.log("User invoices loaded from Firebase:", results.size);
      } catch (error) {
        console.error("Error loading invoices:", error);
        commit("INVOICES_LOADED");
      }
    },
    
    async UPDATE_INVOICE({ commit, dispatch, state }, { docId, routeId }) {
      try {
        await db.collection("invoices").doc(docId).delete();
        commit("DELETE_INVOICE", docId);
        await dispatch("GET_INVOICES");
        commit("TOGGLE_INVOICE");
        commit("TOGGLE_EDIT_INVOICE");
        commit("SET_CURRENT_INVOICE", routeId);
      } catch (error) {
        console.error("Error updating invoice:", error);
      }
    },
    
    async DELETE_INVOICE({ commit }, docId) {
      try {
        await db.collection("invoices").doc(docId).delete();
        commit("DELETE_INVOICE", docId);
        console.log("Invoice deleted from Firebase");
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    },
    
    async UPDATE_STATUS_TO_PAID({ commit }, docId) {
      try {
        await db.collection("invoices").doc(docId).update({
          invoicePaid: true,
          invoicePending: false,
        });
        commit("UPDATE_STATUS_TO_PAID", docId);
        console.log("Invoice marked as paid");
      } catch (error) {
        console.error("Error updating invoice status:", error);
      }
    },
    
    async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
      try {
        await db.collection("invoices").doc(docId).update({
          invoicePaid: false,
          invoicePending: true,
          invoiceDraft: false,
        });
        commit("UPDATE_STATUS_TO_PENDING", docId);
        console.log("Invoice marked as pending");
      } catch (error) {
        console.error("Error updating invoice status:", error);
      }
    },
  },
  modules: {},
});
