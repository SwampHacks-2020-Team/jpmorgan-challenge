var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var rescueeSchema = new Schema({
  name: String,
  phone: String,
  numPeople: Number,
  longitude: Number,
  latitude: Number,
  time: Date,
  message: String,
  status: {
    assigned: Boolean,
    assigned_to: mongoose.ObjectId,
    picked_up: Boolean
  }
}, {versionKey:false});

var Rescuee = mongoose.model('Rescuee', rescueeSchema);
module.exports = Rescuee;