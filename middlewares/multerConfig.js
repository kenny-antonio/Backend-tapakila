const multer = require('multer');
const path = require('path');

//  Configuration du stockage
const storage = multer.diskStorage({
    destination: 'uploads/', //  Dossier où stocker les images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom unique
    }
});

const upload = multer({ storage });

module.exports = upload;
