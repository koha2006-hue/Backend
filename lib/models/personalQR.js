"use strict";

var mongoose = require('mongoose');

// Define PersonalQR model
var personalQRSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  website: String,
  company: String,
  position: String,
  account: String
});
var PersonalQR = mongoose.model('PersonalQR', personalQRSchema);
module.exports = PersonalQR;