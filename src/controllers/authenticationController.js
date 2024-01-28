const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const Session = require('../models/Session');
const { application } = require('express');
const {Types} = require('mongoose');
const cookie = require('js-cookie');

require('dotenv').config();

// Define authentication controller methods
const login = (req, res) => {
    res.render('login');
};

const authenticateUser = async (req, res, next) => {
    try {
        // Get the token from the cookie    
        const token = req.cookies.token;
        console.log("token"+token);
        if (!token) {
            return res.status(401).send('Access Denied');
        }

        // Verify the token
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) {
            return res.status(401).send('Access Denied');
        }

        // Check if the session is valid
         const session = await Session.findOne({ jwtToken: token });
        if (!session || session.expires < Date.now()) {
            return res.status(401).send('Access Denied');
        }

        // Continue with the next middleware
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};


const performLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username is in the database
        const user = await Account.findOne({ username: username });
        if (!user) {
            return res.send('Username does not exist');
        }

        // Check if the password is correct
        if (await bcrypt.compare(password, user.password)) {
            // Create token data
            const tokenData = {
                id: user._id,
                username: user.username,
            };

            // Create a token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            // send token to cookie of client
            cookie.set('token', token, { httpOnly: true, credentials: true, sameSite: 'none' });
            
     
          
           
            
            // Save the token to the session
            const session = new Session({
                _id: new Types.ObjectId(),
                sessionToken: 'some-session-token', // generate or extract from Google API
                userId: user._id,
                expires: new Date(Date.now() + 3600000), // 1 hour expiration
                jwtToken: token, // Store the JWT token
            });
            

            //delete old session
            await Session.deleteMany({});
            await session.save();

            
            //Redirect to /qr_generate
            // res.redirect(`/qr/qr_generate/${session._id}`);
            //send sessionID to client
            //get token from cookie
            console.log("token"+token);
            res.send(token);
            

        } else {
            return res.send('Wrong password');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

const logout = async(req, res) => {
    // Delete the token from the session
    await Session.deleteMany({});
    // Delete the token from the cookie
    res.clearCookie('token');
    res.redirect('/');
    
};

module.exports = {
    login,
    performLogin,
    logout,
    authenticateUser,
    
    
};
