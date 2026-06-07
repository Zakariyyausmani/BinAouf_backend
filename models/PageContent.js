const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, unique: true }, // 'home', 'about', 'process'
  title: { type: String }, // SEO title
  metaDescription: { type: String }, // SEO description
  metaKeywords: { type: String }, // SEO keywords
  sections: { type: mongoose.Schema.Types.Mixed, default: {} } // Flexible object for arbitrary page sections
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
