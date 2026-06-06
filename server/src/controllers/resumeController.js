const asyncHandler = require('express-async-handler');
const { reviewResume } = require('../services/ai/resumeReviewService');
const ResumeReview = require('../models/ResumeReview');

exports.review = asyncHandler(async (req, res) => {
  if (!req.file) { res.status(400); throw new Error('Resume file required'); }
  const { result } = await reviewResume(req.file.path);
  const review = await ResumeReview.create({
    user: req.user?._id,
    fileName: req.file.originalname,
    fileUrl: `/uploads/resumes/${req.file.filename}`,
    atsScore: result.atsScore,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    missingKeywords: result.missingKeywords,
    suggestions: result.suggestions,
    formattingNotes: result.formattingNotes,
    raw: result,
  });
  res.json(review);
});

exports.list = asyncHandler(async (_req, res) => {
  res.json(await ResumeReview.find().sort({ createdAt: -1 }).limit(50));
});
