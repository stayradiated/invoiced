var Bookshelf = require('bookshelf');

var MySql = Bookshelf.initialize({
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

module.exports = MySql;
