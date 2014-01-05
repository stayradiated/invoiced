Base = require 'base'
Template = require '../libs/template'

window.Rows = require '../models/row'

class TableRow extends Base.View

  template: new Template('table.row')

  ui:
    input: 'input'
    number: 'label'

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
    @row.name = @ui.input.val()

  focus: =>
    @ui.input.focus()

  updateNumber: (val) =>
    @ui.number.html(val)

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
