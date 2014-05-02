'use strict';

var template = require('../../utils/template');

var Details = Backbone.Marionette.ItemView.extend({

  className: 'details',
  template: template('clients/details'),

  events: {
    'click .edit': 'editInvoice',
    'click .delete': 'destroyInvoice',
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  editInvoice: function () {
    this.trigger('edit:invoice', this.model);
  },

  destroyInvoice: function () {
    this.model.destroy();
  }

});

module.exports = Details;
