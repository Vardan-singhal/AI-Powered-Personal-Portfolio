const asyncHandler = require('express-async-handler');
const { verifyAccess } = require('../config/jwt');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) { res.status(401); throw new Error('Not authorized'); }
  try {
    const decoded = verifyAccess(token);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) { res.status(401); throw new Error('User not found'); }
    next();
  } catch (e) {
    res.status(401); throw new Error('Invalid token');
  }
});

module.exports = { protect };
