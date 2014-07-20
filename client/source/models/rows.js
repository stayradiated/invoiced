'use strict';

var _ = require('lodash');
var Backbone = require('backbone');

var Row = require('./row');
var ROW = require('../constants/row');
var config = require('../../package').config;

var Rows = Backbone.Collection.extend({

  model: Row,

  url: config.root + '/rows',

  comparator: 'order',

  initialize: function () {
    var memento = new Backbone.Memento(this);
    _.extend(this, memento);
    this.store();
  },

  save: function(){
    this.each(function (model) {
      model.save();
    });
  }

});

module.exports = Rows;
