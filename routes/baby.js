const express = require("express");
const router = express.Router();
const Baby = require("../models/baby");
const User = require("../models/users");

// Route pour ajouter un baby dans la base de données

router.post("/", (req, res) => {
  const { name, birthday, birthWeight, user_id } = req.body;
  console.log("Données reçues :", req.body);
  if (!name || !birthday || !birthWeight) {
    return res
      .status(400)
      .json({ result: false, error: "Tous les champs sont requis." });
  }
  const newBaby = new Baby({
    name,
    birthday,
    birthWeight,
    user_id,
  });

  newBaby.save().then((baby) => {
    res.json({ result: true, baby });
  });
});

//Ajouter plusieur bébé

router.post("/babies", async (req, res) => {
  try {
    const babies = req.body;
    // Utiliser Promise.all pour attendre que toutes les opérations de sauvegarde soient terminées et pouvoir récupérer les données dans la réponse sans envoyer plusieurs réponses.
    const savedBabies = await Promise.all(
      // map pour boucler sur chaque élément envoyé
      babies.map(async (element) => {
        const { name, birthday, birthWeight, user_id } = element;
        console.log("Données reçues :", element);
        if (!name || !birthday || !birthWeight) {
          throw new Error("Tous les champs sont requis.");
        }
        const newBaby = new Baby({
          name,
          birthday,
          birthWeight,
          user_id,
        });
        return newBaby.save();
      })
    );
    // Envoyer la réponse avec les données des babies sauvegardés
    res.json({ result: true, data: savedBabies });
  } catch (error) {
    // Gérer les erreurs ici
    res.status(400).json({ result: false, error: error.message });
  }
});

// le parent est il associé à un bébé ?
router.get("/redirection/:id", (req, res) => {
  const { id } = req.params;
  //On verifie si le bébé existe dans la base de données
  Baby.findOne({ user_id: id }).then((baby) => {
    if (!baby) {
      res.json({ result: false, error: "pas de parent associé a ce bébé" });
    } else {
      res.json({ result: true, name: baby.name });
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Baby.findById(id)
    .populate("user_id")
    .populate("alimentation_id")
    .populate("elimination_id")
    .populate("care_id")
    .populate("weight_id")
    .populate("temperature_id")
    .then((data) => {
      res.json({ result: true, data });
    });
});

//recupérer tous les bébés pour affiché patientes dans list
router.get("/", (req, res) => {
  Baby.find()
    .populate("user_id")
    .populate("alimentation_id")
    .populate("elimination_id")
    .populate("care_id")
    .populate("weight_id")
    .populate("temperature_id")
    .then((data) => {
      //Je filtre les display true pour n'envoyer que les bébé dans le service
      const filteredData = data.filter(
        (baby) => baby.user_id && baby.user_id.display === true
      );
      res.json({ result: true, filteredData });
    })
    .catch((error) => {
      res.status(500).json({ result: false, message: error.message });
    });
});

module.exports = router;
