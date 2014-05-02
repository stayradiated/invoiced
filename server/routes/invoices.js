'use strict';

var Route = require('../utils/route');
var Invoice = require('../models/invoice');
var Invoices = require('../models/invoices');

var invoices = new Route({
  collection: Invoices,
  columns: [
    'client', 'number', 'date', 'paid', 'customer', 'email', 'site',
    'cost', 'labour', 'airmover'
  ]
});

invoices.addRelation('rows');
invoices.addRelation('client');

module.exports = invoices;
