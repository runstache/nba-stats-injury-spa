var express = require('express');
var cors = require('cors');

var app = express();

app.use(express.static('src'));
app.use('/js', express.static(__dirname + '/src/js'));
app.use('/css', express.static(__dirname + '/src/css'));
app.use(cors());

var server = app.listen(8089, function(){
  var port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
