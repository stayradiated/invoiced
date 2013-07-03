
Base = require '../base.coffee'

window.Rows = require '../models/row.coffee'

class TableRow extends Base.Controller

  template: new Base.View

  elements:
    'input': 'input'

  events:
    'change input': 'update'

  constructor: ->
    super
    @template.load('table-row')

  update: (e) =>
    console.log 'updating model'
    @row.name = @input.val()
    console.log @row.toJSON()

  render: =>
    @template.render(@row)

module.exports = TableRow
