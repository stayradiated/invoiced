'use strict';

var config = require('../config');

var Row = Backbone.Model.extend({

  urlRoot: config.root + '/rows',

  ITEM: 0,
  BULLET: 1,
  HEADING: 2,
  DATE: 3,

  defaults: { 
    invoice: null,
    type: 0,
    conent: ''
  },

});

module.exports = Row;
