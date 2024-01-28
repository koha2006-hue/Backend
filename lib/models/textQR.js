"use strict";

var mongoose = require('mongoose');

// Define TextQR model
var textQRSchema = new mongoose.Schema({
  text: String
});
var TextQR = mongoose.model('TextQR', textQRSchema);
module.exports = TextQR;