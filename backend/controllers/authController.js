const AdminUser = require('../models/AdminUser');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'binaouf_secret_key_123', {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      // Update last login
      admin.lastLogin = new Date();
      await admin.save();

      res.json({
        _id: admin._id,
        username: admin.username,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register first admin (only works if no admin exists)
// @route   POST /api/auth/register-first
// @access  Public
const registerFirstAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminExists = await AdminUser.findOne({});
    if (adminExists) {
      return res.status(400).json({ message: 'An admin already exists in the system. First registration disabled.' });
    }

    const admin = await AdminUser.create({
      username,
      password,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.user._id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginAdmin,
  registerFirstAdmin,
  getMe,
};
