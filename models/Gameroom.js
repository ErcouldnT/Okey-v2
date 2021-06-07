const mongoose = require('mongoose');

const gameroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!"
  },
});

module.exports = mongoose.model('Gameroom', gameroomSchema);
