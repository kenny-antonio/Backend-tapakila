// middlewares/multerConfig.js
const multer = require('multer');
const path = require('path');

// Définir un stockage pour Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Définir le dossier de destination
    },
    filename: function (req, file, cb) {
        // Générer un nom de fichier unique avec la date actuelle et l'extension du fichier
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
