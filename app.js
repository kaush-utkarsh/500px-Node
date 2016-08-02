// dependency objects
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// initiate the express app object
var app = express();

// include bodyParser to enable api requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app settings
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);

// routing objects
var index = require('./routes/index');

app.use('/', index);


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


process.on('uncaughtException', function (err) {
  console.log(err);
})


// initating server on a port
var server = app.listen(8000);

exports.server = server;
