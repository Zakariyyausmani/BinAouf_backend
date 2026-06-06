const express = require('express');
const router = express.Router();
const {
  submitQuoteRequest,
  getQuoteRequests,
  updateQuoteStatus,
  deleteQuoteRequest,
  getAnalytics,
} = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(submitQuoteRequest)
  .get(protect, getQuoteRequests);

router.route('/analytics')
  .get(protect, getAnalytics);

router.route('/:id')
  .delete(protect, deleteQuoteRequest);

router.route('/:id/status')
  .put(protect, updateQuoteStatus);

module.exports = router;
