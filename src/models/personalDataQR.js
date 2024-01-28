const mongoose = require('mongoose');

// Define dynamic property schema
const dynamicPropertySchema = new mongoose.Schema({
    key: String,
    value: String,
});

// Define PersonalQR model
const personalDataQRSchema = new mongoose.Schema({
    properties: [dynamicPropertySchema],
    account: String,
    generatedAt: { type: Date, default: Date.now },
    type: { type: String, default: "personalData" },
    QRcode: String,
});
const personalDataQR = mongoose.model('personalDataQR', personalDataQRSchema);

module.exports = personalDataQR;