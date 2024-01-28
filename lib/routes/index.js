"use strict";

require('dotenv').config();
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var port = process.env.PORT;
var path = require('path');
app.use(cookieParser());

// Set view engine
require('../configs/viewEngine')(app);
// Import routes
var authenticationRoutes = require('./authentication');
var userRoutes = require('./user');
var qrRoutes = require('./qr');
var imageRoutes = require('./image');

// Use routes
app.use('/', authenticationRoutes);
app.use('/user', userRoutes);
app.use('/qr', qrRoutes);
app.use('/image', imageRoutes);
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});