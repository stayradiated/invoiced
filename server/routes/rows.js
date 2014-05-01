'use strict';

var Table = require('../utils/route');
var Row = require('../models/row');
var Rows = require('../models/rows');

var rows = new Table({
  model: Row,
  collection: Rows
});

module.exports = rows;
