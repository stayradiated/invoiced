'use strict';

var Table = require('../utils/table');

var invoices = new Table({
  table: 'invoices',
  columns: [
    'id', 'clientId', 'date', 'customer', 'site', 'email', 'cost',
    'paid', 'dateUpdated', 'dateCreated', 'labour', 'airmover'
  ],
  orderBy: 'dateUpdated',
  orderByDirection: 'desc'
});

invoices.join('rows', 'invoiceid', 'id');

module.exports = invoices;
