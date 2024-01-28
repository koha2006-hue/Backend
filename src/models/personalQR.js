const mongoose = require('mongoose');

// Define PersonalQR model
const personalQRSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    website: String,
    company: String,
    position: String,
    account: String,
    QRcode: String,
    Link: String,
    generatedAt: { type: Date, default: Date.now },
    type: { type: String, default: "personal" },
});

const PersonalQR = mongoose.model('PersonalQR', personalQRSchema);

module.exports = PersonalQR;
