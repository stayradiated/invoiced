
fs = require 'fs'

Base = require '../libs/base'

Search = require '../controllers/search'
Table = require '../controllers/table'
Details = require '../controllers/details'
Snippets = require '../controllers/snippets'

docx = require '../libs/docx'
Storage = require '../libs/storage'

class App extends Base.Controller

  elements:
    '.search': 'search'
    '.table': 'table'
    '.snippets': 'snippets'
    '.details': 'details'
    '#save-file': 'file'

  events:
    'click .generate': 'generateButton'
    'click .toggle-sidebar': 'toggle'

  constructor: ->
    super

    # Load database connnection
    @storage = new Storage()

    # Overwrite elements with controllers
    @table = new Table(el: @table)
    @details = new Details(el: @details)
    @snippets = new Snippets(el: @snippets)

    @search = new Search
      el: @search
      storage: @storage

    # Display default dat
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
    @storage.saveInvoice
      details: @details.model.toJSON()
      table: @table.rows.toJSON()
  
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
