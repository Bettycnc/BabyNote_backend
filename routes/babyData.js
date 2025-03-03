const express = require('express');
const Alimentation = require('../models/BabyData/alimentation');
const Elimination = require('../models/BabyData/elimination')
const Baby = require('../models/Baby');
const router = express.Router();

// Route pour ajouter une alimentation à un bébé
router.post('/baby/:id/alimentation', (req, res) => {
        const { id } = req.params;
        const { date, feedingBottle, breastFeeding } = req.body;

        // Vérifier si le bébé existe (On va attendre que Kevin fasse le Baby modèle)
        Baby.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Bébé non trouvé" });
            }
    
            // Création de l'alimentation
            const newAlimentation = new Alimentation({
                date,
                feedingBottle,
                breastFeeding
            });
    
            // Sauvegarde en base de données avec affichage du message et de la data
            newAlimentation.save();
            res.status(201).json({ message: "Alimentation enregistrée", data: newAlimentation });
        })
});

// Route pour ajouter une elimination à un bébé
router.post('/baby/:id/elimination', (req, res) => {
    const { id } = req.params;
    const { date, urine, gambling } = req.body;

    // Vérifier si le bébé existe (On va attendre que Kevin fasse le Baby modèle)
    Baby.findById(id)
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: "Bébé non trouvé" });
        }

        // Création de l'elimination
        const newElimination = new Elimination({
            date,
            urine,
            gambling
        });

        // Sauvegarde en base de données avec affichage du message et de la data
        newElimination.save();
        res.status(201).json({ message: "Elimination enregistrée", data: newElimination });
    })
});

// Route pour ajouter un soins à un bébé
router.post('/baby/:id/care', (req, res) => {
    const { id } = req.params;
    const { date, cordCare, faceCare, bath } = req.body;

    // Vérifier si le bébé existe (On va attendre que Kevin fasse le Baby modèle)
    Baby.findById(id)
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: "Bébé non trouvé" });
        }

        // Création du soin
        const newCare = new Care({
            date,
            cordCare,
            faceCare,
            bath
        });

        // Sauvegarde en base de données avec affichage du message et de la data
        newElimination.save();
        res.status(201).json({ message: "soin enregistrée", data: newCare });
    })
});







module.exports = router;
