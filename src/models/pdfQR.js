const mongoose = require('mongoose');

//define pdfQR model
const pdfQRSchema = new mongoose.Schema({
    content: String,
    account: String,
    QRcode: String,
    generatedAt:{ type: Date, default: Date.now },
    type: { type: String, default: "pdf" }
});