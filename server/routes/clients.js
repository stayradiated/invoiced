'use strict';

var Route = require('../utils/route');
var Client = require('../models/client');
var Clients = require('../models/clients');

var clients = new Route({
  model: Client,
  collection: Clients
});

clients.addRelation('invoices');

module.exports = clients;
