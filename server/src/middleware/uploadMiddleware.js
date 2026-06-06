const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const tempDir = path.join(__dirname, '..', 'uploads', 'temp');
const resumeDir = path.join(__dirname, '..', 'uploads', 'resumes');
[tempDir, resumeDir].forEach((d) => fs.mkdirSync(d, { recursive: true }));

const localResumeStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, resumeDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'ai-developer-hub/projects', resource_type: 'image' },
});

exports.uploadResume = multer({
  storage: localResumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF allowed'));
  },
});

exports.uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
