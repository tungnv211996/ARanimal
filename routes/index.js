var express = require('express');
var router = express.Router();
const animalModel = require('../model/animal.model');
const arudController = require('../controllers/crudAnimal.controllers')

/* Create animal*/ 
router.post('/api/save',arudController.createAnimal );

/* Get page*/
router.get('/',[function(req, res, next) {
     res.render('index');
     }, arudController.findAnimal]);
 
/* Get animal*/
router.get('/api/view', arudController.findAnimal);
/*Delete animal*/
router.put('/api/delete/:idAnimal', arudController.deleteAnimal);
//Edit animal
router.put('/api/edit/:idAnimal', arudController.editAnimal)
  
module.exports = router;



