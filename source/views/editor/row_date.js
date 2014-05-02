'use strict';

var template = require('../../utils/template');

var RowDate = Backbone.Marionette.ItemView.extend({

  className: 'row date',
  template: template('editor/row_date'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .delete': 'destroy'
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowDate;
