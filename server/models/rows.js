var MySql = require('../utils/db');
var Row = require('./row');

var Rows = MySql.Collection.extend({
  model: Row,
  comparator: 'order'
});

module.exports = Rows;
