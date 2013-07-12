
Base = require 'base'

class Snippet extends Base.Model

  defaults:
    id: null
    content: 'A new snippet'

  constructor: ->
    super

class Snippets extends Base.Collection

  model: Snippet

  constructor: ->
    super

module.exports = Snippets
