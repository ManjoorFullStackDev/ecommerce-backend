const {Schema, model} =  require('mongoose');

const locationSchema = new Schema({
  state: { type: String },
  cities: { type: [String] }
}, { collection: 'location' });

module.exports = model('location', locationSchema);