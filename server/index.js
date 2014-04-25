var express = require('express');
var app = express();

var routes = [
  'clients', 'invoices', 'rows', 'snippets'
];

routes.forEach(function (route) {
  require('./routes/' + route).listen(app);
});

app.listen(8080);

module.exports = app;
