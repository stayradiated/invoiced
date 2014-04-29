'use strict';

var Table = require('../utils/table');
var query = require('../utils/db');
var rest = require('../utils/rest');

var clients = new Table({
  table: 'clients',
  columns: [
    'address', 'city', 'id', 'name', 'postcode'
  ],
  orderBy: 'dateUpdated',
  orderByDirection: 'desc',
  timestamps: true
});

clients.all = function (req, res) {
  query('clients')
  .select(query.raw(
    '*, (select count(id) from invoices where clientId = clients.id) as invoices'
  ))
  .orderBy('clients.dateUpdated', 'desc')
  .then(rest(res))
  .catch(rest.catch(res));
};

clients.join('invoices', 'clientid', 'id');

module.exports = clients;
