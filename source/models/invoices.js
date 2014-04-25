'use strict';

var Invoice = require('./invoice');

var Invoices = Backbone.Collection.extend({

  url: function () {
    return 'clients/' + this.clientId + '/invoices';
  },

  model: Invoice,

  initialize: function (options) {
    this.clientId = options.client;
  }

});

module.exports = Invoices;
