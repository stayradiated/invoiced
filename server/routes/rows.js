'use strict';

var Table = require('../utils/table');

var rows = new Table({
  table: 'rows',
  columns: ['id', 'invoiceid', 'type', 'number', 'name']
});

module.exports = rows;
