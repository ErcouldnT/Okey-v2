require('dotenv').config();
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection.on('error', (err) => {
  console.log("Mongo error:", err.message);
});
mongoose.connection.once('open', () => {
  console.log("Mongo connected!");
});

// Bring the models
require('./models/Player');
const Player = mongoose.model('Player');
require('./models/Gameroom');
require('./models/Message');

const path = require('path');
const express = require('express');
const { userInfo } = require('os');
const app = express();
 
app.use('/', express.static(path.join(__dirname, 'client')));
app.use(express.json());
// Add error handlers

// app.get('/', (req, res) => {
//   res.send('Homepage!');
// });

app.post('/register', async (req, res) => {
  const { name, password } = req.body;
  // Add Joi
  const player = new Player({ name, password });
  // Use bcryptjs
  await player.save();
  res.json({
    message: "Player [" + name + "] registered successfully!"
  });
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const player = await Player.findOne({ name, password });
  if (!player) {
    return res.json({
      message: "Wrong password or Player not found."
    });
  };
  const token = jwt.sign({ id: player.id }, process.env.SECRET);
  res.json({
    message: "Player [" + name + "] logged in successfully!",
    token,
  });
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const server = app.listen(process.env.PORT || 5000, () => {
  const host = 'localhost';
  const port = server.address().port;
  console.log('Listening on http://' + host + ':' + port + '/');
});
