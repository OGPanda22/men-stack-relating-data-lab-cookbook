const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  // YOU DO: Define properties of food schema
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // YOU DO: embed foodSchema here
  pantry: [foodSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
