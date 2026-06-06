const fs = require('fs');
const pdf = require('pdf-parse');
const { generateJSON } = require('../../config/gemini');
const { resumeReview } = require('../../utils/promptTemplates');

async function reviewResume(filePath) {
  const buf = fs.readFileSync(filePath);
  const data = await pdf(buf);
  const result = await generateJSON(resumeReview(data.text.slice(0, 12000)));
  return { result, text: data.text };
}
module.exports = { reviewResume };
