const mongoose = require('mongoose');
var schema = mongoose.Schema;


var areaSchema = new schema({
    _id: schema.Types.ObjectId,
    animals : [{type: mongoose.Schema.Types.ObjectId, ref: 'Animal'}],
    code : String,
    name : String,
    url : String
})
var Area = mongoose.model('areas', areaSchema);

areaSchema.pre('save', function(next){
    let self = this
    if(self.isNew && self.name && self.url && self.code) next()
    else next(new Error('[Area] cannot create'))
})
.pre('save', function(next){
    let self = this
    if(self.isNew){
        mongoose.model('Areas').findOne({code: self.code},function(err, area){
            console.log(area)
            if(err || !area) next()
            else if(area) next(new Error('[Area] is existed'))
        }
    )}
})

module.exports = Area;