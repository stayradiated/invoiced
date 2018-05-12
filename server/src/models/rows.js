/* @flow */

const db = require('../utils/db')
const Row = require('./row')

const Rows = db.Collection.extend({
  model: Row,
  comparator: 'order'
})

module.exports = Rows
