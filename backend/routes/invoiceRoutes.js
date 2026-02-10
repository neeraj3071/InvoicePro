const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

// @route   GET /api/invoices
// @desc    Get all invoices for current user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { userId: req.user._id };
    
    // Filter by status if provided
    if (status) {
      if (status === 'draft') {
        query.invoiceDraft = true;
      } else if (status === 'paid') {
        query.invoicePaid = true;
      } else if (status === 'pending') {
        query.invoicePending = true;
      }
    }

    const invoices = await Invoice.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      message: 'Invoices retrieved successfully',
      count: invoices.length,
      invoices
    });

  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error retrieving invoices' });
  }
});

// @route   GET /api/invoices/:invoiceId
// @desc    Get single invoice by invoiceId
// @access  Private
router.get('/:invoiceId', async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      invoiceId: req.params.invoiceId,
      userId: req.user._id
    }).lean();

    if (!invoice) {
      return res.status(404).json({ 
        message: 'Invoice not found' 
      });
    }

    res.json({
      message: 'Invoice retrieved successfully',
      invoice
    });

  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ message: 'Server error retrieving invoice' });
  }
});

// @route   POST /api/invoices
// @desc    Create new invoice
// @access  Private
router.post('/', async (req, res) => {
  try {
    const invoiceData = {
      ...req.body,
      userId: req.user._id
    };

    const invoice = new Invoice(invoiceData);
    await invoice.save();

    res.status(201).json({
      message: 'Invoice created successfully',
      invoice
    });

  } catch (error) {
    console.error('Create invoice error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error creating invoice' });
  }
});

// @route   PUT /api/invoices/:invoiceId
// @desc    Update invoice
// @access  Private
router.put('/:invoiceId', async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      invoiceId: req.params.invoiceId,
      userId: req.user._id
    });

    if (!invoice) {
      return res.status(404).json({ 
        message: 'Invoice not found' 
      });
    }

    // Update invoice fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'userId' && key !== 'invoiceId') {
        invoice[key] = req.body[key];
      }
    });

    await invoice.save();

    res.json({
      message: 'Invoice updated successfully',
      invoice
    });

  } catch (error) {
    console.error('Update invoice error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error updating invoice' });
  }
});

// @route   DELETE /api/invoices/:invoiceId
// @desc    Delete invoice
// @access  Private
router.delete('/:invoiceId', async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      invoiceId: req.params.invoiceId,
      userId: req.user._id
    });

    if (!invoice) {
      return res.status(404).json({ 
        message: 'Invoice not found' 
      });
    }

    res.json({
      message: 'Invoice deleted successfully',
      invoiceId: req.params.invoiceId
    });

  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ message: 'Server error deleting invoice' });
  }
});

// @route   PATCH /api/invoices/:invoiceId/status
// @desc    Update invoice status (paid, pending, draft)
// @access  Private
router.patch('/:invoiceId/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['paid', 'pending', 'draft'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: paid, pending, draft' 
      });
    }

    const invoice = await Invoice.findOne({
      invoiceId: req.params.invoiceId,
      userId: req.user._id
    });

    if (!invoice) {
      return res.status(404).json({ 
        message: 'Invoice not found' 
      });
    }

    // Reset all status flags
    invoice.invoicePaid = false;
    invoice.invoicePending = false;
    invoice.invoiceDraft = false;

    // Set the correct flag
    if (status === 'paid') {
      invoice.invoicePaid = true;
    } else if (status === 'pending') {
      invoice.invoicePending = true;
    } else if (status === 'draft') {
      invoice.invoiceDraft = true;
    }

    await invoice.save();

    res.json({
      message: 'Invoice status updated successfully',
      invoice
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error updating invoice status' });
  }
});

module.exports = router;