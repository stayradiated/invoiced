'use strict';

var template = require('../../utils/template');

var Invoice = Backbone.Marionette.ItemView.extend({

  className: 'invoice',
  template: template('clients/invoice'),

  initialize: function () {
    console.log(this.model);
    this.listenTo(this.model, 'change', this.render);
  },

  onRender: function () {
    console.log('rendering');
  }

});

module.exports = Invoice;
