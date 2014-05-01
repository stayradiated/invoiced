'use strict';

var Route = require('../utils/route');
var Invoice = require('../models/invoice');
var Invoices = require('../models/invoices');

var invoices = new Route({
  model: Invoice,
  collection: Invoices
});

invoices.addRelation('rows');
invoices.addRelation('client');

module.exports = invoices;
