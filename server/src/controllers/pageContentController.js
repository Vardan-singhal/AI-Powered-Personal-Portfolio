const asyncHandler = require('express-async-handler');
const PageContent = require('../models/PageContent');

// Get a specific page's content
exports.getPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  let page = await PageContent.findOne({ slug });
  
  // Return default content if page doesn't exist
  if (!page) {
    const defaults = {
      home: {
        title : 'Vardan Singhal',
        content: {
          hero: {
            title: 'Vardan Singhal',
            subtitle: 'Building modern web applications with React, Node.js, Express, MongoDB, and AI.',
            roles: [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Web Developer',
    'Software Developer',
  ],
            ctas: [
              { text: 'View Projects', link: '/projects', variant: 'primary' },
              { text: 'Resume Reviewer', link: '/resume', variant: 'ghost' },
            ],
          },
          features: [
            { icon: 'FiCpu', title: 'AI Recruiter Assistant', body: 'Chat with an AI that knows every project, skill, and experience.' },
            { icon: 'FiFileText', title: 'Resume Reviewer', body: 'Upload your resume, get an ATS score and improvement suggestions.' },
            { icon: 'FiGithub', title: 'GitHub Dashboard', body: 'Live stats, repositories, and language analytics.' },
          ],
        },
      },
      about: {
        title: 'About Me',
        content: {
          intro: 'Full-stack developer focused on AI-enhanced products. I build with React, Node, and the Gemini API.',
          resumeUrl: '/resume.pdf',
          sections: [
            {
              heading: 'Education',
              items: [
                { title: 'B.Tech in Computer Science',institution : 'Chandigarh University' ,date: '2021 — 2025' },
              ],
            },
          ],
        },
      },
      experience: {
        title: 'Experience',
        content: {
          items: [
            { role: 'Full-Stack Intern', company: 'Example Co.', date: '2024', body: 'Shipped MERN dashboards and an internal RAG knowledge assistant.' },
          ],
        },
      },
      skills: {
        title: 'Skills',
        content: {
          categories: {
            Frontend: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'Redux'],
            Backend: ['Node.js', 'Express', 'REST APIs', 'JWT'],
            Database: ['MongoDB', 'Mongoose', 'Postgres'],
            AI: ['Gemini', 'OpenAI', 'RAG', 'Embeddings'],
            Tools: ['Git', 'Docker', 'Cloudinary', 'Vercel'],
          },
        },
      },
      contact: {
        title: 'Get in Touch',
        content: {
          intro: 'Have a question or want to collaborate? Feel free to reach out!',
          social: {
            github: '',
            linkedin: '',
            email: '',
          },
        },
      },
      projects: {
        title: 'Projects',
        content: {
          intro: 'Explore my latest projects and contributions.',
        },
      },
    };
    
    page = await PageContent.create({
      slug,
      title: defaults[slug]?.title,
      content: defaults[slug]?.content,
    });
  }
  
  res.json(page);
});

// Get all pages
exports.getAllPages = asyncHandler(async (req, res) => {
  const pages = await PageContent.find();
  res.json(pages);
});

// Update page content (admin only)
exports.updatePage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { title, content } = req.body;
  
  let page = await PageContent.findOne({ slug });
  
  if (!page) {
    page = new PageContent({ slug, title, content });
  } else {
    if (title) page.title = title;
    if (content) page.content = content;
  }
  
  await page.save();
  res.json(page);
});

// Delete page (resets to defaults)
exports.resetPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  await PageContent.deleteOne({ slug });
  res.json({ message: 'Page reset to defaults' });
});
