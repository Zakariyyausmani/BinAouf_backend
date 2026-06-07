const express = require('express');
const router = express.Router();
const PageContent = require('../models/PageContent');
const { protect } = require('../middleware/authMiddleware');

// Get page content by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const content = await PageContent.findOne({ pageSlug: req.params.slug });
    if (!content) {
      return res.status(404).json({ message: 'Page content not found' });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update page content
router.post('/:slug', protect, async (req, res) => {
  try {
    let content = await PageContent.findOne({ pageSlug: req.params.slug });
    if (content) {
      // Update existing
      content.title = req.body.title || content.title;
      content.metaDescription = req.body.metaDescription || content.metaDescription;
      content.metaKeywords = req.body.metaKeywords || content.metaKeywords;
      content.sections = req.body.sections || content.sections;
      await content.save();
    } else {
      // Create new
      content = await PageContent.create({
        pageSlug: req.params.slug,
        title: req.body.title,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords,
        sections: req.body.sections
      });
    }
    res.json(content);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
