var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var rescuerSchema = new Schema({
  name: String,
  phone: {type: String, required: true, unique: true},
  boat: String,
  boat_capacity: Number,
  boat_depth: Number,
  numPeople: Number,
  assigned_rescuees: [mongoose.ObjectId],
  current_gpx_uri: String
}, {versionKey:false});

var Rescuer = mongoose.model('Rescuer', rescuerSchema);
module.exports = Rescuer;