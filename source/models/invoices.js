'use strict';

var Invoice = require('./invoice');

var Invoices = Backbone.Collection.extend({

  url: 'clients/50/invoices',

  model: Invoice

});

module.exports = Invoices;
