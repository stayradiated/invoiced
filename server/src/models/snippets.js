/* @flow */

const db = require('../utils/db')

const { Snippet } = require('./snippet')

const Snippets = db.Collection.extend({
  model: Snippet
})

module.exports = {
  Snippets,
  snippets: Snippets.forge()
}
