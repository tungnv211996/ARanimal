
var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const feedbackModel = require('../model/feedback.model');

module.exports = {
    findAllFeedback: function(req, res){
        feedbackModel.find({}, function(err, feedbacks) {
            if (err) {
              return res.status(500).json({
                err: err || err.errmessage
              })
            } else {
              return res.status(200).json({
                feedbacks: feedbacks
              })
            }
        })
    },
    saveFeedback: function(req, res){
        var feedback = new feedbackModel({
            _id: new ObjectID(),
            animalName: req.body.animalName,
            userName: req.body.userNameFeedback,
            status: req.body.statusFeedback,
            title: req.body.titleFeedback,
            content: req.body.contentFeedback
            }).save(function(err){
                if(err){
                    res.status(504);
                    res.end();
                }else{
                    console.log('saved');
                    res.status(200).json({
                        feedback: feedback
                    });
                }
            })
    },
    checkFeedback: function(req, res){
        var id = req.params.idFeedback;
        var stt = req.body.statusFeedback;
        console.log(stt);
        // var cost = 0;
        // if(stt == "publish") cost = 1;
        var o_id = new ObjectID(id);
        console.log(id);
        feedbackModel.collection.update(
            {_id: o_id},
            {
                // $inc {} tăng cost cho user
                $set: {
                   statusFeedback: req.body.statusFeedback
                }
            },
            function(err){
            if (err) {
                return res.status(500).json({
                    err: err || err.errmessage
            });
        }else if(stt=='publish'){
            return res.status(200).json({
                message: 'Feedback is accepted'
            });
        }else{
            return res.status(200).json({
                message: 'Feedback isn\'t accepted'
            });
        }
    })
    }

}