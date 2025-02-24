const {Schema, model} =  require('mongoose');
const {v4: uuid} = require('uuid');

const userSchema = new Schema({
  userId :{type: String, default: uuid},
  firstName : {type: String, required: true},
  gender : {type: String, required: true},
  birthDate : {type: Date, default: Date.now},
  location : {type: String},
  skills: {type: [String]}
})

module.exports = model('users', userSchema);