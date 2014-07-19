'use strict';

var Backbone = require('backbone');

var Row = require('./row');
var ROW = require('../constants/row');
var config = require('../../package').config;

var Rows = Backbone.Collection.extend({

  model: Row,

  url: config.root + '/rows',

  comparator: 'order',

  save: function(){
    this.each(function (model) {
      if (model.hasChanged() || model.isNew()) model.save();
    });
  }

});

module.exports = Rows;
