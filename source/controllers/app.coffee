
# NodeJS Dependencies
fs      = require 'fs'
swig    = require 'swig'
Base    = require 'base'
docx    = require '../libs/docx'
Storage = require '../libs/storage'


# Views
Table    = require '../controllers/table'
Search   = require '../controllers/search'
Header   = require '../controllers/header'
Details  = require '../controllers/details'
Clients  = require '../controllers/clients'
Snippets = require '../controllers/snippets'
CreateClient = require '../controllers/createClient'
Records = require '../controllers/records'

# Storage is global so it can be accessed from anywhere
storage = global.storage = new Storage()
storage.on 'error', (err, message) ->
  console.log 'Showing error window'
  console.log 'Error message:', message

class App extends Base.View

  ui:
    header:         'header'
    table:          '.table'
    search:         '.search'
    details:        '.details'
    snippets:       '.snippets'
    file:           '#save-file'
    clientDetails:  '.client-details'
    createClient:   '.create-client'
    records:        '.invoice-records'

  events:
    'click .toggle-sidebar': 'toggleSnippets'
    'click .toggle-create-client': 'toggleCreateClient'
    'click .show-records': 'showRecords'

  constructor: ->
    super

    # Load database connnection
    @storage = storage
    storage.start()

    # Overwrite elements with controllers
    @ui.table         = new Table(el: @ui.table)
    @ui.details       = new Details(el: @ui.details)
    @ui.clientDetails = new Clients(el: @ui.clientDetails)
    @ui.records       = new Records(el: @ui.records)

    # Show search window
    @setupSearch @ui.search

    # Creating a new Client
    @setupCreateClient @ui.createClient

    # Render snippets
    @setupSnippets @ui.snippets

    # Header pane buttons
    @setupHeader @ui.header

    # Display search page
    @ui.search.search()

    # Compile word doc when user selects a file
    @ui.file.on 'change', @saveFile


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
      client: @ui.clientDetails.model.export()
      invoice: @ui.details.model.export()
      rows: @ui.table.model.export()

  # }}}
  #
  # SNIPPETS
  # {{{

  setupSnippets: (el) =>
    @ui.snippets = new Snippets(el: el)
    model = @ui.snippets.model

    # Load snippets from database
    storage.getSnippets().then (array) =>
      model.refresh(array, true)

    model.on 'before:destroy:model', storage.deleteSnippet

    @ui.snippets.on 'save:snippet', storage.saveSnippet

    @ui.snippets.on 'load:snippet', (snippet) =>
      @ui.table.autoCreateRow(snippet.content)


  # }}}
  #
  # CLIENTS
  # {{{

  setupCreateClient: (el) =>
    console.log 'creating a new client', this
    @ui.createClient  = new CreateClient(el: el)
    @ui.createClient.on 'toggle', @toggleCreateClient
    @ui.createClient.on 'refresh', @ui.search.refresh

  # }}}
  #
  # TOGGLE
  # {{{

  toggleSnippets: =>
    @el.toggleClass('no-snippets')

  toggleCreateClient: =>
    @el.toggleClass('no-create-client')

  showRecords: =>
    @ui.records.show()

  # }}}
  #
  # HEADER
  # {{{

  setupHeader: (el) =>
    @ui.header = new Header
      el: el
      detect:
        details: @ui.details.model
        table: @ui.table.model

    @ui.header.on 'generate', => @ui.file.click()
    @ui.header.on 'open', => @ui.search.show()
    @ui.header.on 'create', @createInvoice

    # Don't overwrite olther invoices
    @ui.header.on 'save', =>
      if @ui.details.model.unsaved
        storage.invoiceExists(@ui.details.model.id).then (results) =>
          if results[0].count > 0
            window.alert 'An invoice already exists with that ID, please choose another one'
          else
            @saveInvoice()
      else
        @saveInvoice()


  # }}}
  #
  # SEARCH
  # {{{

  setupSearch: (el) =>
    @ui.search = new Search(el: el)
    @ui.search.on 'select:invoice', @openInvoice
    @ui.search.on 'create:client', @ui.createClient
    @ui.search.on 'create:invoice', @createInvoice


  # }}}
  #
  # INVOICES
  # {{{

  createInvoice: (client) =>
    client ?= @ui.clientDetails.model
    @ui.details.model.refresh({
      clientId: client.id
      customer: client.name
      site: client.address
    }, true)
    @ui.details.model.unsaved = true
    @ui.clientDetails.model.refresh(client, true)
    @ui.table.model.refresh({}, true)

  # Open an invoice
  openInvoice: (client, invoice, table) =>
    @ui.clientDetails.model.refresh(client, true)
    @ui.details.model.refresh(invoice, true)
    @ui.details.model.unsaved = false
    @ui.table.model.refresh(table, true)

  # Save an invoice to the database
  saveInvoice: =>
    storage.saveInvoice
      invoice: @ui.details.model.toJSON()
      rows: @ui.table.model.toJSON()
    @ui.details.model.unsaved = false
    @ui.header.resetStatus()

  # }}}
module.exports = App
