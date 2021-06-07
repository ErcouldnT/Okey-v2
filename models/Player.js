const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!"
  },
  password: {
    type: String,
    required: "Password is required!"
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Player', playerSchema);
