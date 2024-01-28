const Account = require('../models/account');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const myProfile = require('../models/myProfile');

// Define user controller methods
const showRegistration = (req, res) => {
    // const token = req.session.token;
    res.render('register');
};

const checkEmail = async (req, res) => {
    try {
        const  email  = req.body;
        //check already in the database
        const mailAccount = await Account.findOne({ email: email });
        const mailUser = await User.findOne({ email: email });
        if (mailAccount || mailUser) {
            return res.send('Email already exists');
        }
        else {
            return res.send('success');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const performRegistration = async (req, res) => {

    try {
        const { username, password, email } = req.body;

        // Save the form data to the MongoDB database
        const account = new Account({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        });

        // Save the user data to the MongoDB database
        const user = new User({
            name: username,
            email: email,
            emailVerified: null,
            Image: null,
        });

        // Check already in the database
        const userAccount = await Account.findOne({ username: username });
        const userUser = await User.findOne({ name: username });
        const mailAccount = await Account.findOne({ email: email });
        const mailUser = await User.findOne({ email: email });
        if (userAccount || userUser) {
            return res.send('Username already exists');
        }
        else if (mailAccount || mailUser) {
            return res.send('Email already exists');
        }
        // else if (password !== password2) {
        //     return res.send('Password does not match');
        // }
        else{
        await account.save();
        console.log("Account created successfully");
        res.send ('success');
        
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// Profile page for general information
const SaveProfile = async (req, res) => {
    
    try {
        const { firstname, lastname, address, phone } = req.body;
        const account = await Account.findById(currentAccount);
        const profile = new myProfile({
            firstname,
            lastname,
            address,
            phone,
            account: currentAccount,
        });
        await profile.save();
        res.redirect('/myProfile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



const showProfile = async (req, res) => {
    const token = req.session.token;
    const jwtToken = session.token; // Assuming session is defined somewhere
    const session = await Session.findOne({ sessionToken: 'some-session-token' });

    if (!jwtToken) {
        return res.status(401).send('Access Denied');
    }

    try {
        // Verify the token
        const verified = await jwt.verify(jwtToken, process.env.TOKEN_SECRET);
        decoded = jwt.decode(jwtToken, { complete: true });
        const currentAccount = decoded.payload.id;

        if (currentAccount) {
            try {
                const account = await Account.findById(currentAccount);
                const profile = await myProfile.findOne({ account: currentAccount });

                if (profile) {
                    // Render the profile page with the profile data
                    res.render('profile', { profile });
                } else {
                    // Handle the case where no profile is found for the current user
                    res.status(404).send('Profile not found');
                }
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    showRegistration,
    performRegistration,
    SaveProfile,
    checkEmail,
    showProfile,
};
