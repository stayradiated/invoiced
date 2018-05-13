/* @flow */

const Knex = require('knex')
const Bookshelf = require('bookshelf')

const knex = new Knex({
  client: 'mysql',
  connection: {
    host: process.env.SQL_HOST || '127.0.0.1',
    port: process.env.SQL_PORT || '3306',
    user: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASS || '',
    database: process.env.SQL_DB || 'tcs_invoiced',
    charset: 'utf8',
    debug: false
  }
})

const bookshelf = new Bookshelf(knex)
bookshelf.plugin('pagination')

module.exports = bookshelf
