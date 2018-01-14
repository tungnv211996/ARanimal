var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose')
const animalModel = require('../model/animal.model');

module.exports = {
    createAnimal: function (req, res) {
        console.log(JSON.stringify(req.body.stateAnimal));
        var animal = new animalModel({
            _id: new ObjectID(),
            nameAnimal: req.body.nameAnimal,
            status: req.body.stateAnimal,
            cost: req.body.costAnimal,
            area: req.body.areaAnimal,
            summary: req.body.summaryAnimal,
            url: req.body.urlAnimal,
            image: req.body.imageAnimal,
            tester: req.body.testerAnimal
        }).save(function (err) {
            if (err) {
                res.status(504);
                res.end();
            } else {
                console.log('saved');
                return res.status(200).json({
                    message: 'You have successfully add a animal'
                });
            }
        })
    },

    findAnimal: function (req, res) {
        animalModel.find({}, function (err, animals) {
            if (err) {
                return res.status(500).json({
                    err: err || err.errmessage
                })
            } else {
                return res.status(200).json(
                    animals
                )
            }
        })
    },
    findAnimalById: function (req, res) {
        var id = req.params.idAnimal;
        var o_id = new ObjectID(id);
        animalModel.findOne({ _id: o_id }, function (err, animal) {
            if (err) {
                return res.status(500).json({
                    err: err || err.errmessage
                })
            } else {
                return res.status(200).json({
                    animal: animal
                })
            }
        })
    },
    //Edit animal function. Client must to submit all properties.
    editAnimal: function (req, res) {
        console.log(JSON.stringify(req.params.idAnimal));
        var id = req.params.idAnimal;
        var o_id = new ObjectID(id);
        animalModel.collection.update(
            { _id: o_id },
            {
                //$inc: {costAnimal: 5},
                $set: {
                    nameAnimal: req.body.nameAnimal,
                    status: req.body.stateAnimal,
                    cost: req.body.costAnimal,
                    area: req.body.areaAnimal,
                    summary: req.body.summaryAnimal,
                    url: req.body.urlAnimal,
                    image: req.body.imageAnimal,
                    tester: req.body.testerAnimal
                }
            },
            function (err) {
                if (err) {
                    return res.status(500).json({
                        err: err || err.errmessage
                    });
                } else {
                    return res.status(200).json({
                        message: 'You have successfully edition a animal'
                    });
                }
            })
    },
    //set stateAnimal from "active" to "non-active"
    deleteAnimal: function (req, res) {
        console.log(JSON.stringify(req.params.idAnimal));
        var id = req.params.idAnimal;
        var o_id = new ObjectID(id);
        animalModel.collection.update(
            { _id: o_id },
            {
                //$inc: {costAnimal: 5},
                $set: {
                    status: "non-active",
                }
            },
            function (err) {
                if (err) {
                    return res.status(500).json({
                        err: err || err.errmessage
                    });
                } else {
                    return res.status(200).json({
                        message: 'You have successfully deleted a animal'
                    });
                }
            })
    }
}