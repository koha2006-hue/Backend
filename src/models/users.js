// id: String;
//   role?: ('admin' | 'user') | null;
//   updatedAt: String;
//   createdAt: String;
//   email: String;
//   resetPasswordToken?: String | null;
//   resetPasswordExpiration?: String | null;
//   salt?: String | null;
//   hash?: String | null;
//   loginAttempts?: number | null;
//   lockUntil?: String | null;
//   password: String | null;

const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    role: { type: String, enum: ['admin', 'user'], default: null },
    updatedAt: String,
    createdAt: String,
    email: String,
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpiration: { type: String, default: null },
    salt: { type: String, default: null },
    hash: { type: String, default: null },
    loginAttempts: { type: Number, default: null },
    lockUntil: { type: String, default: null },
    password: { type: String, default: null },
});

const Users = mongoose.model('users', usersSchema, 'users');

module.exports = Users;


