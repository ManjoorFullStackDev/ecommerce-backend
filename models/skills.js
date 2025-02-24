const {Schema, model} =  require('mongoose');

const skillsSchema = new Schema({
  key: { type: String },
  value: { type: String }
},{ collection: 'skills' });

module.exports = model('skills', skillsSchema);