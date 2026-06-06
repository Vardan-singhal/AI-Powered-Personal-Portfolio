const { generate } = require('../../config/gemini');
const { searchKnowledge } = require('../../vector-db/searchKnowledge');
const { recruiterChat } = require('../../utils/promptTemplates');
const Message = require('../../models/Message');
const Project = require('../../models/Project');

async function chat({ sessionId, question }) {
  // Fetch matching knowledge base documents
  const docs = await searchKnowledge(question, 5);

  // Fetch all projects from database
  const projects = await Project.find().lean();

  // Build project context
  const projectContext = projects
    .map(
      (p) => `
Project: ${p.title}

Description:
${p.description || ''}

Tech Stack:
${Array.isArray(p.techStack)
          ? p.techStack.join(', ')
          : p.techStack || ''}
`
    )
    .join('\n\n');

  // Build knowledge base context
  const knowledgeContext = docs
    .map(
      (d, i) =>
        `[${i + 1}] (${d.source}/${d.title})
${d.content}`
    )
    .join('\n\n');

  // Combine both contexts
  const context = `
PROJECTS

${projectContext}

KNOWLEDGE BASE

${knowledgeContext}
`;

  // Fetch conversation history
  const history = (
    await Message.find({ sessionId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
  )
    .reverse()
    .map(
      (m) => `${m.role.toUpperCase()}: ${m.content}`
    )
    .join('\n');

  // Generate prompt
  const prompt = recruiterChat(
    context,
    history,
    question
  );

  const answer = await generate(prompt);

  const sources = [
    ...docs.map((d) => `${d.source}/${d.title}`),
    ...projects.map((p) => `project/${p.title}`),
  ];

  // Save chat history
  await Message.create({
    sessionId,
    role: 'user',
    content: question,
  });

  await Message.create({
    sessionId,
    role: 'assistant',
    content: answer,
    sources,
  });

  return {
    answer,
    sources,
  };
}

module.exports = { chat };