'use strict';

var Row = require('./row');

var Rows = Backbone.Collection.extend({

  model: Row

});

module.exports = Rows;
