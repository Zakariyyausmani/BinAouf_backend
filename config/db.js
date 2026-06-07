const mongoose = require('mongoose');

let isConnected; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    // console.log('=> using existing database connection');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.error('CRITICAL ERROR: MONGODB_URI environment variable is missing!');
    }

    console.log('=> creating new database connection');
    const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bin_aouf', {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
