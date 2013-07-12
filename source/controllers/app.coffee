
fs = require 'fs'

Base = require 'base'

# Configure swig templates
Base.View.swig.init
  root: __dirname + '/../../../source/views'

Search = require '../controllers/search'
Table = require '../controllers/table'
Details = require '../controllers/details'
Snippets = require '../controllers/snippets'
Header = require '../controllers/header'
Clients = require '../controllers/clients'

docx = require '../libs/docx'
Storage = require '../libs/storage'

class App extends Base.Controller

  elements:
    'header':           'header'
    '.table':           'table'
    '.search':          'search'
    '.details':         'details'
    '.snippets':        'snippets'
    '#save-file':       'file'
    '.client-details':  'clientDetails'

  events:
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
    @header = new Header(el: @header)
    @clientDetails = new Clients(el: @clientDetails)


    # Render snippets
    @storage.getSnippets().then (array) =>
      @snippets.model.refresh(array, true)

    # Snippet events
    @snippets.model.on 'before:destroy:model', @storage.deleteSnippet
    @snippets.on 'load:snippet', @loadSnippet
    @snippets.on 'save:snippet', @storage.saveSnippet
    

    # Header pane buttons
    @header.on 'generate', => @file.click()
    @header.on 'save', @saveInvoice
    @header.on 'open', => @search.show()

    # Show search window
    @search = new Search
      el: @search
      storage: @storage

    @search.on 'select:invoice', @openInvoice
    @search.on 'create:client', @createClient
    @search.on 'create:invoice', @createInvoice
    
    # Display search page
    @search.search()

    # Compile word doc when user selects a file
    @file.on 'change', @saveFile

  # Display a save file dialogue
  saveFile: (e) =>
    path = e.target.value
    extension = '.docx'
    if path[-5..] isnt extension
      path += extension
    @buildDoc(path)

  # Compile a word document and save it to `path`
  buildDoc: (path) =>
    docx path,
      client: @clientDetails.model.export()
      invoice: @details.model.export()
      rows: @table.model.export()

  loadSnippet: (snippet) =>
    @table.autoCreateRow(snippet.content)

  toggle: =>
    @el.toggleClass('no-snippets')

  createClient: (client) =>
    @storage.saveClient(client)

  createInvoice: (client) =>
    @clientDetails.model.refresh(client, true)
    @details.model.refresh({
      clientId: client.id
    }, true)
    @table.model.refresh({}, true)

  # Open an invoice
  openInvoice: (client, invoice, table) =>
    @clientDetails.model.refresh(client, true)
    @details.model.refresh(invoice, true)
    @table.model.refresh(table, true)

  # Save an invoice to the database
  saveInvoice: =>
    @storage.saveInvoice
      invoice: @details.model.toJSON()
      rows: @table.model.toJSON()

module.exports = App
