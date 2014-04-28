'use strict';

var connect = require('connect');
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.static(__dirname + '/../dist'));
app.use(connect.bodyParser());

var routes = [
  'clients', 'invoices', 'rows', 'snippets'
];

routes.forEach(function (route) {
  require('./routes/' + route).listen(app);
});

app.listen(8080);

module.exports = app;
