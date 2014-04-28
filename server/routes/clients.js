'use strict';

var Table = require('../utils/table');
var query = require('../utils/db');
var rest = require('../utils/rest');

var clients = new Table({
  table: 'clients',
  columns: [
  ],
  orderBy: 'dateUpdated',
  orderByDirection: 'desc'
});

clients.all = function (req, res) {
  query('clients')
  .select('clients.*')
  .count('invoices.id as invoices')
  .join('invoices', 'clients.id', '=', 'invoices.clientId')
  .orderBy('clients.dateUpdated', 'desc')
  .groupBy('clients.id')
  .then(rest(res))
  .catch(rest.catch(res));
};

clients.join('invoices', 'clientid', 'id');

module.exports = clients;
