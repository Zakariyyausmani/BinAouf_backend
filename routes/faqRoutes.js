const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const { protect } = require('../middleware/authMiddleware');

// Get all FAQs (public)
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1 });
    // Filter out inactive FAQs for public unless ?admin=true is passed
    if (req.query.admin) {
      res.json(faqs);
    } else {
      res.json(faqs.filter(f => f.isActive));
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an FAQ
router.post('/', protect, async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json(faq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an FAQ
router.put('/:id', protect, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an FAQ
router.delete('/:id', protect, async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
