'use strict';

var Invoice = require('./invoice');

var Invoices = Backbone.Collection.extend({

  localStorage: new Backbone.LocalStorage('invoices'),

  model: Invoice

});

module.exports = Invoices;
