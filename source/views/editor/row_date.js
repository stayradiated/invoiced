'use strict';

var template = require('../../utils/template');

var RowDate = Backbone.Marionette.ItemView.extend({

  className: 'row date',
  template: template('editor/row_date'),

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

module.exports = RowDate;
