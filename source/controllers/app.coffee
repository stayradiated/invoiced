
fs = require 'fs'

Base = require 'base'

# Configure swig templates
Base.View.swig.init
  root: __dirname + '/../../../source/views'

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
    @storage.on 'error', (err, message) ->
      console.log 'Showing error window'
      console.log 'Error message:', message
    @storage.start()

    # Overwrite elements with controllers
    @table = new Table(el: @table)
    @details = new Details(el: @details)
    @snippets = new Snippets(el: @snippets)

    # Show search window
    @search = new Search
      el: @search
      storage: @storage

    @search.on 'select:invoice', @openInvoice
    
    # Display search page
    @search.search()

    # Compile word doc when user selects a file
    @file.on 'change', @saveFile

  generateButton: =>
    # Show file dialog
    @file.click()

  # Display a save file dialogue
  saveFile: (e) =>
    path = e.target.value
    extension = '.docx'
    if path[-5..] isnt extension
      path += extension
    @buildDoc(path)

  # Compile a word document and save it to `path`
  buildDoc: (path) =>
    details = @details.model.export()
    table = @table.rows.export()
    docx(path, details, table)

  toggle: =>
    @el.toggleClass('no-snippets')

  # Open an invoice
  openInvoice: (details, table) =>
    @details.model.refresh(details, true)
    @table.rows.refresh(table, true)

  # Save an invoice to the database
  saveInvoice: =>
    @storage.saveInvoice
      details: @details.model.toJSON()
      table: @table.rows.toJSON()

module.exports = App
