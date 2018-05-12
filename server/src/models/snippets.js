/* @flow */

var db = require('../utils/db')
var Snippet = require('./snippet')

var Snippets = db.Collection.extend({
  model: Snippet
})

module.exports = Snippets
