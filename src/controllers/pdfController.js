require ('dotenv').config();
const pdfQR = require('../models/pdfQR');
const qr = require('qrcode');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');
const {authenticateUser} = require('../controllers/authenticationController');
// Define PDF QR controller methods
const showPDFQRGeneration = (req, res) => {
    res.render('qr_pdf');
};

const generatePDFQR = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await authenticateUser(email, password);
        const session = await Session.findOne({user: user._id});
        const token = jwt.sign({user: user._id, session: session._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const qrCode = await qr.toDataURL(token);
        const pdf = await pdfQR.generatePDFQR(qrCode);
        res.contentType('application/pdf');
        res.send(pdf);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
        