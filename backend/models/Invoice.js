const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  billerStreetAddress: {
    type: String,
    required: [true, 'Biller street address is required']
  },
  billerCity: {
    type: String,
    required: [true, 'Biller city is required']
  },
  billerZipCode: {
    type: String,
    required: [true, 'Biller zip code is required']
  },
  billerState: {
    type: String,
    required: [true, 'Biller state is required']
  },
  billerCountry: {
    type: String,
    required: [true, 'Biller country is required']
  },
  clientName: {
    type: String,
    required: [true, 'Client name is required']
  },
  clientEmail: {
    type: String,
    required: [true, 'Client email is required'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid client email address'
    ]
  },
  clientStreetAddress: {
    type: String,
    required: [true, 'Client street address is required']
  },
  clientCity: {
    type: String,
    required: [true, 'Client city is required']
  },
  clientZipCode: {
    type: String,
    required: [true, 'Client zip code is required']
  },
  clientState: {
    type: String,
    required: [true, 'Client state is required']
  },
  clientCountry: {
    type: String,
    required: [true, 'Client country is required']
  },
  invoiceDateUnix: {
    type: Number,
    required: [true, 'Invoice date is required']
  },
  invoiceDate: {
    type: String,
    required: [true, 'Invoice date string is required']
  },
  paymentTerms: {
    type: String,
    required: [true, 'Payment terms are required']
  },
  paymentDueDateUnix: {
    type: Number,
    required: [true, 'Payment due date is required']
  },
  paymentDueDate: {
    type: String,
    required: [true, 'Payment due date string is required']
  },
  productDescription: {
    type: String,
    required: [true, 'Product description is required']
  },
  invoiceItemList: [{
    id: {
      type: String,
      required: true,
      default: uuidv4
    },
    itemName: {
      type: String,
      required: [true, 'Item name is required']
    },
    qty: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    total: {
      type: Number,
      required: [true, 'Total is required'],
      min: [0, 'Total cannot be negative']
    }
  }],
  invoiceTotal: {
    type: Number,
    required: [true, 'Invoice total is required'],
    min: [0, 'Invoice total cannot be negative']
  },
  invoicePending: {
    type: Boolean,
    default: true
  },
  invoiceDraft: {
    type: Boolean,
    default: false
  },
  invoicePaid: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
invoiceSchema.index({ userId: 1, createdAt: -1 });
invoiceSchema.index({ userId: 1, invoicePending: 1 });
invoiceSchema.index({ userId: 1, invoicePaid: 1 });
invoiceSchema.index({ userId: 1, invoiceDraft: 1 });

// Calculate total before saving
invoiceSchema.pre('save', function(next) {
  if (this.invoiceItemList && this.invoiceItemList.length > 0) {
    this.invoiceTotal = this.invoiceItemList.reduce((total, item) => {
      item.total = item.qty * item.price;
      return total + item.total;
    }, 0);
  }
  next();
});

// Virtual for status
invoiceSchema.virtual('status').get(function() {
  if (this.invoiceDraft) return 'draft';
  if (this.invoicePaid) return 'paid';
  if (this.invoicePending) return 'pending';
  return 'unknown';
});

// Ensure virtual fields are serialized
invoiceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Invoice', invoiceSchema);