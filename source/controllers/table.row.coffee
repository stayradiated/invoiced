Base = require 'base'
Template = require '../libs/template'

window.Rows = require '../models/row'

class TableRow extends Base.View

  template: new Template('table.row')

  elements:
    'input': 'input'
    'label': 'number'

  events:
    'change input': 'setName'
    'click .delete': 'delete'
    'click .style': 'style'

  constructor: ->
    super
    @listen @row,
      'change:number', @updateNumber

  delete: =>
    @row.destroy()

  setName: (e) =>
    @row.name = @input.val()

  focus: =>
    @input.focus()

  updateNumber: (val) =>
    @number.html(val)

  render: =>
    @template.render(@row)

  style: =>
    switch @row.type
      when 'heading'
        type = 'number'
      when 'number'
        type = 'bullet'
      when 'bullet'
        type = 'heading'
      else return
    @row.type = type

module.exports = TableRow
