
Base = require '../libs/base'

window.Rows = require '../models/row'

class TableRow extends Base.Controller

  template: new Base.View

  elements:
    'input': 'input'
    'label': 'number'

  events:
    'change input': 'setName'

  constructor: ->
    super
    @template.load('table-row')
    @row.on 'change:number', @updateNumber

  setName: (e) =>
    @row.name = @input.val()

  focus: =>
    @input.focus()

  updateNumber: (val) =>
    @number.html(val)

  render: =>
    @template.render(@row)

module.exports = TableRow
