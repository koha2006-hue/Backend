const mongoose = require('mongoose');

// Define LinkQR model
const linkQRSchema = new mongoose.Schema({
    content: String,
    account: String,
    QRcode: String,
    Link: String,
    generatedAt:{ type: Date, default: Date.now },
    type: { type: String, default: "link" }
});

const LinkQR = mongoose.model('LinkQR', linkQRSchema);

module.exports = LinkQR;
