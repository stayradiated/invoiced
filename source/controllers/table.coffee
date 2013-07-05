
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

    @table.sortable
      axis: 'y'
      handle: '.handle'
      items: 'li'
      stop: (e, ui) =>
        row = ui.item.data('item')
        index = ui.item.index()
        @rows.move(row, index)

  
  # Create a new TableRow and append it to the table
  addRow: (row) =>
    view = row.view = new TableRow(row: row)
    view.el = $ view.render()
    view.el.data('item', row)
    @table.append view.el
    view._bind()
    view.focus()

  removeRow: (row) =>
    row.view.el.remove()

  update: =>
    @count = 1
    @rows.forEach (row) =>
      if row.type is 'number'
        row.number = @count++

  # Instantiate a new Row
  createRow: (e) =>

    # Identify which button was pressed
    # The last in the list is the default value
    types = ['bullet', 'heading', 'section', 'number']
    for type in types
      if e?.target.classList.contains("row-#{type}")
        break

    details =
      name: ''
      type: type

    if type is 'number'
      details.number = @count++

    @rows.create(details)
  
  # Move input focus up and down
  move: (e) =>
    switch e.keyCode
      when 38
        $(e.target).parent().prev('li').find('input').focus()
      when 40
        $(e.target).parent().next('li').find('input').focus()

module.exports = Table
