'use strict';

var template = require('../../utils/template');

var RowHeading = Backbone.Marionette.ItemView.extend({

  className: 'row heading',
  template: template('editor/row_heading'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .switch-type': 'switchType',
    'click .delete': 'destroy',
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 0);
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowHeading;
