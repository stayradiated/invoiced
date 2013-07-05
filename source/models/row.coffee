
Base = require '../libs/base'
require 'date-utils'

class Row extends Base.Model

  defaults:
    name: ''
    number: 0
    type: 'number'

  constructor: ->
    super

  toJSON: =>
    obj =
      name: @name
      number: @number
      type: @type
    if @type is 'section'
      obj.name = new Date(obj.name).toFormat('DD/MM/YYYY')
    return obj

class Rows extends Base.Collection
  
  model: Row

  constructor: ->
    super

module.exports = Rows
