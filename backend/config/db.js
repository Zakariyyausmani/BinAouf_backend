const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI exists to help debug Vercel Env Vars
    if (!process.env.MONGODB_URI) {
      console.error('CRITICAL ERROR: MONGODB_URI environment variable is missing!');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bin_aouf');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // DO NOT call process.exit(1) here! 
    // In Vercel (serverless), exiting the process crashes the entire function and hides the error.
  }
};

module.exports = connectDB;
