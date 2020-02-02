var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var dataSchema = new Schema({
  alt: Number
}, {versionKey:false, collection: 'data', strict: false});

var MongoData = mongoose.model('MongoData', dataSchema);
module.exports = MongoData;