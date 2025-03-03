const express = require('express');
const Alimentation = require('../models/BabyData/alimentation');
const Elimination = require('../models/BabyData/elimination')
const Care = require('../models/BabyData/care')
const Temperature = require('../models/BabyData/temperature')
const Weight = require('../models/BabyData/weight');
const Baby = require('../models/baby');

const router = express.Router();


// ROUTE POST BABYDATA

// Route pour ajouter une alimentation à un bébé
router.post('/:id/alimentation', (req, res) => {
        const { id } = req.params;
        const { date, feedingBottle, breastFeeding } = req.body;

        // Vérifier si le bébé existe
        Baby.findById(id)
        .then(baby => {
            if (!baby) {
                return res.status(404).json({ message: "Bébé non trouvé" });
            }
    
            // Création de l'alimentation
            const newAlimentation = new Alimentation({
                date,
                feedingBottle,
                breastFeeding
            });

            // Sauvegarde en base de données avec affichage du message et de la data
            return newAlimentation.save()
                .then(alimentation => {
                    // Associer l’alimentation au bébé
                    baby.alimentation_id.push(alimentation._id);
                    return baby.save(); // Sauvegarde du bébé avec l’alimentation liée
                })
            .then(() => {
                res.status(200).json({ message: "Alimentation enregistrée", data: newAlimentation });
            });
        })
});

// Route pour ajouter une elimination à un bébé
router.post('/:id/elimination', (req, res) => {
    const { id } = req.params;
    const { date, urine, gambling } = req.body;

    // Vérifier si le bébé existe
    Baby.findById(id)
    .then(baby => {
        if (!baby) {
            return res.status(404).json({ message: "Bébé non trouvé" });
        }

        // Création de l'elimination
        const newElimination = new Elimination({
            date,
            urine,
            gambling
        });

        // Sauvegarde en base de données avec affichage du message et de la data
        return newElimination.save()
        .then(elimination => {
            baby.elimination_id.push(elimination._id);
                    return baby.save(); // Sauvegarde du bébé avec l’elimination liée
                })
        .then(() => {
            res.status(200).json({ message: "Elimination enregistrée", data: newElimination });
        })
    })
});

// Route pour ajouter un soins à un bébé
router.post('/:id/care', (req, res) => {
    const { id } = req.params;
    const { date, cordCare, faceCare, bath } = req.body;

    // Vérifier si le bébé existe
    Baby.findById(id)
    .then(baby => {
        if (!baby) {
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
        return newCare.save()
        .then(care => {
            baby.care_id.push(care._id);
                    return baby.save(); // Sauvegarde du bébé avec le soin liée
                })
        .then(() => {
            res.status(200).json({ message: "Elimination enregistrée", data: newCare });
        })
    })
});

// Route pour ajouter une temperature à un bébé
router.post('/:id/temperature', (req, res) => {
    const { id } = req.params;
    const { date, temperature } = req.body;

    // Vérifier si le bébé existe 
    Baby.findById(id)
    .then(baby => {
        if (!baby) {
            return res.status(404).json({ message: "Bébé non trouvé" });
        }

        // Création du soin
        const newTemperature = new Temperature({
            date,
            temperature,
        });

        // Sauvegarde en base de données avec affichage du message et de la data
        return newTemperature.save()
            .then(temperature => {
                baby.temperature_id.push(temperature._id);
                    return baby.save(); // Sauvegarde du bébé avec le soin lié
            })
            .then(() => {
                res.status(200).json({ message: "temperature enregistrée", data: newTemperature });
            })
    })
});

// Route pour ajouter un poids à un bébé
router.post('/:id/weight', (req, res) => {
    const { id } = req.params;
    const { date, weight } = req.body;

    // Vérifier si le bébé existe
    Baby.findById(id)
    .then(baby => {
        if (!baby) {
            return res.status(404).json({ message: "Bébé non trouvé" });
        }

        // Création du nouveau poids
        const newWeight = new Weight({
            date,
            weight,
        });

        // Sauvegarde en base de données avec affichage du message et de la data
        return newWeight.save()
            .then(weight => {
                baby.weight_id.push(weight._id)
                    return baby.save() // Sauvegarde du bébé avec le poids lié
            })
        .then(() => {
            res.status(200).json({ message: "poids enregistrée", data: newWeight });
        })
    })
});


// ROUTE GET BABYDATA

// Route pour afficher les alimentation d'un baby
router.get('/:id/alimentation', (req, res) => {
    const { id } = req.params;

    //On verifie si le bébé existe dans la base de données
    Baby.findById(id).populate('alimentation_id')
    .then(data => {
        if (!data) {
            return res.status(404).json({ result: false, message: "Bébé non trouvé" });
        }
    res.json({result: true, data: data.alimentation_id})
    })
})

// Route pour afficher les elimination d'un baby
router.get('/:id/elimination', (req, res) => {
    const { id } = req.params;

    //On verifie si le bébé existe dans la base de données
    Baby.findById(id).populate('elimination_id')
    .then(data => {
        if (!data) {
            return res.status(404).json({ result: false, message: "Bébé non trouvé" });
        }
    res.json({result: true, data: data.elimination_id})
    })
})

// Route pour afficher les soins d'un baby
router.get('/:id/care', (req, res) => {
    const { id } = req.params;

    //On verifie si le bébé existe dans la base de données
    Baby.findById(id).populate('care_id')
    .then(data => {
        if (!data) {
            return res.status(404).json({ result: false, message: "Bébé non trouvé" });
        }
    res.json({result: true, data: data.care_id})
    })
})

// Route pour afficher les temperature d'un baby
router.get('/:id/temperature', (req, res) => {
    const { id } = req.params;

    //On verifie si le bébé existe dans la base de données
    Baby.findById(id).populate('temperature_id')
    .then(data => {
        if (!data) {
            return res.status(404).json({ result: false, message: "Bébé non trouvé" });
        }
    res.json({result: true, data: data.temperature_id})
    })
})

// Route pour afficher les temperature d'un baby
router.get('/:id/weigth', (req, res) => {
    const { id } = req.params;

    //On verifie si le bébé existe dans la base de données
    Baby.findById(id).populate('weight_id')
    .then(data => {
        if (!data) {
            return res.status(404).json({ result: false, message: "Bébé non trouvé" });
        }
    res.json({result: true, data: data.weight_id})
    })
})

module.exports = router;
