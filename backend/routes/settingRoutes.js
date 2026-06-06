const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSetting,
  bulkUpdateSettings,
} = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSettings)
  .post(protect, updateSetting);

router.route('/bulk')
  .post(protect, bulkUpdateSettings);

module.exports = router;
