'use strict';

var Backbone = require('backbone');

var Row = require('./row');
var config = require('../../package').config;

var Rows = Backbone.Collection.extend({

  model: Row,

  url: config.root + '/rows',

  comparator: 'order'

});

module.exports = Rows;
