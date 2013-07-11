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
    
    '.client-name': 'clientName'
    '.client-address': 'clientAddress'
    '.client-city': 'clientCity'
    '.client-postcode': 'clientPostcode'

  events:
    'keyup input.search-box': 'queryChange'
    'change input.search-box': 'queryChange'
    'click .clients li': 'selectClient'
    'click .invoices li': 'selectInvoice'
    'click .invoices .new': 'createInvoice'
    'click .clients .new': 'toggleClient'
    'submit .client-details': 'createClient'

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
  
  # Render a list of clients to the dom
  renderClients: (clients) =>
    @clients.html @template.client.render
      clients: clients

  # Render a list of invoices to the dom
  renderInvoices: (invoices) =>
    @invoices.html @template.invoice.render(invoices: invoices)
  
  # Search the database for a client
  search: =>
    query = @input.val()

    # Search database
    @storage.searchClients(query).then (clients) =>
      
      # Get the amount of invoices for each client
      requests = for client in clients
        @storage.getClientInvoiceCount(client.id)
      
      # When all requests are finished
      When.all(requests).then (results) =>

        @temp.clients = {}

        # match count to client
        for client, i in clients
          client.count = results[i]
          @temp.clients[client.id] = client

        # Render clients
        @renderClients(clients)


  # Set the current client and display invoices
  selectClient: (e) =>

    # Mark element as active
    $el = $(e.currentTarget)
    @active.el.client?.removeClass('active')
    @active.el.client = $el.addClass('active')
    clientId = $el.data('id')
    @active.client = @temp.clients[clientId]

    # Load client invoices
    @storage.getClientInvoices(clientId).then (invoices) =>

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

    # Load invoice rows
    @storage.getRows(invoiceId).then (rows) =>

      # Namespace client and invoice
      invoice = @active.invoice
      client = @active.client

      # Create details
      details =
        clientId: client.id
        invoiceId: invoice.id
        invoiceDate: invoice.date.toYMD()
        jobSite: invoice.site
        jobCustomer: invoice.customer
        jobAmount: invoice.cost

      @trigger 'select:invoice', client, details, rows
      @hide()

  toggleClient: =>
    @el.toggleClass('show-sidebar')

  createClient: (e) =>
    e.preventDefault()
    client =
      name: @clientName.val()
      address: @clientAddress.val()
      city: @clientCity.val()
      postcode: @clientPostcode.val()
    @trigger 'create:client', client
    @search()

  createInvoice: =>
    @trigger 'create:invoice', @active.client
    @hide()

module.exports = Search
