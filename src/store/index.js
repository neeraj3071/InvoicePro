import { createStore } from "vuex";
import localDB from "../storage/localStorage";
import authService from "../auth/authService";

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
      const user = authService.getCurrentUser();
      if (user) {
        // Verify token is still valid
        const isValid = await authService.verifyToken();
        if (isValid) {
          commit("SET_USER", user);
          return user;
        }
      }
      return null;
    },
    
    async LOGIN({ commit }, { email, password }) {
      try {
        console.log('LOGIN action called with:', { email });
        const result = await authService.login(email, password);
        console.log('Login successful, user:', result.user);
        commit("SET_USER", result.user);
        return result.user;
      } catch (error) {
        console.error('LOGIN action error:', error);
        throw error;
      }
    },
    
    async REGISTER({ commit }, userData) {
      try {
        console.log('REGISTER action called with:', userData);
        const result = await authService.register(userData);
        console.log('Registration successful, user:', result.user);
        commit("SET_USER", result.user);
        return result.user;
      } catch (error) {
        console.error('REGISTER action error:', error);
        throw error;
      }
    },
    
    LOGOUT({ commit }) {
      console.log('LOGOUT action called');
      authService.logout();
      commit("LOGOUT_USER");
      console.log('User logged out successfully');
    },

    // Invoice actions (user-specific)
    async GET_INVOICES({ commit, state }) {
      if (!state.isAuthenticated) {
        return;
      }

      try {
        const invoices = localDB.getInvoices();
        
        // Clear existing data to avoid duplicates
        state.invoiceData = [];
        
        invoices.forEach((invoice) => {
          const data = {
            docId: invoice.docId,
            invoiceId: invoice.invoiceId,
            billerStreetAddress: invoice.billerStreetAddress,
            billerCity: invoice.billerCity,
            billerZipCode: invoice.billerZipCode,
            billerCountry: invoice.billerCountry,
            clientName: invoice.clientName,
            clientEmail: invoice.clientEmail,
            clientStreetAddress: invoice.clientStreetAddress,
            clientCity: invoice.clientCity,
            clientZipCode: invoice.clientZipCode,
            clientCountry: invoice.clientCountry,
            invoiceDateUnix: invoice.invoiceDateUnix,
            invoiceDate: invoice.invoiceDate,
            paymentTerms: invoice.paymentTerms,
            paymentDueDateUnix: invoice.paymentDueDateUnix,
            paymentDueDate: invoice.paymentDueDate,
            productDescription: invoice.productDescription,
            invoiceItemList: invoice.invoiceItemList,
            invoiceTotal: invoice.invoiceTotal,
            invoicePending: invoice.invoicePending,
            invoiceDraft: invoice.invoiceDraft,
            invoicePaid: invoice.invoicePaid,
          };
          commit("SET_INVOICE_DATA", data);
        });
        
        commit("INVOICES_LOADED");
        console.log("User invoices loaded from localStorage:", invoices.length);
      } catch (error) {
        console.log("LocalStorage loading failed:", error);
        commit("INVOICES_LOADED");
      }
    },
    async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_INVOICE", docId);
      await dispatch("GET_INVOICES");
      commit("TOGGLE_INVOICE");
      commit("TOGGLE_EDIT_INVOICE");
      commit("SET_CURRENT_INVOICE", routeId);
    },
    async DELETE_INVOICE({ commit }, docId) {
      try {
        localDB.deleteInvoice(docId);
        commit("DELETE_INVOICE", docId);
        console.log("Invoice deleted from localStorage");
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    },
    async UPDATE_STATUS_TO_PAID({ commit }, docId) {
      try {
        localDB.updateInvoice(docId, {
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
        localDB.updateInvoice(docId, {
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
