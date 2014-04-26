'use strict';

var template = require('../../utils/template');

var Client = Backbone.Marionette.ItemView.extend({

  tagName: 'a',
  className: 'client',
  template: template('clients/client'),

  initialize: function () {
    this.$el.attr('href', '#clients/' + this.model.id);
    this.listenTo(this.model, 'select', this.select);
  },

  select: function () {
    this.$el.parent().find('.active').removeClass('active');
    this.$el.addClass('active');
  }

});

module.exports = Client;
