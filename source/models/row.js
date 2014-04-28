'use strict';

var config = require('../config');

var Row = Backbone.Model.extend({

  urlRoot: config.root + '/rows',

  defaults: { 
    name: '',
    order: 0,
    type: 'number'
  }

});

module.exports = Row;
