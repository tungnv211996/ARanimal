var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose')
const areaModel = require('../model/area.model');

module.exports = { 
    createArea: function(req,res){
        var area = new areaModel({
        _id: new ObjectID(),
        name: req.body.nameArea,
        animals: req.body.animals,
        }).save(function(err){
            if(err){
                res.status(504);
                res.end();
            }else{
                console.log('saved');
                return res.status(200).json({
                    message: 'You have successfully add a area'
                });
            }
        })
    },
    createAreaArray: function(req,res){
        var input = req.body
        input.map((area)=>{
            area['_id'] = new ObjectID()
            var area = new areaModel(area).save(function(err){
                    if(err) console.log('[Area] create failed ' + JSON.stringify(area));
                })
        })
        return res.status(200).json({message : 'request successful'})
    },

    findArea: function(req, res) {
        areaModel.find({}, function(err, areas) {
          if (err || areas.length < 0) {
            return res.status(500).json({
              err: err || err.errmessage
            })
          } else {
            return res.status(200).json(areas)}
        })
      },
    findAreaById: function(req, res){
        var id = req.params.id;
        var o_id = new ObjectID(id);
        areaModel.findOne({_id:o_id}, function(err, area) {
            if (err || !area) {
              return res.status(500).json({
                err: err || err.errmessage
              })
            } else {
              return res.status(200).json(area)
            }
          })
    },
    //Edit area function. Client must to submit all properties.
    editArea: function(req, res){
        var input = req.body
        var id = req.params.id;
        var o_id = new ObjectID(id);
        areaModel.collection.update(
            {_id: o_id},
            {
                $set: {input}
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
//     deleteAnimal: function(req, res){
//         console.log(JSON.stringify(req.params.idAnimal));
//         var id = req.params.idAnimal;
//         var o_id = new ObjectID(id);
//         animalModel.collection.update(
//             {_id: o_id},
//             {
//                //$inc: {costAnimal: 5},
//                 $set: {
//                     status: "non-active",
//                 }
//             },
//             function(err){
//             if (err) {
//                 return res.status(500).json({
//                     err: err || err.errmessage
//             });
//         }else{
//             return res.status(200).json({
//                 message: 'You have successfully deleted a animal'
//             });
//         }
//     })
// }
}