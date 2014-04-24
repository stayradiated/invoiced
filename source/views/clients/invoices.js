'use strict';

var template = require('../../utils/template');
var Invoice = require('./invoice');

var Invoices = Backbone.Marionette.CompositeView.extend({

  className: 'invoices',
  template: template('clients/invoices'),

  itemView: Invoice,
  itemViewContainer: '.invoice-collection'

});

module.exports = Invoices;
