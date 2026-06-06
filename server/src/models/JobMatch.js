const mongoose = require('mongoose');

const jobMatchSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobDescription: String,
    resumeText: String,
    matchPercentage: { type: Number, min: 0, max: 100 },
    matchingSkills: [String],
    missingSkills: [String],
    suggestions: [String],
    atsAdvice: [String],
    raw: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobMatch', jobMatchSchema);
