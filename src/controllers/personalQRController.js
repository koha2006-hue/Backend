require('dotenv').config();
const personalQR = require('../models/personalQR');
const Session = require('../models/Session');
const qr = require('qrcode');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const users = require('../models/users');
const jwt = require('jsonwebtoken');
// Define personal QR controller methods
const showPersonalQRGeneration = (req, res) => {

    res.render('personal_qr_code');

};

const generatePersonalQR = async (req, res) => {
    
    try {
        var currentAccount;
        // Get the token from the cookie
        const user = await users.findOne({ email: req.body.emailUser });
        console.log("user===",user);
        if (!user) {
            currentAccount = "none";
        }
        else {
        currentAccount = user.email;
    
        console.log("currentAccount",currentAccount);
        }
            // Get the form data
            
        const { name, email, phone, address, website, company, position } = req.body;

            // Save the form data to the MongoDB database
            const personalQRData = new personalQR({
                name,
                email,
                phone,
                address,
                website,
                company,
                position,
                
            });
            personalQRData.account = currentAccount;
            const profileUrl = `http://localhost:5000/personalQR/profile/${personalQRData._id}`;
            const qrCodeDataUrl = await qr.toDataURL(profileUrl);
            personalQRData.QRcode = qrCodeDataUrl;
            personalQRData.Link = profileUrl;
            await personalQRData.save();
            // Send the QR code image URL to the client
            res.json({ qrImageUrl: qrCodeDataUrl });

            // Redirect to the scan page with the ID of the saved document
            // res.redirect(`/personalQR/scan/${personalQRData._id}`);
            // res.render('personal_qr_code', { qrCodeDataUrl: qrCodeDataUrl });

             
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const editPersonalQR = async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const personalQRData = await personalQR.findById(req.params.id);

        if (!personalQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Update the data based on the form data received
        const { name, email, phone, address, website, company, position } = req.body;

        personalQRData.name = name;
        personalQRData.email = email;
        personalQRData.phone = phone;
        personalQRData.address = address;
        personalQRData.website = website;
        personalQRData.company = company;
        personalQRData.position = position;

        // Save the updated data to the MongoDB database
        await personalQRData.save();

        // Redirect to the profile page with the updated data
        res.redirect(`/personalQR/profile/${personalQRData._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const scanPersonalQR = async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const personalQRData = await personalQR.findById(req.params.id);

        if (!personalQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Construct the URL for the profile using the provided ID
        const profileUrl = `http://localhost:5000/personalQR/profile/${req.params.id}`;

        // Generate the QR code data for the profile URL
        const qrCodeDataUrl = await qr.toDataURL(profileUrl);

        // Render the scan page with the QR code data and document ID
        res.render('scan', { qrCodeDataUrl, id: req.params.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const showProfile = async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const personalQRData = await personalQR.findById(req.params.id);
        
        if (!personalQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Generate the QR code data
        const data = `name: ${personalQRData.name}
        email: ${personalQRData.email}
        phone: ${personalQRData.phone}
        address: ${personalQRData.address}
        website: ${personalQRData.website}
        company: ${personalQRData.company}
        position: ${personalQRData.position}`;

        res.render('profile', { name: personalQRData.name, email: personalQRData.email, phone: personalQRData.phone, address: personalQRData.address, website: personalQRData.website, company: personalQRData.company, position: personalQRData.position });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    showPersonalQRGeneration,
    generatePersonalQR,
    scanPersonalQR,
    showProfile,
    editPersonalQR,
};
