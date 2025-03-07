var express = require('express');
var router = express.Router();

require('../models/connection');
const userPros = require('../models/userPro');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


// Inscription Pro
router.post('/signup', (req, res) => {
    if (!checkBody(req.body, [ 'firstName', 'lastName', 'username', 'password', 'confirmPassword'])) {
      res.json({ result: false, error: "Tous les champs sont obligatoires" });
      return;
    }

    if(req.body.password !== req.body.confirmPassword){
        res.json({result: false, error: "Mots de passe différents"})
    } else {
      userPros.findOne({ username: req.body.username }).then(data => {
      if (data === null) // s'il n'existe pas déjà un nom d'utilisateur égal à celui qui a été rentré
      
      {
        const hash = bcrypt.hashSync(req.body.password, 10);
  
        const newUserPro = new userPros({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
         // etablissement: req.body.etablissement,
          password: hash,
          token: uid2(32),
        });
  
        newUserPro.save().then(newDoc => {
          res.json({ result: true, token: newDoc.token });
        });
      } else {
        // User already exists in database
        res.json({ result: false, error: "L'utilisateur existe déjà" });
      }
    });
}

    

} )

// Connexion pro

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Tous les champs sont obligatoires' });
    return;
  }

  userPros.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false, error: "Le nom d'utilisateur ou le mot de passe est incorrect" });
    }
  });
});




module.exports = router;