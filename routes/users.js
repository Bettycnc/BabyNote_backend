var express = require('express');
var router = express.Router();

require('../models/connection');
const userPros = require('../models/userPro');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');



router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['firstName', 'lastName', 'username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    User.findOne({ username: req.body.username }).then(data => {
        if (data === null) // s'il n'existe pas déjà un nom d'utilisateur égal à celui qui a été rentré
        
        {
          const hash = bcrypt.hashSync(req.body.password, 10);
    
          const newUserPro = new UserPro({
            username: req.body.username,
            password: hash,
            token: uid2(32),
            canBookmark: true,
          });
    
          newUser.save().then(newDoc => {
            res.json({ result: true, token: newDoc.token });
          });
        } else {
          // User already exists in database
          res.json({ result: false, error: 'User already exists' });
        }
      });







} )





module.exports = router;