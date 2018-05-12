/* @flow */

const Route = require('../utils/route')
const Rows = require('../models/rows')

const rows = new Route({
  collection: Rows,
  columns: ['invoice', 'type', 'order', 'content']
})

module.exports = rows
