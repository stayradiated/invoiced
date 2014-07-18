'use strict';

var Backbone = require('backbone');

var Client = require('./client');
var config = require('../../package').config;

var Clients = Backbone.Collection.extend({

  model: Client,

  url: config.root + '/clients',

  comparator: 'name'

});

module.exports = Clients;
