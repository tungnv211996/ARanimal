var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose')
const animalModel = require('../model/animal.model');

module.exports = { 
    createAnimal: function(req,res){
        console.log(JSON.stringify(req.body));
        var animal = new animalModel({
        _id: new ObjectID(),
        nameAnimal: req.body.nameAnimal,
        statusAnimal: req.body.statusAnimal,
        costAnimal: 0,
        areaAnimal: "ocen",
        summaryAnimal: "no",
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
        animalModel.find(function(err, animals) {
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

    editAnimal: function(req, res){
        console.log(JSON.stringify(req.params.nameAnimal));
        var id = req.params.idAnimal;
        var o_id = new ObjectID(id);
        animalModel.collection.update(
            {_id: o_id},
            {
                //$inc: {costAnimal: 5},
                $set: {
                    nameAnimal: req.params.nameAnimal,    
                    //statusAnimal: "active",
                    costAnimal: req.params.costAnimal,
                    areaAnimal: req.params.areaAnimal,
                    summaryAnimal: req.params.areaAnimal,
                }
            },
            function(err){
            if (err) {
                return res.status(500).json({
                    err: err || err.errmessage
            });
        }else{
            return res.status(200).json({
                message: 'You have successfully update a animal'
            });
        }
    })
},

    deleteAnimal: function(req, res){
        console.log(JSON.stringify(req.params.idAnimal));
        var id = req.params.idAnimal;
        var o_id = new ObjectID(id);
        animalModel.collection.update(
            {_id: o_id},
            {
                //$inc: {costAnimal: 5},
                $set: {
                    statusAnimal: "active",
                   // nameAnimal: "dog"
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