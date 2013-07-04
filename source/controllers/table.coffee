
Base = require '../base.coffee'
TableRow = require '../controllers/table.row.coffee'
Rows = require '../models/row.coffee'

class Table extends Base.Controller

  elements:
    '.rows': 'table'

  events:
    'click .add-row': 'createRow'

  constructor: ->
    super
    @count = 1
    @rows = new Rows()
    @rows.on 'create:model', @addRow
    @rows.on 'destroy:model', @removeRow
    @rows.on 'change', @update
  
  # Create a new TableRow and append it to the table
  addRow: (row) =>
    view = row.view = new TableRow(row: row)
    view.el = $ view.render()
    @table.append view.el
    view._bind()

  removeRow: (row) =>
    console.log 'removing row from table'
    row.view.el.remove()

  update: =>
    @count = 1
    @rows.forEach (row) =>
      row.number = @count++

  # Instantiate a new Row
  createRow: =>
    @rows.create
      name: 'custom name'
      number: @count++

module.exports = Table
