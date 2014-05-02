'use strict';

var template = require('../../utils/template');

var Header = Backbone.Marionette.ItemView.extend({

  className: 'header',
  template: template('editor/header'),

  events: {
    'click .save': 'save'
  },

  save: function () {
    this.trigger('save');
  }

});

module.exports = Header;
