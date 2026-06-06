const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    longDescription: {
      type: String,
      default: '',
    },

    technologies: [
      {
        type: String,
        index: true,
      },
    ],

    githubUrl: {
      type: String,
      default: '',
    },

    liveUrl: {
      type: String,
      default: '',
    },

    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    metrics: {
      users: {
        type: Number,
        default: 0,
      },

      stars: {
        type: Number,
        default: 0,
      },

      performance: String,
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    category: {
      type: String,
      default: 'web',
      enum: [
        'web',
        'ai',
        'frontend',
        'backend',
        'fullstack',
        'mobile',
        'other',
      ],
    },

    // For chatbot project recommendations
    chatbotKeywords: {
      type: [String],
      default: [],
    },

    // Short recruiter-friendly summary
    elevatorPitch: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  next();
});

module.exports = mongoose.model('Project', projectSchema);