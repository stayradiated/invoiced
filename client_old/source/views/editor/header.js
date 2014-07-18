'use strict';

var template = require('../../utils/template');

var Header = Backbone.Marionette.ItemView.extend({

  className: 'header',
  template: template('editor/header'),

  events: {
    'click .save': 'save',
    
    'click .item': 'createItem',
    'click .bullet': 'createBullet',
    'click .heading': 'createHeading',
    'click .date': 'createDate'
  },

  save: function () {
    this.trigger('save');
  },

  createItem: function () {
    this.trigger('create:row', 0);
  },

  createBullet: function () {
    this.trigger('create:row', 1);
  },

  createHeading: function () {
    this.trigger('create:row', 2);
  },

  createDate: function () {
    this.trigger('create:row', 3);
  }

});

module.exports = Header;
