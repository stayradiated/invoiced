'use strict';

var Invoice = require('./invoice');
var Invoices = require('./invoices');

var Client = Backbone.Model.extend({

  urlRoot: 'clients',

  defaults: {
    name: '',
    address: '',
    city: '',
    postcode: ''
  }

});

module.exports = Client;
