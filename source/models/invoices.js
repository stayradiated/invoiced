'use strict';

var Invoice = require('./invoice');

var Invoices = Backbone.Collection.extend({

  url: function () {
    return 'clients/' + this.client.id + '/invoices';
  },

  model: Invoice,

  initialize: function (options) {
    this.client = options.client;
  }

});

module.exports = Invoices;
