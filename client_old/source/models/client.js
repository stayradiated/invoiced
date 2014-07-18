'use strict';

var Invoice = require('./invoice');
var Invoices = require('./invoices');
var config = require('../config');

var Client = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/clients',

  defaults: {
    name: '',
    address: '',
    city: '',
    postcode: '',
    createdAt: null,
    updatedAt: null 
  },

  relations: [{
    type: 'HasMany',
    key: 'invoices',
    relatedModel: Invoice,
    collectionType: Invoices,
    includeInJSON: 'id',
    reverseRelation: {
      key: 'client',
      includeInJSON: 'id'
    }
  }],

  parse: function (json) {
    json.date = new Date(json.date);
    json.createdAt = new Date(json.createdAt);
    json.updatedAt = new Date(json.updatedAt);
    return json;
  }

});

module.exports = Client;
