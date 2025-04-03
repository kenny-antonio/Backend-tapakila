const express = require('express');
const pool = require('../models/dbConfig'); // Connexion PostgreSQL
const upload = require('../middlewares/multerConfig'); // Middleware Multer

const router = express.Router();

// Route pour uploader une image et enregistrer l’URL en base
router.post('/upload/:eventId', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Aucune image envoyée' });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // URL de l'image
    const eventId = req.params.eventId;

    try {
        await pool.query(
            'UPDATE events SET image_url = $1 WHERE id = $2',
            [imageUrl, eventId]
        );
        res.json({ message: 'Image enregistrée avec succès', imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
