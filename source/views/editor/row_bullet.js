'use strict';

var template = require('../../utils/template');

var RowBullet = Backbone.Marionette.ItemView.extend({

  className: 'row bullet',
  template: template('editor/row_bullet'),

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

module.exports = RowBullet;
