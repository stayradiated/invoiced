/* @flow */

const db = require('../utils/db')

const Row = db.Model.extend({
  tableName: 'rows'
})

module.exports = Row
