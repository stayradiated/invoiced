'use strict';

var Client = require('./client');
var config = require('../config');

var Clients = Backbone.Collection.extend({

  model: Client,

  url: config.root + '/clients'

});

module.exports = Clients;
