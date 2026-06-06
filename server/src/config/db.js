const mongoose = require('mongoose');
const logger = require('../utils/logger');
const dns = require('dns');

dns.setServers(['8.8.8.8','8.8.4.4'])

module.exports = async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI not set');
    await mongoose.connect(uri);
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error: ' + err.message);
    process.exit(1);
  }
};
