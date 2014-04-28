'use strict';

var template = require('../../utils/template');

var Header = Backbone.Marionette.ItemView.extend({

  className: 'header',
  template: template('editor/header'),

  events: {
    'click .save': 'save'
  },

  initialize: function (options) {
    this.rows = options.rows;
  },

  save: function () {
    this.rows.each(function (row) {
      row.save(undefined, { patch: true });
    });
  }

});

module.exports = Header;
