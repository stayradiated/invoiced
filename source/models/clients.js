'use strict';

var Client = require('./client');

var Clients = Backbone.Collection.extend({

  localStorage: new Backbone.LocalStorage('clients'),

  model: Client

});

module.exports = Clients;
