'use strict';

var Row = require('./row');
var config = require('../config');

var Rows = Backbone.Collection.extend({

  model: Row,

  url: config.root + '/rows',

  comparator: function (a, b) {
    return a.get('order') - b.get('order');
  }

});

module.exports = Rows;
