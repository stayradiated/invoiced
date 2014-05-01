var MySql = require('../utils/db');
var Invoice = require('./invoice');

var Invoices = MySql.Collection.extend({
  model: Invoice
});

module.exports = Invoices;
