const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    _id: String,
    sessionToken: String,
    userId: String,
    expires: Date,
    jwtToken: String || null,
});

const Session = mongoose.model('Session', sessionSchema, 'Session');

module.exports = Session;
