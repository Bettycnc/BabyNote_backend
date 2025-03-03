const express = require('express');
const router = express.Router();
const Baby = require('../models/baby')

// Route pour ajouter un baby dans la base de données

router.post('/', (req, res) => {
    const {name, birthday, birthWeight } = req.body
    console.log("Données reçues :", req.body);
    if (!name || !birthday || !birthWeight) {
        return res.status(400).json({ result: false, message: 'Tous les champs sont requis.' });
    }
    const newBaby = new Baby ({
        name,
        birthday,
        birthWeight
    })

    newBaby.save()
    .then(baby => {
        res.json({result: true, baby})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Baby.findById(id)
    .then(data => {
        res.json({result: true, data})
    })
})

module.exports = router;