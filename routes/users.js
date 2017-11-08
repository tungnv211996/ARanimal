var express = require('express');
var router = express.Router();
const animalModel = require('../model/animal.model');
const arudController = require('../controllers/crudAnimal.controllers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/', arudController.findAnimal);

module.exports = router;
