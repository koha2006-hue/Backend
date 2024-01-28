"use strict";

var mongoose = require('mongoose');

// Define LinkQR model
var linkQRSchema = new mongoose.Schema({
  link: String
});
var LinkQR = mongoose.model('LinkQR', linkQRSchema);
module.exports = LinkQR;