# Dependencies
require 'date-utils'
Base       = require 'base'
Detail     = require '../models/detail'
Client     = require '../models/client'
When       = require 'when'
When.delay = require 'when/delay'
_          = require 'underscore'
$          = require 'jqueryify'

class Search extends Base.Controller

  template:
    client: new Base.View('search.client')
    invoice: new Base.View('search.invoice')

  elements:
    'input.search-box': 'input'
    '.clients ul': 'clients'
    '.invoices ul': 'invoices'

  events:
    'keyup input.search-box': 'queryChange'
    'change input.search-box': 'queryChange'
    'click .clients li': 'selectClient'
    'click .invoices li': 'selectInvoice'
    'click .invoices .new': 'createInvoice'

  constructor: ->

    # Only run search when user stops typing
    @queryChange = _.debounce(@search, 250)

    # Bind events and cache elements
    super

    # Store temporary data loaded from the database
    @temp =
      clients: {}
      invoices: {}

    # Store state
    @active =
      client: null
      invoice: null
      el:
        client: null
        invoice: null

    # Showing and hiding the search window
    @shown = true
    @fadeout = 500 # milliseconds - get from search.scss


  #
  # SHOW/HIDE
  # {{{

  # Hide the search window
  hide: =>
    @shown = false
    @el.css opacity: 0
    When.delay(@fadeout).then =>
      @el.css 'display', 'none'
    return false

  # Show the search window
  show: =>
    @shown = true
    @el.css 'display', 'block'
    When.delay(1).then =>
      @el.css 'opacity', '1'
    return true
  
  # }}}
  #
  # RENDER
  # {{{
  
  # Render a list of clients to the dom
  renderClients: (clients) =>
    @clients.html @template.client.render
      clients: clients

  # Render a list of invoices to the dom
  renderInvoices: (invoices) =>
    @invoices.html @template.invoice.render
      invoices: invoices
  

  # }}}
  #
  # SEARCH
  # {{{

  # Search the database for a client
  search: =>
    query = @input.val()

    # Search database
    storage.searchClients(query).then (clients) =>
      
      # Get the amount of invoices for each client
      requests = for client in clients
        storage.getClientInvoiceCount(client.id)
      
      # When all requests are finished
      When.all(requests).then (results) =>

        @temp.clients = {}

        # match count to client
        for client, i in clients
          client.count = results[i]
          @temp.clients[client.id] = client

        # Render clients
        @renderClients(clients)


  # }}}
  #
  # SELECTING
  # {{{
  
  # Set the current client and display invoices
  selectClient: (e) =>

    # Mark element as active
    $el = $(e.currentTarget)
    @active.el.client?.removeClass('active')
    @active.el.client = $el.addClass('active')
    clientId = $el.data('id')
    @active.client = @temp.clients[clientId]

    # Load client invoices
    storage.getClientInvoices(clientId).then (invoices) =>

      # Cache invoices
      @temp.invoices = {}
      for invoice in invoices
        @temp.invoices[invoice.id] = invoice

      # Render inovices
      @renderInvoices(invoices)


  selectInvoice: (e) =>

    # Mark element as active
    $el = $(e.currentTarget)
    @active.el.invoice?.removeClass('active')
    @active.el.invoice = $el.addClass('active')
    
    # Get ID
    invoiceId = $el.data('id')
    @active.invoice = @temp.invoices[invoiceId]

    # Make sure the date stays as a string
    if @active.invoice.date instanceof Date
      @active.invoice.date = @active.invoice.date.toYMD()
    else
      console.log @active.invoice.date

    # Load invoice rows
    storage.getRows(invoiceId).then (rows) =>

      # Namespace client and invoice
      @trigger 'select:invoice', @active.client, @active.invoice, rows
      @hide()

  createInvoice: =>
    @trigger 'create:invoice', @active.client
    @hide()

module.exports = Search
