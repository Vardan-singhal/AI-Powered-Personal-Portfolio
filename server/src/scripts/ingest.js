require('dotenv').config();
const path = require('path');
const fs = require('fs');
const connectDB = require('../config/db');
const { ingestResume } = require('../vector-db/ingestResume');
const { ingestMarkdownDir } = require('../vector-db/ingestProjects');

(async () => {
  await connectDB();
  const kbDir = path.join(__dirname, '..', '..', 'knowledge-base');
  const resumePath = path.join(kbDir, 'resume', 'resume.pdf');
  if (fs.existsSync(resumePath)) console.log('resume chunks:', await ingestResume(resumePath));
  console.log('project chunks:', await ingestMarkdownDir('projects', path.join(kbDir, 'projects')));
  console.log('skills chunks:', await ingestMarkdownDir('skills', path.join(kbDir, 'skills')));
  console.log('experience chunks:', await ingestMarkdownDir('experience', path.join(kbDir, 'experience')));
  process.exit(0);
})();
