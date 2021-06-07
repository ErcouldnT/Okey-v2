const path = require('path');
const express = require('express');
const app = express();
 
app.use('/game', express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.send('Homepage!');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const server = app.listen(3000, () => {
  const host = 'localhost';
  const port = server.address().port;
  console.log('Listening on http://' + host + ':' + port + '/');
});
