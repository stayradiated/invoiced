'use strict';

var Invoice = require('./invoice');
var Invoices = require('./invoices');

var Client = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'invoices',
    relatedModel: Invoice,
    collectionType: Invoices,
    reverseRelation: {
      key: 'invoice'
    }
  }],

  defaults: {
    name: '',
    address: '',
    city: '',
    postcode: ''
  }

});

module.exports = Client;
