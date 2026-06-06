const fs = require('fs');
const path = require('path');
const KnowledgeBase = require('../models/KnowledgeBase');
const { embed } = require('../config/gemini');
const { chunkText } = require('./chunk');

async function ingestMarkdownDir(source, dir) {
  if (!fs.existsSync(dir)) return 0;
  await KnowledgeBase.deleteMany({ source });
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  let count = 0;
  for (const file of files) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    const chunks = chunkText(text, 800, 100);
    for (let i = 0; i < chunks.length; i++) {
      await KnowledgeBase.create({
  source,
  title: file.replace('.md', ''),
  content: chunks[i],
  chunkIndex: i,
  metadata: { file },
});
      count++;
    }
  }
  return count;
}
module.exports = { ingestMarkdownDir };
