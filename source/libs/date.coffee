
# A collection of date related functions

class Day

  constructor: ->
    @now = new Date()

  year: ->
    @now.getFullYear()

  month: ->
    (@now.getMonth() + 1).toString().replace(/^(\d)$/, '0$1')


  day: ->
    @now.getDate().toString().replace(/^(\d)$/, '0$1')

  toString: =>
    "#{@year()}-#{@month()}-#{@day()}"


module.exports = Day
