const mongoose = require('mongoose');

// Define WifiQR model
const wifiQRSchema = new mongoose.Schema({
    name: String,
    encryption: String,
    pass : String,
    account: String,
    QRcode: String,
    Link: String,
    generatedAt:{ type: Date, default: Date.now },
    type: { type: String, default: "wifi" }
});

const WifiQR = mongoose.model('WifiQR', wifiQRSchema);

module.exports = WifiQR;
