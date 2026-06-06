const r = require('express').Router();
const c = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
r.post('/', c.create);
r.get('/', protect, admin, c.list);
module.exports = r;
