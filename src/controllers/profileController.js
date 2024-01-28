const myProfile = require('../models/myProfile');
const linkQR = require('../models/linkQR');
const textQR = require('../models/textQR');
const users = require('../models/users');
const personalQR = require('../models/personalQR');
const editProfile = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        
        const user = await users.findOne({ email: req.body.emailUser });
        const data = await myProfile.findOne({ account: user.email });
        //send the data to client side
        res.json(data);
        // res.render('profile', { name: data.name, email: data.email, phone: data.phone, address: data.address, website: data.website, company: data.company, position: data.position});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const saveProfileChanges = async (req, res) => {

    try {
        const user = await users.findOne({ email: req.body.emailUser });
        const data = await myProfile.findOne({ account: user.email });
        // data not exist, create new data
        if (!data) {
            const profile = new myProfile({
                account: user.email,
                firstName: req.body.Data.firstName,
                lastName: req.body.Data.lastName,
                email: req.body.Data.email,
                phone: req.body.Data.phoneNumber,
                dob: req.body.Data.dob,

            });
            await profile.save();
            return res.status(200).send('Profile saved');
        }

        console.log(req.body.Data.firstName);
        // Update personal data based on form submission
        data.firstName = req.body.Data.firstName;
        data.lastName = req.body.Data.lastName;
        data.email = req.body.Data.email;
        data.phone = req.body.Data.phoneNumber;
        data.dob = req.body.Data.dob;
        
        // Save the changes
        await data.save();

    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

//back to list
const backToList = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        const user = await users.findOne({ email: req.body.email });
        const data = await myProfile.findOne({ account: user.email });

        if (!data) {
            return res.status(404).send('QR Code not found');
        }

        res.render('qrList', { data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
const showProfile = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        const user = await users.findOne({ email: req.body.emailUser });
        const data = await myProfile.findOne({ account: user.email });

        // data not exist, create new data
        if (!data) {
            const profile = new myProfile({
                account: user.email,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phoneNumber,
                address: req.body.address,
                website: req.body.website,
                company: req.body.company,
                position: req.body.position,
            });
            await profile.save();
            return res.status(200).send('Profile saved');
        }


        // Send the data to the client side
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
const deleteQRCode = async (req, res) => {
    try {
        const dataPersonal = await personalQR.findById(req.params.id);
        const dataLink = await linkQR.findById(req.params.id);
        const dataText = await textQR.findById(req.params.id);
        if (!dataPersonal && !dataLink && !dataText) {
            return res.status(404).send('QR Code not found');
        }
        if (dataPersonal) {
            await dataPersonal.deleteOne();
        }
        if (dataLink) {
            await dataLink.deleteOne();
        }
        if (dataText) {
            await dataText.deleteOne();
        }
        


        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    editProfile,
    saveProfileChanges,
    backToList,
    deleteQRCode,
    showProfile,
};
