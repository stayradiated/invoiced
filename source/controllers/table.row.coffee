
Base = require '../base.coffee'

window.Rows = require '../models/row.coffee'

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

  updateNumber: (val) =>
    @number.html(val)

  render: =>
    @template.render(@row)

module.exports = TableRow
