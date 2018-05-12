/* @flow */

const Route = require('../utils/route')
const Snippets = require('../models/snippets')

const snippets = new Route({
  collection: Snippets,
  columns: ['shortcut', 'content']
})

module.exports = snippets
