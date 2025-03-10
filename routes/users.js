const express = require("express");
const router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Baby = require("../models/baby");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//AJOUTER une patiente
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "lastname", "motherName", "room"])) {
    res.json({
      result: false,
      error: "Tous les champs sont obligatoires",
    });
    return;
  }
  // on vérifie si la chambre n'est pas déjà occupée !
  User.findOne({ display: true, room: req.body.room }).then((data) => {
    if (data === null) {
      // si dispo alors on vérifie si la patiente n'exite pa déjà en BDD
      User.findOne({ username: req.body.username }).then((data) => {
        //   si pas trouvé alors on créé la patiente
        if (data === null) {
          const hash = bcrypt.hashSync(
            `${req.body.lastname}_${req.body.motherName}`,
            10
          );
          const newUser = new User({
            display: true,
            username: req.body.username,
            lastname: req.body.lastname,
            motherName: req.body.motherName,
            password: hash,
            room: req.body.room,
            token: uid2(32),
          });

          newUser.save().then((newDoc) => {
            res.json({ result: true, data: newDoc });
          });
        } else {
          // Patiente existe déjà dans la BDD
          res.json({ result: false, error: "Cette patiente existe déjà !" });
        }
      });
    } else {
      res.json({ result: false, error: "Cette  chambre est déjà occupée !" });
    }
  });
});

// CONNEXION patiente

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Tous les champs sont obligatoires" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, data });
    } else {
      res.json({
        result: false,
        error: "Le nom d'utilisateur ou le mot de passe est incorrect !",
      });
    }
  });
});

// récupérer toutes la patientes du service

router.get("/", (req, res) => {
  User.find({ display: true })
    .then((data) => {
      // Trier les données par numéro de chambre
      let dataSort = data.sort((a, b) => a.room - b.room);
      res.json({ result: true, length: data.length, data: dataSort });
    })
    .catch((error) => {
      // Gérer les erreurs
      res.status(500).json({ result: false, error: error.message });
    });
});








module.exports = router;
