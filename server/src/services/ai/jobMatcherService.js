const fs = require('fs');
const pdf = require('pdf-parse');
const { generateJSON } = require('../../config/gemini');
const { jobMatch } = require('../../utils/promptTemplates');

async function matchJob({ filePath, resumeText, jobDescription }) {
  let text = resumeText;
  if (!text && filePath) {
    const data = await pdf(fs.readFileSync(filePath));
    text = data.text;
  }
  const result = await generateJSON(jobMatch(text.slice(0, 12000), jobDescription));
  return { result, resumeText: text };
}
module.exports = { matchJob };
