'use strict';

var Route = require('../utils/route');
var Invoice = require('../models/invoice');
var Invoices = require('../models/invoices');
var rest = require('../utils/rest');
var docx = require('../utils/docx');

var invoices = new Route({
  collection: Invoices,
  columns: [
    'client', 'number', 'date', 'paid', 'customer', 'email', 'site',
    'cost', 'labour', 'airmover'
  ]
});

invoices.addRelation('rows');
invoices.addRelation('client');

invoices.addRoute('get', '/docx/:id', function (req, res) {
  var invoice = invoices.collection.get(req.params.id);
  if (! invoice) return rest.fail(res);

  docx(invoice)
  .then(function () {
    res.end();
  })
  .catch(function (err) {
    rest.fail(res, err);
  });
});

module.exports = invoices;
