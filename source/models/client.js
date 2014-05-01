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
    createdAt: null,
    updatedAt: null 
  },

  parse: function (json) {
    json.createdAt = new Date(json.createdAt);
    json.updatedAt = new Date(json.updatedAt);
    return json;
  }

});

module.exports = Client;
