var express = require('express');
var router = express.Router();
const animalModel = require('../model/animal.model');
const feedbackModel = require('../model/feedback.model');
const feedbackControllers = require('../controllers/feedback.controllers');
const arudController = require('../controllers/crudAnimal.controllers')
const Token = require('../model/Token')

/* Get page animal*/
router.get('/', function(req, res, next) {
    //res.redirect('api');
    res.render('manageAnimal');
});
//middleware
router.all('/*', (req, res, next) => {
    if (!true) next()
    else {
      if (!req.headers.token) {
        res.status(403).send({ code: 403, success: false, status: "403 missing token" })
      }
      else {
        Token.findOne({ token: req.headers.token })
          .exec(function (err, token) {
            if (err) {
              res.status(404).send({ code: 404, success: false, status: "404 error connecting to user data", results: err })
            }
            else if (!token) {
              res.status(401).send({ code: 401, success: false, status: "401 invalid token" })
            }
            else if (token) {
              // TEST: it should track req user
              req.user = token.user
              next()
            }
          })
      } 
    }
  })

/* Create animal*/ 
router.post('/save',arudController.createAnimal );
 
/* Get animals*/
router.get('/view', arudController.findAnimal);

/*Get animal by id*/
router.get('/view/:idAnimal', arudController.findAnimalById);
/*Delete animal*/
router.put('/delete/:idAnimal', arudController.deleteAnimal);
//Edit animal
router.put('/edit/:idAnimal', arudController.editAnimal);

//view feedback
router.get('/viewfeedback', feedbackControllers.findAllFeedback);

//save feedback
router.post('/savefeedback', feedbackControllers.saveFeedback);

//check feedback
router.put('/checkfeedback/:idFeedback', feedbackControllers.checkFeedback);
  
module.exports = router;



