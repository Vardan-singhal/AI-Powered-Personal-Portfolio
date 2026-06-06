const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, index: true },
    title: String,
    content: { type: String, required: true },
    chunkIndex: { type: Number, default: 0 },
    embedding: { type: [Number], default: [] },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

knowledgeBaseSchema.index({
  title: 'text',
  content: 'text',
  source: 'text',
});

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);
