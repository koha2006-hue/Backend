const mongoose = require('mongoose');

// Define Account model
const accountSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: String,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
