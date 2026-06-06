const asyncHandler = require('express-async-handler');
const { chat } = require('../services/ai/chatbotService');
const { explainProject } = require('../services/ai/projectExplainerService');
const Project = require('../models/Project');

const PROJECT_KEYWORDS = [
  'project',
  'projects',
  'demo',
  'live demo',
  'github',
  'portfolio',
  'show my work',
  'what have you built',
  'your work',
  'ai projects',
  'mern projects',
  'frontend projects',
  'backend projects',
];

exports.chat = asyncHandler(async (req, res) => {
  const { sessionId, question } = req.body;

  if (!question) {
    res.status(400);
    throw new Error('Question required');
  }

  const q = question.toLowerCase();

  const isProjectQuery = PROJECT_KEYWORDS.some((keyword) =>
    q.includes(keyword)
  );

  if (isProjectQuery) {
    const projects = await Project.find()
      .select(
        '_id title description technologies githubUrl liveUrl featured category'
      )
      .sort({ featured: -1, createdAt: -1 });

    return res.json({
      type: 'projects',
      projects,
    });
  }

  const sid = sessionId || `anon-${Date.now()}`;

  const result = await chat({
    sessionId: sid,
    question,
  });

  res.json({
    sessionId: sid,
    ...result,
  });
});

exports.explainProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const data = await explainProject(project);

  res.json(data);
});