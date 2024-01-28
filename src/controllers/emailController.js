const qr = require('qrcode');
const mongoose = require('mongoose');
const EmailQR = require('../models/emailQR');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const users = require('../models/users');
const { authenticateUser } = require('../controllers/authenticationController');

const generateEmailQR = async (req, res) => {
  try {
    var currentAccount;
        const user = await users.findOne({ email: req.body.emailUser });
        
        if (!user) {
            currentAccount = "none";
        }
        else {
        currentAccount = user.email;
        
        }

        const { email, subject, content } = req.body;

        // Save the form data to the MongoDB database
        const emailQRData = new EmailQR({
          email,
          subject,
          content,
          account: currentAccount,
        });

        // Generate QR code for email
        const qrCodeDataUrl = await qr.toDataURL(JSON.stringify({ email, subject, content }));
        emailQRData.QRcode = qrCodeDataUrl;

        // Save the email QR data to the database
        await emailQRData.save();

        // Send email with QR code
        const emailSubject = emailQRData.subject;
        const emailContent = emailQRData.content;
        sendEmail(email, emailSubject, emailContent);

        res.json({ qrImageUrl: qrCodeDataUrl });
      
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sendEmail = async (toEmail, subject, content) => {
  try {
    // Configure nodemailer with your email service details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'khoadh.bi12-215@st.usth.edu.vn', // Your Gmail email address
        pass: '', // Your Gmail password or an application-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: 'khoadh.bi12-215@st.usth.edu.vn',
      to: toEmail,
      subject: subject,
      text: content,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  generateEmailQR,
};
