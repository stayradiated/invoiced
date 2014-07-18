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
    'click .switch-type': 'switchType',
    'click .delete': 'destroy',
  },

  change: function () {
    this.model.set('content', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 2);
  },

  destroy: function () {
    this.model.destroy();
  }

});

module.exports = RowBullet;
