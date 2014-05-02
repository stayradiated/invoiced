'use strict';

var Route = require('../utils/route');
var Rows = require('../models/rows');

var rows = new Route({
  collection: Rows,
  columns: ['invoice', 'type', 'order', 'content']
});

module.exports = rows;
