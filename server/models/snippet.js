var MySql = require('../utils/db');

var Snippet = MySql.Model.extend({
  tableName: 'snippets'
});

module.exports = Snippet;
