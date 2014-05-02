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
    'click .switch-type': 'switchType'
  },

  change: function () {
    this.model.set('name', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 3);
  }

});

module.exports = RowHeading;
