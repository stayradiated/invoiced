'use strict';

var template = require('../../utils/template');

var RowItem = Backbone.Marionette.ItemView.extend({

  className: 'row item',
  template: template('editor/row_item'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .switch-type': 'switchType',
    'click .delete': 'destroy'
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 1);
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowItem;

