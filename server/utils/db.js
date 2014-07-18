var Knex = require('knex');
var Bookshelf = require('bookshelf');

var knex = Knex.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'nodejs',
    password: 'nodejs',
    database: 'invoice_redux',
    charset: 'utf8',
    debug: false
  }
});

var MySql = Bookshelf.initialize(knex);

module.exports = MySql;
