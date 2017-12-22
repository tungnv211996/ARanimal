const mongoose = require('mongoose');
var schema = mongoose.Schema;


var animalSchema = new schema({
    _id: schema.Types.ObjectId,
    nameAnimal: String,
    status: String,
    cost: Number,
    area: [{type: mongoose.Schema.Types.ObjectId, ref: 'Area'}],
    summary: String,
    url: String
})
var Animal = mongoose.model('animals', animalSchema);

animalSchema.pre('save', function(next){
    let self = this
    if(self.isNew && self.nameAnimal && self.status && self.cost && self.summary && self.url) next()
    else next(new Error('[Animals] cannot create'))
})
module.exports = Animal;