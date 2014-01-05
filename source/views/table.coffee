Base = require 'base'
$ = require 'jqueryify'
TableRow = require '../views/table.row'
Row = require '../models/row'

class Table extends Base.View

  ui:
    table: '.rows'

  events:
    'click .add-row': 'createRow'
    'keydown input': 'keydown'

  constructor: ->
    super
    @count = 1
    @model = new Row()
    @model.on 'create:model', @addRow
    @model.on 'destroy:model', @removeRow
    @model.on 'change:model', @updateRow
    @model.on 'change', @update
    @model.on 'refresh', @render

    # Base uses a different version of jQuery
    $(@ui.table).sortable
      axis: 'y'
      handle: '.handle'
      items: 'li'
      stop: (e, ui) =>
        row = ui.item.data('item')
        index = ui.item.index()
        @model.move(row, index)


  # Create a new TableRow and append it to the table
  addRow: (row, opts={}) =>
    view = row.view = new TableRow(row: row)
    view.el = $ view.render()
    view.el.data('item', row)
    if opts.pos is 0
      @ui.table.find("li:eq(#{opts.pos})").before view.el
    else if opts.pos > 0
      @ui.table.find("li:eq(#{opts.pos-1})").after view.el
    else
      @ui.table.append view.el
    view.bind()
    view.focus() unless opts.nofocus

  removeRow: (row) =>
    row.view.el.remove()

  updateRow: (row, value, key) =>
    if value is 'type'
      index = row.view.el.index()
      row.view.unlisten()
      row.view.unbind()
      row.view.el.remove()
      @addRow(row, nofocus: true, pos: index)
      @update()

  update: =>
    @count = 1
    @model.forEach (row) =>
      if row.type is 'number'
        row.number = @count++

  render: =>
    @ui.table.empty()
    @model.forEach (row) =>
      @addRow(row, nofocus: true)

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

    @model.create(details)

  # Create a new row with the correct type
  autoCreateRow: (content='') =>
    lastRow = @ui.table.find('li:last')
    if lastRow.length > 0
      type = if lastRow.data('item').type is 'bullet' then 'bullet' else 'number'
    else
      type = 'number'
    @createRow(type: type, name: content)


  # Handle keyboard shortcuts
  keydown: (e) =>
    switch e.keyCode
      when 9 # tab
        return if e.shiftKey
        if $(e.target).parent().is(':last-child')
          e.preventDefault()
          @autoCreateRow()
      when 38 # up
        $(e.target).parent().prev('li').find('input').focus()
      when 40 # down
        $(e.target).parent().next('li').find('input').focus()

module.exports = Table
