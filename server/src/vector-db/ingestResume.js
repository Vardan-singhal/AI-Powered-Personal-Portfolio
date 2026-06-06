const fs = require('fs');
const pdf = require('pdf-parse');
const KnowledgeBase = require('../models/KnowledgeBase');
const { chunkText } = require('./chunk');

async function ingestResume(filePath) {
  const buf = fs.readFileSync(filePath);
  const data = await pdf(buf);

  const chunks = chunkText(data.text, 800, 100);

  await KnowledgeBase.deleteMany({ source: 'resume' });

  for (let i = 0; i < chunks.length; i++) {
    await KnowledgeBase.create({
      source: 'resume',
      title: 'Resume',
      content: chunks[i],
      chunkIndex: i,
    });
  }

  return chunks.length;
}

module.exports = { ingestResume };