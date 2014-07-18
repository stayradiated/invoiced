'use strict';

var Backbone = require('backbone');

var Row = require('./row');
var ROW = require('../constants/row');
var config = require('../../package').config;

var Rows = Backbone.Collection.extend({

  model: Row,

  url: config.root + '/rows',

  comparator: 'order',

  initialize: function (options) {
    if (! options || ! options.master) {
      this.setRowIndex();
      this.on('reset change add remove change:type', this.setRowIndex, this);
    }
  },

  setRowIndex: function () {
    var i = 1;
    this.each(function (model) {
      if (model.get('type') === ROW.ITEM) {
        model.set('index', i++);
      }
    });
  },

  save: function(){
    this.each(function (model) {
      if (model.hasChanged()) model.save();
    });
  }

});

module.exports = Rows;
