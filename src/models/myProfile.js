const mongoose = require('mongoose');

// Define MyProfile model
const myProfileSchema = new mongoose.Schema({
    account: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dob: String,
});

const MyProfile = mongoose.model('MyProfile', myProfileSchema);
module.exports = MyProfile;