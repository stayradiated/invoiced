'use strict';

var Table = require('../utils/table');

var invoices = new Table({
  table: 'invoices',
  columns: [
    'id', 'clientId', 'date', 'customer', 'site',
    'email', 'cost', 'paid', 'labour', 'airmover'
  ],
  orderBy: 'dateUpdated',
  orderByDirection: 'desc',
  timestamps: true
});

invoices.join('rows', 'invoiceid', 'id');

module.exports = invoices;
