var express = require('express');
var app = express();

var clients = require('./routes/clients');
var invoices = require('./routes/invoices');
var rows = require('./routes/rows');

clients.listen(app);
invoices.listen(app);
rows.listen(app);

app.listen(8080);

module.exports = app;
