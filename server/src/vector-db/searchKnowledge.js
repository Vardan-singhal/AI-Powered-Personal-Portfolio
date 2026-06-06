const KnowledgeBase = require('../models/KnowledgeBase');

async function searchKnowledge(query, k = 5) {
  const docs = await KnowledgeBase.find(
    {
      $text: {
        $search: query,
      },
    },
    {
      score: {
        $meta: 'textScore',
      },
    }
  )
    .sort({
      score: {
        $meta: 'textScore',
      },
    })
    .limit(k)
    .lean();

  return docs;
}

module.exports = { searchKnowledge };