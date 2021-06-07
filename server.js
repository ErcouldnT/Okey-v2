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
const Gameroom = mongoose.model('Gameroom');
require('./models/Message');

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
app.enable('trust proxy');

app.use('/', express.static(path.join(__dirname, 'vite-client', 'dist')));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
if (process.env.NODE_ENV === "development") {
  app.use(cors());
};
// Add error handlers

// Add middlewares
const auth = require('./middlewares/auth');

// app.get('/', (req, res) => {
//   res.send('Homepage!');
// });

// Register a player
app.post('/register', async (req, res) => {
  const { name, password } = req.body;
  // Add Joi
  const playerExists = await Player.findOne({ name });
  if (playerExists) {
    return res.json({
      message: "Player already exists."
    });
  };
  const player = new Player({ name, password });
  // Use bcryptjs
  await player.save();
  res.json({
    message: "Player [" + name + "] registered successfully!"
  });
});

// Player login
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

// Create a game room
app.post('/room', auth, async (req, res) => {
  const { name } = req.body;
  const roomExists = await Gameroom.findOne({ name });
  if (roomExists) {
    return res.json({
      message: "Game room already exists."
    });
  };
  const gameroom = new Gameroom({ name });
  await gameroom.save();
  res.json({
    message: "Game room created."
  });
});

// Redirect homepage for 404s
app.get('/*', (req, res) => {
  res.redirect('/');
});

const server = app.listen(process.env.PORT || 5000, () => {
  const host = 'localhost';
  const port = server.address().port;
  console.log('Listening on http://' + host + ':' + port + '/');
});
