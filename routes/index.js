var express = require('express');
var router = express.Router();
var request = require('sync-request');
const Game = require('../models/games');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-game', async (req, res, next) => {

  if(!req.body.title){
    res.json({ result: false, message: "Veuillez saisir un titre pour sauvegarder la partie" })
  } else {
    const game = await Game.findOne({ title: req.body.title })
    if (!game) {
      const newGame = new Game({ ...req.body })
      const gameSaved = await newGame.save()
      if (gameSaved) {
        res.json({ result: true, message: "La partie a bien été sauvegardée" })
      } else {
        res.json({ result: false, message: "La partie n'a pas pu être sauvegardée" })
      }
    } else {
      const gameUpdated = await Game.updateOne({ title: req.body.title }, { ...req.body })
      if (gameUpdated) {
        res.json({ result: true, message: "La partie a bien été mise à jour" })
      } else {
        res.json({ result: true, message: "La partie n'a pas pu être mise à jour" })
      }
    }
  }  
})

router.get('/get-game', async (req, res, next) => {
  const game = await Game.findOne({ title: req.query.title })
  if(!game){
    res.json({ result: false, message: "La partie n'existe pas" })
  } else {
    res.json({ result: true, game })
  }
})

module.exports = router;
