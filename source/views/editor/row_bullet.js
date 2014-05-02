'use strict';

var template = require('../../utils/template');

var RowBullet = Backbone.Marionette.ItemView.extend({

  className: 'row bullet',
  template: template('editor/row_bullet'),

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
    this.model.set('type', 2);
  }

});

module.exports = RowBullet;
