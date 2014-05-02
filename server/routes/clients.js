'use strict';

var Route = require('../utils/route');
var Clients = require('../models/clients');

var clients = new Route({
  collection: Clients,
  columns: ['name', 'address', 'city', 'postcode']
});

clients.addRelation('invoices');

module.exports = clients;
