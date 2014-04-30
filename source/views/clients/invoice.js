'use strict';

var template = require('../../utils/template');

var Invoice = Backbone.Marionette.ItemView.extend({

  className: 'invoice',
  template: template('clients/invoice'),

  events: {
    'click': 'select'
  },

  select: function () {
    this.trigger('select', this.model);
  }

});

module.exports = Invoice;
