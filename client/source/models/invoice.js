'use strict';

var _ = require('lodash');
var Backbone = require('backbone');

var Row = require('./row');
var Rows = require('./rows');
var config = require('../../package').config;

var Invoice = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/invoices',

  defaults: {
    client: null,
    number: null,

    date: new Date(),
    paid: 0,

    customer: '',
    email: '',
    site: '',

    cost: 0,
    labour: 0,
    airmover: 0,

    createdAt: '',
    updatedAt: ''
  },

  relations: [{
    type: 'HasMany',
    key: 'rows',
    relatedModel: Row,
    collectionType: Rows,
    includeInJSON: false,
    reverseRelation: {
      key: 'invoice',
      includeInJSON: 'id'
    }
  }],

  initialize: function () {
    var memento = new Backbone.Memento(this);
    _.extend(this, memento);
    this.store();
  }

});

module.exports = Invoice;
