require('dotenv').config({path: '.env'});
const connectDB = require('../config/db');
const User = require('../models/User');
const Project = require('../models/Project');

(async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'changeme';
  let admin = await User.findOne({ email });
  if (!admin) {
    admin = await User.create({ name: 'Admin', email, password, role: 'admin' });
    console.log('Admin created:', email);
  } else console.log('Admin exists:', email);

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      { title: 'AI Chatbot', description: 'RAG chatbot built with Gemini', technologies: ['React','Node','Gemini'], featured: true },
      { title: 'AI App Idea Generator', description: 'Generates startup ideas using Gemini', technologies: ['React','Node','Gemini'], featured: true },
      { title: 'AI Plant Analysis', description: 'Identifies plants and gives care tips', technologies: ['React','Node','Gemini Vision'] },
    ]);
    console.log('Seeded sample projects');
  }
  process.exit(0);
})();
