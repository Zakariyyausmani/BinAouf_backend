const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    productInterest: {
      type: String,
      required: true,
    },
    orderType: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      trim: true,
    },
    targetMarket: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Replied', 'Closed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
