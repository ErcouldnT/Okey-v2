require('dotenv').config();

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
require('./models/Gameroom');
require('./models/Message');

const path = require('path');
const express = require('express');
const app = express();
 
app.use('/', express.static(path.join(__dirname, 'client')));
// Add error handlers

// app.get('/', (req, res) => {
//   res.send('Homepage!');
// });

app.get('/*', (req, res) => {
  res.redirect('/');
});

const server = app.listen(process.env.PORT || 5000, () => {
  const host = 'localhost';
  const port = server.address().port;
  console.log('Listening on http://' + host + ':' + port + '/');
});
