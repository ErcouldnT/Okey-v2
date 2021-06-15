require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => console.log("Mongo connected!"));

// mongoose.connection.on('error', (err) => {
//   console.log("Mongo error:", err.message);
// });

// Bring the models
require('./models/Player');
const Player = mongoose.model('Player');
require('./models/Gameroom');
const Gameroom = mongoose.model('Gameroom');
require('./models/Message');

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
app.enable('trust proxy');

app.use('/', express.static(path.join(__dirname, 'client', 'dist')));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
if (process.env.NODE_ENV === "development") {
  app.use(require('cors')());
};

// Add middlewares
const auth = require('./middlewares/auth');
const notFound = require('./middlewares/404');
const errorHandler = require('./middlewares/500');

//app.use(notFound);
app.use(errorHandler);

// app.get('/', (req, res) => {
//   res.send('Homepage!');
// });

// Register a player
app.post('/register', async (req, res, next) => {
  try {
    let { name, password } = req.body;
    // Add Joi
    name = name.toLowerCase().trim();
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
      message: "Hi " + name + ", registered successfully!"
    });
  } catch (error) {
    next(error);
  };
});

// Player login
app.post('/login', async (req, res, next) => {
  try {
    let { name, password } = req.body;
    name = name.toLowerCase().trim();
    const player = await Player.findOne({ name, password });
    if (!player) {
      return res.json({
        message: "Wrong password or Player not found."
      });
    };
    const token = jwt.sign({ id: player.id }, process.env.SECRET);
    res.json({
      message: "Hi " + name + ", logged in successfully!",
      token,
    });
  } catch (error) {
    next(error);
  };
});

// Create a game room
app.post('/room', auth, async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  };
});

// Get all rooms
app.get('/rooms', auth, async (req, res, next) => {
  try {
    const gamerooms = await Gameroom.find({});
    res.json(gamerooms);
  } catch (error) {
    next(error);
  };
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

const io = require('socket.io')(server, {
  cors: {
    origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://okey.erkuttekoglu.com",
    methods: ["GET", "POST"],
  }
});
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.player_id = payload.id;
    next();
  } catch (error) {
    console.log(error);
  };
})

io.on('connection', (socket) => {
  console.log("Connected:", socket.player_id);

  socket.on('disconnect', () => {
    console.log("Disconnected:", socket.player_id);
  })
})
