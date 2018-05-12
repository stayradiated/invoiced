/* @flow */

const db = require('../utils/db')

const Snippet = db.Model.extend({
  tableName: 'snippets'
})

module.exports = Snippet
