"use strict";

var mongoose = require('mongoose');

// Define Account model
var accountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var Account = mongoose.model('Account', accountSchema);
module.exports = Account;