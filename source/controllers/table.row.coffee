
Base = require 'base'

window.Rows = require '../models/row'

class TableRow extends Base.Controller

  template: new Base.View('table.row')

  elements:
    'input': 'input'
    'label': 'number'

  events:
    'change input': 'setName'
    'click .delete': 'delete'

  constructor: ->
    super
    @row.on 'change:number', @updateNumber

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

module.exports = TableRow
