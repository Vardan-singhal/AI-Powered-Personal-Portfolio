const asyncHandler = require('express-async-handler');
const { matchJob } = require('../services/ai/jobMatcherService');
const JobMatch = require('../models/JobMatch');

exports.match = asyncHandler(async (req, res) => {
  const { jobDescription, resumeText } = req.body;
  if (!jobDescription) { res.status(400); throw new Error('Job description required'); }
  if (!req.file && !resumeText) { res.status(400); throw new Error('Resume required'); }
  const { result, resumeText: rt } = await matchJob({
    filePath: req.file?.path, resumeText, jobDescription,
  });
  const match = await JobMatch.create({
    user: req.user?._id,
    jobDescription, resumeText: rt,
    matchPercentage: result.matchPercentage,
    matchingSkills: result.matchingSkills,
    missingSkills: result.missingSkills,
    suggestions: result.suggestions,
    atsAdvice: result.atsAdvice,
    raw: result,
  });
  res.json(match);
});
