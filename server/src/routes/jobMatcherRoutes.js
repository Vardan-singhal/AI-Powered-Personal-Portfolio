const r = require('express').Router();
const c = require('../controllers/jobMatcherController');
const { uploadResume } = require('../middleware/uploadMiddleware');
r.post('/match', uploadResume.single('resume'), c.match);
module.exports = r;
