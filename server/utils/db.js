var Knex = require('knex');

var knex = Knex.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'invoicer',
    charset: 'utf8'
  }
});

module.exports = knex;
