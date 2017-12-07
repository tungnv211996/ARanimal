const mongoose = require('mongoose');
var schema = mongoose.Schema;


var feedbackSchema = new schema({
    _id: schema.Types.ObjectId,
    userName: String,
    animalName: String,
    status: String,
    title: String,
    content: String
})
var Feedback = mongoose.model('feedbacks', feedbackSchema);

module.exports = Feedback;