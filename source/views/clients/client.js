var template = require('../../utils/template');

var Client = Backbone.Marionette.ItemView.extend({

  tagName: 'a',
  className: 'client',
  template: template('clients/client'),

  initialize: function () {
    this.$el.attr('href', '#clients/' + this.model.id);
  }

});

module.exports = Client;
