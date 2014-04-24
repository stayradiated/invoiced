'use strict';

var template = require('../../utils/template');

var Invoices = Backbone.Marionette.CompositeView.extend({

  className: 'invoices',
  template: template('clients/invoices')

});

module.exports = Invoices;
