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
    throw new Error('All fields are required');
  }

  // Save message to MongoDB
  const contact = await Contact.create({
    name,
    email,
    message,
  });

  // Try sending email notification
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div style="padding:10px;border-left:4px solid #2563eb;background:#f8fafc;">
            ${message}
          </div>
        </div>
      `,
    });

    console.log('✅ Contact email sent');
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);

    // Do NOT fail the request if email fails.
    // Message is already saved in MongoDB.
  }

  res.status(201).json({
    success: true,
    message: 'Message submitted successfully',
    contact,
  });
});

exports.list = asyncHandler(async (_req, res) => {
  const contacts = await Contact.find().sort({
    createdAt: -1,
  });

  res.status(200).json(contacts);
});