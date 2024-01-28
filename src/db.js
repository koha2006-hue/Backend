// src/db.js
require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection URL
const dbUrl = process.env.MONGO;

// Connect to the database
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database successfully'))
    .catch((err) => console.log(err));

// Check connection
const db = mongoose.connection;
db.once('open', function () {
    console.log('Connected to MongoDB');
});
db.on('error', function (err) {
    console.log(err);
});

module.exports = mongoose;
