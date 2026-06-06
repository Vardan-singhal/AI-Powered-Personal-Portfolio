const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

exports.list = asyncHandler(async (req, res) => {
  const { featured, q } = req.query;
  const filter = {};
  if (featured) filter.featured = featured === 'true';
  if (q) filter.title = { $regex: q, $options: 'i' };
  res.json(await Project.find(filter).sort({ featured: -1, createdAt: -1 }));
});

exports.get = asyncHandler(async (req, res) => {
  const p = await Project.findById(req.params.id);
  if (!p) { res.status(404); throw new Error('Not found'); }
  res.json(p);
});

exports.create = asyncHandler(async (req, res) => {
  console.log('Creating project - body keys:', Object.keys(req.body));
  console.log('Files present:', Array.isArray(req.files) ? req.files.map(f => f.originalname) : req.files);
  const body = { ...req.body };
  if (typeof body.technologies === 'string') body.technologies = body.technologies.split(',').map((s) => s.trim());
  if (req.files?.length) body.images = req.files.map((f) => ({ url: f.path, publicId: f.filename }));
  const p = await Project.create(body);
  res.status(201).json(p);
});

exports.update = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (typeof body.technologies === 'string') body.technologies = body.technologies.split(',').map((s) => s.trim());
  if (req.files?.length) body.$push = { images: { $each: req.files.map((f) => ({ url: f.path, publicId: f.filename })) } };
  const p = await Project.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!p) { res.status(404); throw new Error('Not found'); }
  res.json(p);
});

exports.remove = asyncHandler(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});
