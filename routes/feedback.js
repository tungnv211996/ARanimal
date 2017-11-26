var express = require('express');
var router = express.Router();
const feedbackModel = require('../model/feedback.model');
const feedbackControllers = require('../controllers/feedback.controllers');

//view feedback
router.get('/api/viewfeedback', feedbackControllers.findAllFeedback);

//save feedback
router.post('/api/savefeedback', feedbackControllers.saveFeedback);

//check feedback
router.put('/api/checkfeedback/:idFeedback', feedbackControllers.checkFeedback);
module.exports = router;