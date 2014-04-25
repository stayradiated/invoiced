'use strict';

var Client = require('./client');

var Clients = Backbone.Collection.extend({

  url: 'clients',

  model: Client

});

module.exports = Clients;
