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
    this.model.save();

    this.rows.each(function (row) {
      if (row.hasChanged()) row.save();
    });
  }

});

module.exports = Header;
