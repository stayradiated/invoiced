'use strict';

var template = require('../../utils/template');

var RowItem = Backbone.Marionette.ItemView.extend({

  className: 'row item',
  template: template('editor/row_item'),

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

module.exports = RowItem;

