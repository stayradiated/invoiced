
Base = require 'base'
require 'date-utils'

class Row extends Base.Model

  defaults:
    name: ''
    number: 0
    type: 'number'

  constructor: ->
    super

  export: =>
    obj =
      name: @name
      number: @number
      type: @type
    switch @type
      when 'heading'
        obj.name = @name.toUpperCase()
      when 'section'
        obj.name = new Date(obj.name).toFormat('DD/MM/YYYY')
    return obj

class Rows extends Base.Collection
  
  model: Row

  constructor: ->
    super

  export: =>
    arr = []
    @forEach (record) ->
      arr.push record.export()
    return arr


module.exports = Rows
