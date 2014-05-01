'use strict';

var Client = require('./client');
var config = require('../config');

var Clients = Backbone.Collection.extend({

  model: Client,

  url: config.root + '/clients',

  comparator: function (a, b) {
    return b.get('updatedAt') - a.get('updatedAt');
  }

});

module.exports = Clients;
