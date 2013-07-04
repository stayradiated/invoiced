
Base = require '../base.coffee'

class Row extends Base.Model

  defaults:
    name: 'A new row'
    number: 1

  constructor: ->
    super

class Rows extends Base.Collection
  
  model: Row

  constructor: ->
    super

module.exports = Rows
