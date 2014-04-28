'use strict';

var template = require('../../utils/template');

var RowHeading = Backbone.Marionette.ItemView.extend({

  className: 'row heading',
  template: template('editor/row_heading'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change'
  },

  change: function () {
    this.model.set('name', this.ui.input.val());
  }

});

module.exports = RowHeading;
