
Base = require '../libs/base'

class Row extends Base.Model

  defaults:
    name: ''
    number: 0

  constructor: ->
    super
    console.log @toJSON()

class Rows extends Base.Collection
  
  model: Row

  constructor: ->
    super

module.exports = Rows
