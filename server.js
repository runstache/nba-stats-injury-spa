var express = require('express');
var cors = require('cors');
const client = require('axios');
const parser = require('body-parser');


const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};


var app = express();
const app_port = process.env.PORT || 8089;
const API_ROOT = process.env.API || 'http://host.docker.internal/nbaapi/api';

app.use(express.static('src'));
app.use('/js', express.static(__dirname + '/src/js'));
app.use('/css', express.static(__dirname + '/src/css'));
app.use(cors());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.get('/api/teams', function (req, res) {
  client.get(API_ROOT + '/teams')
      .then((response) =>{
        res.send(response.data);
      }).catch(err => console.log(err));
});

app.get('/api/teams/:id/injuries', function (req, res) {
  client.get(API_ROOT + '/teams/' + req.params.id + '/injuries')
      .then((response) =>{
        res.send(response.data);
      }).catch(err => console.log(err));
});

app.get('/api/teams/:id/roster', function (req, res) {
  client.get(API_ROOT + '/teams/' + req.params.id + '/roster')
      .then((response) =>{
        res.send(response.data);
      }).catch(err => console.log(err));
});

app.post('/api/injuries', function (req, res) {
  client.post(API_ROOT + '/injuries', req.body)
      .then((response) => {
        res.send(response.data);

      }).catch(err => console.log(err));
});

var server = app.listen(app_port, function () {
  var port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
