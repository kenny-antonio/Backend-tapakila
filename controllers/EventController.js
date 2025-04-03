// controllers/EventController.js
const pool = require('../models/dbConfig'); // Connexion PostgreSQL
const upload = require('../middlewares/multerConfig'); 

const postEvent = async (req, res) => {
    try {
        const { title, description, location, date, time, organizer_id, standard_price, standard_quantity, vip_price, vip_quantity, early_bird_price, early_bird_quantity, category, type } = req.body;
        
        // Vérifier si un fichier image a été uploadé
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const query = `
            INSERT INTO events (title, description, location, date, time, organizer_id, standard_price, standard_quantity, vip_price, vip_quantity, early_bird_price, early_bird_quantity, category, type, image_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *;
        `;

        const values = [title, description, location, date, time, organizer_id, standard_price, standard_quantity, vip_price, vip_quantity, early_bird_price, early_bird_quantity, category, type, imageUrl];

        const result = await pool.query(query, values);

        res.status(201).json({ message: "Événement créé avec succès", event: result.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la création de l'événement" });
    }
};



// Fonction pour obtenir tous les événements
const getEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, title, location, event_date, organizer_id, image_url, category, type FROM events ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des événements' });
    }
};

// Fonction pour obtenir un événement spécifique
const getOneEvent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query('SELECT id, title, location, event_date, organizer_id, image_url, category, type FROM events WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'événement' });
    }
};

// Fonction pour mettre à jour un événement
const updateEvent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, location, event_date, organizer_id, category, type } = req.body;

        // Si une image est envoyée, on la gère
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;  // Nouvel URL pour l'image
        }

        // Mettre à jour les autres informations
        const result = await pool.query(
            'UPDATE events SET title=$1, location=$2, event_date=$3, organizer_id=$4, image_url=$5, category=$6, type=$7 WHERE id=$8',
            [title, location, event_date, organizer_id, imageUrl || null, category, type, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        res.status(200).json({ message: `Event updated with ID: ${id}` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'événement' });
    }
};


// Fonction pour supprimer un événement
const deleteEvent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query('DELETE FROM events WHERE id=$1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.status(200).json({ message: 'Événement supprimé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'événement' });
    }
};

module.exports = {
    postEvent,
    getEvents,
    getOneEvent,
    updateEvent,
    deleteEvent
};
