'use strict';

var Invoice = require('./invoice');
var config = require('../config');

var Invoices = Backbone.Collection.extend({

  model: Invoice,

  url: function () {
    return config.root + '/clients/' + this.client.id + '/invoices';
  },

  initialize: function (options) {
    this.client = options.client;
  },

  comparator: function (a, b) {
    return b.id - a.id;
  }

});

module.exports = Invoices;
