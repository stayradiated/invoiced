var MySql = require('../utils/db');

var Row = MySql.Model.extend({
  tableName: 'rows',
});

module.exports = Row;
