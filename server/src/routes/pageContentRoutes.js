const r = require('express').Router();
const c = require('../controllers/pageContentController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Public routes
r.get('/:slug', c.getPage);
r.get('/', c.getAllPages);

// Admin routes
r.put('/:slug', protect, admin, c.updatePage);
r.delete('/:slug', protect, admin, c.resetPage);

module.exports = r;
