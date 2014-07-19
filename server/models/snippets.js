var MySql = require('../utils/db');
var Snippet = require('./snippet');

var Snippets = MySql.Collection.extend({
  model: Snippet
});

module.exports = Snippets;
