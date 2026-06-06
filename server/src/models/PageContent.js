const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: ['home', 'about', 'experience', 'skills', 'contact', 'projects'],
    },
    title: String,
    content: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('PageContent', pageContentSchema);
