// Local Storage utility functions for user-specific invoice management
import authService from '../auth/authService';

export default {
  // Get invoices for current user
  getInvoices() {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) return [];
      
      const allInvoices = localStorage.getItem('invoices');
      const invoices = allInvoices ? JSON.parse(allInvoices) : [];
      
      // Return only invoices for current user
      return invoices.filter(invoice => invoice.userId === currentUser.id);
    } catch (error) {
      console.error('Error reading invoices from localStorage:', error);
      return [];
    }
  },

  // Save an invoice for current user
  saveInvoice(invoice) {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const allInvoices = this.getAllInvoices();
      const invoiceId = invoice.invoiceId || this.generateId();
      const docId = invoice.docId || this.generateId();
      
      const newInvoice = {
        ...invoice,
        invoiceId,
        docId,
        userId: currentUser.id, // Associate invoice with user
        createdAt: new Date().getTime()
      };
      
      allInvoices.push(newInvoice);
      localStorage.setItem('invoices', JSON.stringify(allInvoices));
      return newInvoice;
    } catch (error) {
      console.error('Error saving invoice to localStorage:', error);
      throw error;
    }
  },

  // Update an existing invoice (only if owned by current user)
  updateInvoice(docId, updatedData) {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const allInvoices = this.getAllInvoices();
      const index = allInvoices.findIndex(invoice => 
        invoice.docId === docId && invoice.userId === currentUser.id
      );
      
      if (index !== -1) {
        allInvoices[index] = { ...allInvoices[index], ...updatedData };
        localStorage.setItem('invoices', JSON.stringify(allInvoices));
        return allInvoices[index];
      }
      throw new Error('Invoice not found or access denied');
    } catch (error) {
      console.error('Error updating invoice in localStorage:', error);
      throw error;
    }
  },

  // Delete an invoice (only if owned by current user)
  deleteInvoice(docId) {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const allInvoices = this.getAllInvoices();
      const filteredInvoices = allInvoices.filter(invoice => 
        !(invoice.docId === docId && invoice.userId === currentUser.id)
      );
      
      localStorage.setItem('invoices', JSON.stringify(filteredInvoices));
      return true;
    } catch (error) {
      console.error('Error deleting invoice from localStorage:', error);
      throw error;
    }
  },

  // Get all invoices (admin function - returns invoices for all users)
  getAllInvoices() {
    try {
      const invoices = localStorage.getItem('invoices');
      return invoices ? JSON.parse(invoices) : [];
    } catch (error) {
      console.error('Error reading all invoices:', error);
      return [];
    }
  },

  // Generate a unique ID
  generateId(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Clear all invoices for current user
  clearUserInvoices() {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;

    const allInvoices = this.getAllInvoices();
    const filteredInvoices = allInvoices.filter(invoice => invoice.userId !== currentUser.id);
    localStorage.setItem('invoices', JSON.stringify(filteredInvoices));
  },

  // Clear all invoices (admin function)
  clearAll() {
    localStorage.removeItem('invoices');
  }
};