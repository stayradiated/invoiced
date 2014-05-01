var MySql = require('../utils/db');
var Client = require('./client');

var Clients = MySql.Collection.extend({
  model: Client
});

module.exports = Clients;
