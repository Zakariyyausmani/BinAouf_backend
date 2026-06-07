const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables immediately
dotenv.config();

const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const settingRoutes = require('./routes/settingRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

// Connect to Database
connectDB();

const app = express();

// ----- CORS configuration ---------------------------------------------------
// Load the allowed origin from .env (fallback to the frontend URL for safety)
const allowedOrigin = process.env.CORS_ORIGIN || 'https://bin-aouf-frontend.vercel.app';

// Define options for the cors middleware
const corsOptions = {
  origin: (origin, callback) => {
    // For non-browser requests (e.g., Postman) origin may be undefined
    if (!origin) return callback(null, true);
    // Allow the exact whitelisted origin
    if (origin === allowedOrigin) return callback(null, true);
    // Otherwise reject
    const msg = `Origin ${origin} not allowed by CORS`;
    return callback(new Error(msg), false);
  },
  credentials: true, // if you need to send cookies / auth headers
};

// Apply the middleware
app.use(cors(corsOptions));
// -----------------------------------------------------------------
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/pages', require('./routes/pageContentRoutes'));

// Static folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});
// Base route
app.get('/', (req, res) => {
  res.send('Bin Aouf API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('ERROR ENCOUNTERED:', err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}
module.exports = app;
