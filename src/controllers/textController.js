const qr = require('qrcode');
const mongoose = require('mongoose');
const TextQR = require('../models/textQR');
const Session = require('../models/Session');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const {authenticateUser} = require('../controllers/authenticationController');
// Define Text QR controller methods
const showTextQRGeneration = (req, res) => {
    res.render('qr_text');
};
const generateTextQR = async (req, res) => {
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
            
        const  text  = req.body.qrText;
        console.log(req.body);
        console.log(text);
        
        // Save the form data to the MongoDB database
        const textQRData = new TextQR({
            content: text,
            account: currentAccount,
        });

        

        // Generate QR code for text
        const qrCodeDataUrl = await qr.toDataURL(text);
        textQRData.QRcode = qrCodeDataUrl;
        // res.render('qr_text', { qrCodeDataUrl: qrCodeDataUrl});
        // textQRData.QRcode = qrCodeDataUrl;
        textQRData.Link = text;
        await textQRData.save();
        // Send the QR code image URL to the client
        res.json({ qrImageUrl: qrCodeDataUrl });
}



     catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   

const editText = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        
        const qrCodeData = await TextQR.findById(req.params.id);
        
        if (!qrCodeData) {
            return res.status(404).send('QR Code not found');
        }
        //send the data to client side
        res.json(qrCodeData);
        // res.render('profile', { name: qrCode.name, email: qrCode.email, phone: qrCode.phone, address: qrCode.address, website: qrCode.website, company: qrCode.company, position: qrCode.position});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const saveTextChanges = async (req, res) => {

    try {
        const qrCode = await TextQR.findById(req.params.id);

        if (!qrCode) {
            return res.status(404).send('QR Code not found');
        }

        // Update personal data based on form submission
        qrCode.content = req.body.text;

        // update QR code
        const qrCodeDataUrl = await qr.toDataURL(req.body.text);
        qrCode.QRcode = qrCodeDataUrl;
        // Save the changes
        await qrCode.save();

    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    showTextQRGeneration,
    generateTextQR,
    editText,
    saveTextChanges,
};


