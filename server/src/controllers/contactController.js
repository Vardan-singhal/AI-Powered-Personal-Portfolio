const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
exports.create = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) { res.status(400); throw new Error('All fields required'); }
  const c = await Contact.create({ name, email, message });
  res.status(201).json(c);
});
exports.list = asyncHandler(async (_req, res) => res.json(await Contact.find().sort({ createdAt: -1 })));
