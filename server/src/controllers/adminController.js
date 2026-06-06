const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const ResumeReview = require('../models/ResumeReview');
const JobMatch = require('../models/JobMatch');
const Message = require('../models/Message');
const KnowledgeBase = require('../models/KnowledgeBase');
const path = require('path');
const fs = require('fs');
const { ingestResume } = require('../vector-db/ingestResume');
const { ingestMarkdownDir } = require('../vector-db/ingestProjects');

exports.dashboard = asyncHandler(async (_req, res) => {
  const [projects, reviews, matches, messages, kb] = await Promise.all([
    Project.countDocuments(), ResumeReview.countDocuments(),
    JobMatch.countDocuments(), Message.countDocuments(), KnowledgeBase.countDocuments(),
  ]);
  res.json({ projects, reviews, matches, messages, knowledgeChunks: kb });
});

exports.reindex = asyncHandler(async (_req, res) => {
  const kbDir = path.join(__dirname, '..', '..', 'knowledge-base');
  const resumePath = path.join(kbDir, 'resume', 'resume.pdf');
  const out = {};
  if (fs.existsSync(resumePath)) out.resume = await ingestResume(resumePath);
  out.projects = await ingestMarkdownDir('projects', path.join(kbDir, 'projects'));
  out.skills = await ingestMarkdownDir('skills', path.join(kbDir, 'skills'));
  out.experience = await ingestMarkdownDir('experience', path.join(kbDir, 'experience'));
  res.json({ ok: true, ingested: out });
});

exports.knowledgeList = asyncHandler(async (_req, res) => {
  const docs = await KnowledgeBase.find().select('-embedding').sort({ source: 1, chunkIndex: 1 });
  res.json(docs);
});

exports.knowledgeDelete = asyncHandler(async (req, res) => {
  await KnowledgeBase.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});
