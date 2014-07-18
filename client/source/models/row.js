'use strict';

var Backbone = require('backbone');

var config = require('../../package').config;

var Row = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/rows',

  defaults: { 
    invoice: null,
    order: 0,
    index: -1,
    content: ''
  }

});

module.exports = Row;
