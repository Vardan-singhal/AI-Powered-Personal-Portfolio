const r = require('express').Router();
const c = require('../controllers/aiController');
r.post('/', c.chat);
r.post('/explain/:id', c.explainProject);
module.exports = r;
