const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateTokens = require('../utils/generateToken');
const { verifyRefresh } = require('../config/jwt');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) { res.status(400); throw new Error('Email already in use'); }
  const user = await User.create({ name, email, password });
  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken; await user.save();
  res.status(201).json({ user: { id: user._id, name, email, role: user.role }, ...tokens });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) { res.status(401); throw new Error('Invalid credentials'); }
  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken; await user.save();
  res.json({ user: { id: user._id, name: user.name, email, role: user.role }, ...tokens });
});

exports.refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) { res.status(401); throw new Error('No refresh token'); }
  try {
    const decoded = verifyRefresh(refreshToken);
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== refreshToken) { res.status(401); throw new Error('Invalid refresh'); }
    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken; await user.save();
    res.json(tokens);
  } catch { res.status(401); throw new Error('Invalid refresh'); }
});

exports.logout = asyncHandler(async (req, res) => {
  if (req.user) { req.user.refreshToken = null; await req.user.save(); }
  res.json({ ok: true });
});

exports.me = asyncHandler(async (req, res) => res.json(req.user));
