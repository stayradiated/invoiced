var express = require('express');
var app = express();

var clients = require('./routes/clients');
var invoices = require('./routes/invoices');

clients.listen(app);
invoices.listen(app);

app.listen(8080);

module.exports = app;
