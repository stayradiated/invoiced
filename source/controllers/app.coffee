
fs = require 'fs'

Base = require '../libs/base'

Table = require '../controllers/table'
Details = require '../controllers/details'
Snippets = require '../controllers/snippets'

docx = require '../libs/docx'

class App extends Base.Controller

  elements:
    '.table': 'table'
    '.snippets': 'snippets'
    '.details': 'details'
    '#save-file': 'file'

  events:
    'click .generate': 'generateButton'
    'click .toggle-sidebar': 'toggle'

  constructor: ->
    super

    # Overwrite elements with controllers
    @table = new Table(el: @table)
    @details = new Details(el: @details)
    @snippets = new Snippets(el: @snippets)

    # Display data
    @details.render()
    
    # Build doc when user selects a file
    @file.on 'change', (e) =>
      path = e.target.value
      extension = '.docx'
      if path[-5..] isnt extension
        path += extension
      @buildDoc(path)

  generateButton: =>
    # Show file dialog
    @file.click()

  buildDoc: (path) =>
    details = @details.model.export()
    table = @table.rows.export()
    docx(path, details, table)

  toggle: =>
    @el.toggleClass('no-snippets')

  saveState: =>
    path = __dirname + '/../../data.json'
    data = JSON.stringify
      details: @details.model.toJSON()
      table: @table.rows.toJSON()
    fs.writeFile path, data, (err) ->
      console.log arguments
  
  # Load JSON and set model data
  importData: =>
    path = __dirname + '/../../data.json'
    fs.readFile path, (err, data) =>
      if err? then return console.error err
      data = JSON.parse data.toString()
      @details.model.refresh data.details
      @table.rows.refresh data.table
    return


module.exports = App
