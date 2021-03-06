const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');
const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'dist/IncidentManager')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/IncidentManager/index.html'));
});

app.listen(process.env.PORT || port, function() {
  console.log('Server is live! Port: ' + port);
});
