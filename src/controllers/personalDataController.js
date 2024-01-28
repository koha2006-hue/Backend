require('dotenv').config();
const personalDataQR = require('../models/personalDataQR');
const qr = require('qrcode');
const mongoose = require('mongoose');
const users = require('../models/users');

const scanPersonalDataQR = async (req, res) => {
    try {
        const { id } = req.params;
        const personalDataQRData = await personalDataQR.findById(id);
        if (!personalDataQRData) {
            return res.status(404).json({ error: 'Personal Data QR not found' });
        }
        res.render('personalData', { properties: personalDataQRData.properties });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const GeneratePersonalDataQR = async (req, res) => {
    try {
        var currentAccount;
        // Get the token from the cookie
        const user = await users.findOne({ email: req.body.email });
        
        if (!user) {
            currentAccount = "none";
        }
        else {
        currentAccount = user.email;
        console.log("currentAccount"+currentAccount);
        }
            // Get the form data

            const {properties} = req.body;
            console.log(req.body);
            // Save the form data to the MongoDB database
            const personalDataQRData = new personalDataQR({
                properties
                
            });
            personalDataQRData.account = currentAccount;
            const profileUrl = `http://localhost:5000/personalDataQR/profile/${personalDataQRData._id}`;
            const qrCodeDataUrl = await qr.toDataURL(profileUrl);
            personalDataQRData.QRcode = qrCodeDataUrl;
            personalDataQRData.Link = profileUrl;
            await personalDataQRData.save();
            console.log("personalDataQRData"+personalDataQRData);
            // Send the QR code image URL to the client
            res.json({ qrImageUrl: qrCodeDataUrl });
        
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

}

const showPersonalDataQRGeneration = (req, res) => {

    res.render('personal_data_qr_code');

};

const showProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const personalDataQRData = await personalDataQR.findById(id);
        if (!personalDataQRData) {
            return res.status(404).json({ error: 'Personal Data QR not found' });
        }
        res.render('personalData', { properties: personalDataQRData.properties });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    GeneratePersonalDataQR,
    showPersonalDataQRGeneration,
    scanPersonalDataQR,
    showProfile


}


