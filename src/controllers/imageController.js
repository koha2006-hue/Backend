// Define image controller methods
const showImageUpload = (req, res) => {
    res.render('qr_image');
};

const uploadImage = async (req, res) => {
    // Your image upload logic here
};

module.exports = {
    showImageUpload,
    uploadImage,
};
