const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: {
      type: String, // Emoji or SVG string
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    specifications: [
      {
        name: { type: String, required: true },
        weight: { type: String, required: true },
        size: { type: String, required: true },
        packing: { type: String, required: true },
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
