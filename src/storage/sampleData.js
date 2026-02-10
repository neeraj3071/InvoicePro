// Sample invoice data for new user onboarding
import localDB from './localStorage';
import authService from '../auth/authService';

export default {
  createSampleInvoicesForUser() {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;

    // Check if user already has invoices
    const existingInvoices = localDB.getInvoices();
    if (existingInvoices.length > 0) {
      console.log('User already has invoices');
      return;
    }

    // Create sample invoices for the new user
    const sampleInvoices = [
      {
        invoiceId: localDB.generateId(6),
        docId: localDB.generateId(8),
        userId: currentUser.id,
        billerStreetAddress: "123 Your Street",
        billerCity: "Your City",
        billerZipCode: "12345",
        billerCountry: "United States",
        clientName: "Sample Client Co.",
        clientEmail: "client@example.com",
        clientStreetAddress: "456 Client Street",
        clientCity: "Client City",
        clientZipCode: "67890",
        clientCountry: "United States",
        invoiceDate: "Nov 1, 2023",
        invoiceDateUnix: 1698796800000,
        paymentTerms: "30",
        paymentDueDate: "Dec 1, 2023",
        paymentDueDateUnix: 1701388800000,
        productDescription: "Web Development Services",
        invoiceItemList: [
          {
            id: localDB.generateId(4),
            itemName: "Website Design",
            qty: 20,
            price: 75,
            total: 1500
          },
          {
            id: localDB.generateId(4),
            itemName: "Frontend Development", 
            qty: 30,
            price: 85,
            total: 2550
          }
        ],
        invoiceTotal: 4050,
        invoicePending: true,
        invoiceDraft: false,
        invoicePaid: false,
        createdAt: Date.now() - 86400000 // 1 day ago
      },
      {
        invoiceId: localDB.generateId(6),
        docId: localDB.generateId(8),
        userId: currentUser.id,
        billerStreetAddress: "123 Your Street",
        billerCity: "Your City", 
        billerZipCode: "12345",
        billerCountry: "United States",
        clientName: "Demo Industries",
        clientEmail: "demo@industries.com",
        clientStreetAddress: "789 Demo Avenue",
        clientCity: "Demo City",
        clientZipCode: "54321",
        clientCountry: "United States",
        invoiceDate: "Oct 15, 2023",
        invoiceDateUnix: 1697328000000,
        paymentTerms: "60",
        paymentDueDate: "Dec 14, 2023",
        paymentDueDateUnix: 1702512000000,
        productDescription: "Mobile App Development",
        invoiceItemList: [
          {
            id: localDB.generateId(4),
            itemName: "App Design",
            qty: 15,
            price: 100,
            total: 1500
          },
          {
            id: localDB.generateId(4),
            itemName: "Development",
            qty: 40,
            price: 95,
            total: 3800
          }
        ],
        invoiceTotal: 5300,
        invoicePending: false,
        invoiceDraft: false,
        invoicePaid: true,
        createdAt: Date.now() - 172800000 // 2 days ago
      }
    ];

    // Save sample invoices using the localStorage utility
    sampleInvoices.forEach(invoice => {
      try {
        // Use the existing saveInvoice method
        localDB.saveInvoice(invoice);
      } catch (error) {
        console.error('Error creating sample invoice:', error);
      }
    });

    console.log(`Created ${sampleInvoices.length} sample invoices for user: ${currentUser.firstName} ${currentUser.lastName}`);
  },

  clearUserData() {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;
    
    localDB.clearUserInvoices();
    console.log('User invoice data cleared');
  }
};