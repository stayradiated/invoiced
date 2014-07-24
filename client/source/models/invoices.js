'use strict';

var Backbone = require('backbone');

var Invoice = require('./invoice');
var config = require('../../package').config;

var Invoices = Backbone.Collection.extend({

  model: Invoice,

  url: config.root + '/invoices',

  comparator: 'number'

});

module.exports = Invoices;
