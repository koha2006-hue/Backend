require('dotenv').config();
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const configViewEngine = require('../configs/viewEngine'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));




// Set view engine
configViewEngine(app);
// Import routes
const authenticationRoutes = require('./authentication');
const userRoutes = require('./user');
const qrRoutes = require('./qr');
const imageRoutes = require('./image');
const personalQRRoutes = require('./personalQR');
const linkRoutes = require('./link');
const qrListRoutes = require('./qrList');
const textRoutes = require('./text');
const profileRoutes = require('./profile');
const emailRoutes = require('./email');
const wifiRoutes = require('./wifi');
const personalDataRoutes = require('./personalDataQR');
const mongoose = require('../db');
// Use routes
app.use('/', authenticationRoutes);
app.use('/user', userRoutes);
app.use('/qr', qrRoutes);
app.use('/image', imageRoutes);
app.use('/personalQR', personalQRRoutes);
app.use('/link', linkRoutes);
app.use('/qrList', qrListRoutes);
app.use('/text', textRoutes);
app.use('/email', emailRoutes);
app.use('/wifi', wifiRoutes);
app.use('/profile', profileRoutes);
app.use('/personalDataQR', personalDataRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
