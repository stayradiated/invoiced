
# NodeJS Dependencies
fs      = require 'fs'
Base    = require 'base'
docx    = require '../libs/docx'
Storage = require '../libs/storage'

# Configure swig templates
Base.View.swig.init
  root: __dirname + '/../../../source/views'

# Controllers
Table    = require '../controllers/table'
Search   = require '../controllers/search'
Header   = require '../controllers/header'
Details  = require '../controllers/details'
Clients  = require '../controllers/clients'
Snippets = require '../controllers/snippets'
CreateClient = require '../controllers/createClient'

# Storage is global so it can be accessed from anywhere
storage = global.storage = new Storage()
storage.on 'error', (err, message) ->
  console.log 'Showing error window'
  console.log 'Error message:', message

class App extends Base.Controller

  elements:
    'header':          'header'
    '.table':          'table'
    '.search':         'search'
    '.details':        'details'
    '.snippets':       'snippets'
    '#save-file':      'file'
    '.client-details': 'clientDetails'
    '.create-client':  'createClient'

  events:
    'click .toggle-sidebar': 'toggleSnippets'
    'click .toggle-create-client': 'toggleCreateClient'

  constructor: ->
    super

    # Load database connnection
    @storage = storage
    storage.start()

    # Overwrite elements with controllers
    @table         = new Table(el: @table)
    @details       = new Details(el: @details)
    @clientDetails = new Clients(el: @clientDetails)
    
    # Creating a new Client
    @setupCreateClient @createClient

    # Render snippets
    @setupSnippets @snippets

    # Header pane buttons
    @setupHeader @header

    # Show search window
    @setupSearch @search
    
    # Display search page
    @search.search()

    # Compile word doc when user selects a file
    @file.on 'change', @saveFile


  #
  # GENERATING WORD FILES
  # {{{

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

  # }}}
  #
  # SNIPPETS
  # {{{

  setupSnippets: (el) =>
    @snippets = new Snippets(el: el)
    model = @snippets.model
    
    # Load snippets from database
    storage.getSnippets().then (array) =>
      model.refresh(array, true)

    model.on 'before:destroy:model', storage.deleteSnippet

    @snippets.on 'save:snippet', storage.saveSnippet

    @snippets.on 'load:snippet', (snippet) =>
      @table.autoCreateRow(snippet.content)


  # }}}
  #
  # CLIENTS
  # {{{

  setupCreateClient: (el) =>
    @createClient  = new CreateClient(el: el)
    @createClient.on 'toggle', @toggleCreateClient

  # }}}
  #
  # TOGGLE
  # {{{
  
  toggleSnippets: =>
    @el.toggleClass('no-snippets')

  toggleCreateClient: =>
    @el.toggleClass('no-create-client')

  # }}}
  #
  # HEADER
  # {{{

  setupHeader: (el) =>
    @header = new Header
      el: el
      detect:
        details: @details.model
        table: @table.model

    @header.on 'generate', => @file.click()
    @header.on 'save', @saveInvoice
    @header.on 'open', => @search.show()
    @header.on 'create', @createInvoice


  # }}}
  #
  # SEARCH
  # {{{

  setupSearch: (el) =>
    @search = new Search(el: el)
    @search.on 'select:invoice', @openInvoice
    @search.on 'create:client', @createClient
    @search.on 'create:invoice', @createInvoice


  # }}}
  #
  # INVOICES
  # {{{
  
  createInvoice: (client) =>
    client ?= @clientDetails.model
    @details.model.refresh({
      clientId: client.id
      customer: client.name
      site: client.address
    }, true)
    @clientDetails.model.refresh(client, true)
    @table.model.refresh({}, true)

  # Open an invoice
  openInvoice: (client, invoice, table) =>
    @clientDetails.model.refresh(client, true)
    @details.model.refresh(invoice, true)
    @table.model.refresh(table, true)

  # Save an invoice to the database
  saveInvoice: =>
    storage.saveInvoice
      invoice: @details.model.toJSON()
      rows: @table.model.toJSON()
    @header.resetStatus()

  # }}}
module.exports = App
