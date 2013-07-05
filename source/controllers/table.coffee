
Base = require '../libs/base'
$ = Base.$
TableRow = require '../controllers/table.row'
Rows = require '../models/row'

class Table extends Base.Controller

  elements:
    '.rows': 'table'

  events:
    'click .add-row': 'createRow'
    'keydown input': 'keydown'

  constructor: ->
    super
    @count = 1
    @rows = new Rows()
    @rows.on 'create:model', @addRow
    @rows.on 'destroy:model', @removeRow
    @rows.on 'change', @update
    @rows.on 'refresh', @render

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

  render: =>
    @table.empty()
    @rows.forEach (row) =>
      @addRow(row)

  # Instantiate a new Row
  createRow: (e) =>

    if e.target?

      # Identify which button was pressed
      # The last in the list is the default value
      types = ['bullet', 'heading', 'section', 'number']
      for type in types
        if e.target.classList.contains("row-#{type}")
          break

      details =
        name: ''
        type: type

    else

      details = e


    if details.type is 'number'
      details.number = @count++

    @rows.create(details)
  
  # Handle keyboard shortcuts
  keydown: (e) =>
    switch e.keyCode
      when 9 # tab
        $row = $(e.target).parent()
        if $row.is(':last-child')
          e.preventDefault()
          type = if $row.data('item').type is 'bullet' then 'bullet' else 'number'
          @createRow(type: type)
      when 38 # up
        $(e.target).parent().prev('li').find('input').focus()
      when 40 # down
        $(e.target).parent().next('li').find('input').focus()

module.exports = Table
