
Base = require '../libs/base'

class Row extends Base.Model

  defaults:
    name: ''
    number: 0
    type: 'number'

  constructor: ->
    super

class Rows extends Base.Collection
  
  model: Row

  constructor: ->
    super

module.exports = Rows
