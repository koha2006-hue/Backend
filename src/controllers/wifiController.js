const qr = require('qrcode');
const mongoose = require('mongoose');
const WifiQR = require('../models/wifiQR');  // Adjust the model name if needed
const Session = require('../models/Session');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../controllers/authenticationController');

// Define WiFi QR controller methods
const showWifiQRGeneration = (req, res) => {
    res.render('qr_wifi');
};

const generateWifiQR = async (req, res) => {
    try {
        // Access the token from the session or Session schema
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

        
                const { name, encryption, password } = req.body;

                const wifiQRData = new WifiQR({
                    name,
                    encryption,
                    password,
                    account: currentAccount,
                });


                // Generate QR code for WiFi
                const wifiData = `Encryption: ${encryption}\nName: ${name}\nPassword: ${password}`;
                const qrCodeDataUrl = await qr.toDataURL(wifiData);
                wifiQRData.QRcode = qrCodeDataUrl;
                wifiQRData.name = name;
                wifiQRData.encryption = encryption;
                wifiQRData.password = password;
                await wifiQRData.save();

                // Send the QR code image URL to the client
                res.json({ qrImageUrl: qrCodeDataUrl });
            

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const scanWifiQR = async (req, res) => {
    try {
        const wifiQRData = await WifiQR.findById(req.params.id);

        if (!wifiQRData) {
            return res.status(404).send('WiFi QR Data not found');
        }

        res.render('scan_wifi', { wifiQRData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const editWifi = async (req, res) => {
    try {
        const wifiQRData = await WifiQR.findById(req.params.id);

        if (!wifiQRData) {
            return res.status(404).send('WiFi QR Data not found');
        }

        res.json(wifiQRData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const saveWifiChanges = async (req, res) => {
    try {
        const wifiQRData = await WifiQR.findById(req.params.id);

        if (!wifiQRData) {
            return res.status(404).send('WiFi QR Data not found');
        }

        // Update WiFi data based on form submission
        wifiQRData.name = req.body.SSID;
        wifiQRData.encryption = req.body.securityType;
        wifiQRData.password = req.body.password;

        // Update QR code
        const wifiData = `WIFI:T:${wifiQRData.name};S:${wifiQRData.encryption};P:${wifiQRData.password};;`;
        const qrCodeDataUrl = await qr.toDataURL(wifiData);
        wifiQRData.QRcode = qrCodeDataUrl;

        // Save the changes
        await wifiQRData.save();

        // Redirect back to the QR code list
        res.redirect('/qrList/list');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    showWifiQRGeneration,
    generateWifiQR,
    scanWifiQR,
    editWifi,
    saveWifiChanges,
};
