const mongoose = require('mongoose');
var schema = mongoose.Schema;


var animalSchema = new schema({
    _id: schema.Types.ObjectId,
    nameAnimal: String,
    statusAnimal: String,
    costAnimal: Number,
    areaAnimal: String,
    summaryAnimal: String,
    urlAnimal: [{url: String}]
})
var Animal = mongoose.model('animals', animalSchema);

module.exports = Animal;