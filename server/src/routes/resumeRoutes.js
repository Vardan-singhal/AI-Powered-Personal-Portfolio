const r = require('express').Router();
const c = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { uploadResume } = require('../middleware/uploadMiddleware');
r.post('/review', uploadResume.single('resume'), c.review);
r.get('/', protect, admin, c.list);
module.exports = r;
