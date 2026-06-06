const mongoose = require('mongoose');

const resumeReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fileUrl: String,
    fileName: String,
    atsScore: { type: Number, min: 0, max: 100 },
    strengths: [String],
    weaknesses: [String],
    missingKeywords: [String],
    suggestions: [String],
    formattingNotes: String,
    raw: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeReview', resumeReviewSchema);
