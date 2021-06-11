const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  gameroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Gameroom is required!",
    ref: 'Gameroom'
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Player is required!",
    ref: 'Player'
  },
  message: {
    type: String,
    required: "Message is required!"
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);
