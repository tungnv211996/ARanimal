const mongoose = require('mongoose');
var schema = mongoose.Schema;


var animalSchema = new schema({
    _id: schema.Types.ObjectId,
    nameAnimal: String,
    status: String,
    cost: Number,
    area: String,
    summary: String,
    url: String,
    image: String
})
var Animal = mongoose.model('animals', animalSchema);

module.exports = Animal;