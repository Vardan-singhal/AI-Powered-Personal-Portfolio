const r = require('express').Router();
const c = require('../controllers/githubController');
r.get('/stats', c.stats);
r.get('/repos', c.repos);
module.exports = r;
