const personalQR = require('../models/personalQR');
const Session = require('../models/Session');
// Controller method to render the qr_generate page
const showQRGeneration = async(req, res) => {
    const tokenID = req.params.id;
    res.render('qr_generate', { id: tokenID });
};

// Controller method to handle form submission and generate QR code
const generateQR = async (req, res) => {
    try {
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
            account: currentAccount,
        });

        await personalQRData.save();

        // Redirect to the scan page with the ID of the saved document
        res.redirect(`/scan/${personalQRData._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    showQRGeneration,
    generateQR,
};
