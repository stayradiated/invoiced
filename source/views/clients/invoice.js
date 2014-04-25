'use strict';

var template = require('../../utils/template');

var Invoice = Backbone.Marionette.ItemView.extend({

  className: 'invoice',
  template: template('clients/invoice')

});

module.exports = Invoice;
