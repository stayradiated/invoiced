'use strict';

process.stderr.on('data', console.log.bind(console));

var connect = require('connect');
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors({
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
}));
app.use(express.static(__dirname + '/../dist'));
app.use(connect.bodyParser());

var routes = [
  'clients', 'invoices', 'rows', // 'snippets'
];

routes.forEach(function (route) {
  require('./routes/' + route).listen(app);
});

app.listen(8080);

module.exports = app;
