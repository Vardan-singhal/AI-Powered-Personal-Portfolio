const { generateJSON } = require('../../config/gemini');
const { projectExplainer } = require('../../utils/promptTemplates');
async function explainProject(project) {
  return generateJSON(projectExplainer(project));
}
module.exports = { explainProject };
