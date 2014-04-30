'use strict';

var template = require('../../utils/template');

var Invoice = Backbone.Marionette.ItemView.extend({

  className: 'invoice',
  template: template('clients/invoice'),

  events: {
    'click': 'select'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  select: function () {
    this.trigger('select');
    this.$el.addClass('active');
  }

});

module.exports = Invoice;
