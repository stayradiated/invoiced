'use strict';

var Invoice = require('./invoice');
var Invoices = require('./invoices');
var config = require('../config');

var Client = Backbone.Model.extend({

  urlRoot: config.root + '/clients',

  defaults: {
    name: '',
    address: '',
    city: '',
    postcode: '',
    invoices: 0
  }

});

module.exports = Client;
