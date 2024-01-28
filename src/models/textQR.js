const mongoose = require('mongoose');

// Define TextQR model
const textQRSchema = new mongoose.Schema({
    content: String,
    account: String,
    QRcode: String,
    Link: String,
    generatedAt:{ type: Date, default: Date.now },
    type: { type: String, default: "text" }
});

const TextQR = mongoose.model('TextQR', textQRSchema);

module.exports = TextQR;
