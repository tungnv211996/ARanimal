var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose')
const animalModel = require('../model/animal.model');

module.exports = { 
    createAnimal: function(req,res){
        console.log(JSON.stringify(req.body.stateAnimal));
        var animal = new animalModel({
        _id: new ObjectID(),
        nameAnimal: req.body.nameAnimal,
        stateAnimal: req.body.stateAnimal,
        costAnimal: req.body.costAnimal,
        areaAnimal: req.body.areaAnimal,
        summaryAnimal: req.body.summaryAnimal,
        urlAnimal: [{url: String}]
        }).save(function(err){
            if(err){
                res.status(504);
                res.end();
            }else{
                console.log('saved');
                res.end();
            }
        })
    },

    findAnimal: function(req, res) {
        animalModel.find({}, function(err, animals) {
          if (err) {
            return res.status(500).json({
              err: err || err.errmessage
            });
          } else {
            return res.status(200).json({
              animals: animals
            });
          }
        });
      },
    //Edit animal function. Client must to submit all properties.
    editAnimal: function(req, res){
        console.log(JSON.stringify(req.params.idAnimal));
        var id = req.params.idAnimal;
        var o_id = new ObjectID(id);
        animalModel.collection.update(
            {_id: o_id},
            {
                //$inc: {costAnimal: 5},
                $set: {
                    nameAnimal: req.body.nameAnimal,    
                    //stateAnimal: "active",
                    costAnimal: req.body.costAnimal,
                    areaAnimal: req.body.areaAnimal,
                    summaryAnimal: req.body.summaryAnimal,
                }
            },
            function(err){
            if (err) {
                return res.status(500).json({
                    err: err || err.errmessage
            });
        }else{
            return res.status(200).json({
                message: 'You have successfully edition a animal'
            });
        }
    })
},
    //set stateAnimal from "active" to "non-active"
    deleteAnimal: function(req, res){
        console.log(JSON.stringify(req.params.idAnimal));
        var id = req.params.idAnimal;
        var o_id = new ObjectID(id);
        animalModel.collection.update(
            {_id: o_id},
            {
               //$inc: {costAnimal: 5},
                $set: {
                    stateAnimal: "non-active",
            }
            },
            function(err){
            if (err) {
                return res.status(500).json({
                    err: err || err.errmessage
            });
        }else{
            return res.status(200).json({
                message: 'You have successfully deleted a animal'
            });
        }
    })
}
}