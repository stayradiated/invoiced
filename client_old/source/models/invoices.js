'use strict';

var Invoice = require('./invoice');
var config = require('../config');

var Invoices = Backbone.Collection.extend({

  model: Invoice,

  url: config.root + '/invoices',

  comparator: 'id'

});

module.exports = Invoices;
