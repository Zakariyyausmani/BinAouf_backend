const express = require('express');
const router = express.Router();
const { loginAdmin, registerFirstAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/register-first', registerFirstAdmin);
router.get('/me', protect, getMe);

module.exports = router;
