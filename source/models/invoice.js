'use strict';

var Row = require('./row');
var Rows = require('./rows');
var config = require('../config');

var Invoice = Backbone.Model.extend({

  urlRoot: config.root + '/invoices',

  defaults: {
    client: null,
    number: null,
    date: null,
    paid: 0,

    customer: '',
    email: '',
    site: '',

    cost: 0,
    labour: 0,
    airmover: 0,

    createdAt: '',
    updatedAt: ''
  }

});

module.exports = Invoice;
