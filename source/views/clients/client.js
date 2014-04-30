'use strict';

var template = require('../../utils/template');

var Client = Backbone.Marionette.ItemView.extend({

  className: 'client',
  template: template('clients/client'),

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

module.exports = Client;
