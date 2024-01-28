const mongoose = require('mongoose');

// Define EmailQR model
const emailQRSchema = new mongoose.Schema({
    email : String,
    subject: String,
    content: String,
    account: String,
    QRcode: String,
    Link: String,
    generatedAt:{ type: Date, default: Date.now },
    type: { type: String, default: "email" }
});

const EmailQR = mongoose.model('EmailQR', emailQRSchema);

module.exports = EmailQR;
