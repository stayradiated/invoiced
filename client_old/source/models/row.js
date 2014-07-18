'use strict';

var config = require('../config');

var Row = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/rows',

  ITEM: 0,
  BULLET: 1,
  HEADING: 2,
  DATE: 3,

  defaults: { 
    invoice: null,
    order: 0,
    index: -1,
    content: ''
  }

});

module.exports = Row;
