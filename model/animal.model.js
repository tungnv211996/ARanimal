const mongoose = require('mongoose');
var schema = mongoose.Schema;


var animalSchema = new schema({
    _id: schema.Types.ObjectId,
    nameAnimal: String,
    stateAnimal: String,
    costAnimal: Number,
    areaAnimal: String,
    summaryAnimal: String,
    urlAnimal: String
})
var Animal = mongoose.model('animals', animalSchema);

module.exports = Animal;