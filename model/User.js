var mongoose = require('mongoose')
var moment = require('moment')
var token = require('./Token')

var userSchema = new mongoose.Schema({
    username: String,
    hashpass: String,
    status: {type: String, options: 'ONLINE, OFFLINE'},
    sensor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sensor'}],
});

userSchema.pre('save', function(next){
    let self = this
    if(self.isNew && self.username && self.hashpass) {
        mongoose.model('Users').findOne({username: self.username},function(err, res){
            if(err) next(new Error('Error network'))
            else if(res) next(new Error('User existed'))
            else next()
        })
    } else {
        mongoose.model('Users').findOne({username: self.username},function(err, res){
            if(err) next(new Error('User not found'))
            else if(!res) next(new Error('User not found'))
            else next()
        })
    }
})

var User = mongoose.model('Users', userSchema);
// User.create({username: 'admin', hashpass: 'admin'}, function (err, res){
//     if(error || !result) console.log('Register failed')
//     else console.log('Register successful')
// })
module.exports = User
