const express = require('express');
const router = express.Router();
const { loginAdmin, registerFirstAdmin, getMe, getAdmins, createAdmin, deleteAdmin, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/register-first', registerFirstAdmin);
router.get('/me', protect, getMe);

router.get('/users', protect, getAdmins);
router.post('/users', protect, createAdmin);
router.put('/users/password', protect, changePassword);
router.delete('/users/:id', protect, deleteAdmin);

module.exports = router;
