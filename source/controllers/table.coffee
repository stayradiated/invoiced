
Base = require '../libs/base'
$ = Base.$
TableRow = require '../controllers/table.row'
Rows = require '../models/row'

class Table extends Base.Controller

  elements:
    '.rows': 'table'

  events:
    'click .add-row': 'createRow'
    'keydown input': 'move'

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
    view.focus()

  removeRow: (row) =>
    row.view.el.remove()

  update: =>
    @count = 1
    @rows.forEach (row) =>
      row.number = @count++

  # Instantiate a new Row
  createRow: =>
    @rows.create
      name: ''
      number: @count++
  
  # Move input focus up and down
  move: (e) =>
    switch e.keyCode
      when 38
        $(e.target).parent().prev('li').find('input').focus()
      when 40
        $(e.target).parent().next('li').find('input').focus()

module.exports = Table
