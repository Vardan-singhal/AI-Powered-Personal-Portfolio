const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.create = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('All fields required');
  }

  // Save to MongoDB
  const contact = await Contact.create({
    name,
    email,
    message,
  });

  // Send Email Notification
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Message:</strong></p>

      <p>${message}</p>
    `,
  });

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    contact,
  });
});

exports.list = asyncHandler(async (_req, res) => {
  const contacts = await Contact.find().sort({
    createdAt: -1,
  });

  res.json(contacts);
});