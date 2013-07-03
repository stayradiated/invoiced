
Base = require '../base.coffee'
TableRow = require '../controllers/table.row.coffee'
Row = require '../models/row.coffee'

class Table extends Base.Controller

  elements:
    '.rows': 'rows'

  events:
    'click .add-row': 'createRow'
    'click .add-section': 'createSection'

  constructor: ->
    super
    Row.on 'create', @addRow

  addRow: (row) =>
    view = new TableRow(row: row)
    $el = $ view.render()
    @rows.append $el
    console.log 'binding element'
    view._bind $el

  createRow: =>
    console.log 'creating row'
    Row.create name: 'custom name'

  createSection: =>
    console.log 'creating section'

module.exports = Table
