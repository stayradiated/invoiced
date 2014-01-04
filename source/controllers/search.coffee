# Dependencies
require 'date-utils'
Base       = require 'base'
Detail     = require '../models/detail'
Client     = require '../models/client'
Template   = require '../libs/template'
When       = require 'when'
When.delay = require 'when/delay'
_          = require 'underscore'
$          = require 'jqueryify'

class Search extends Base.View

  template:
    client: new Template('search.client')
    invoice: new Template('search.invoice')

  ui:
    input:     'input.search-box'
    clients:   '.clients ul'
    invoices:  '.invoices ul'

  events:
    'keyup input.search-box': 'queryChange'
    'change input.search-box': 'queryChange'
    'click .clients li': 'selectClient'
    'click .invoices li': 'selectInvoice'
    'click .invoices .new': 'createInvoice'
    'click .clients .delete': 'toggleDeleteMode'

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
    @ui.clients.html @template.client.render
      clients: clients

  # Render a list of invoices to the dom
  renderInvoices: (invoices) =>
    @ui.invoices.html @template.invoice.render
      invoices: invoices


  # }}}
  #
  # SEARCH
  # {{{

  refresh: =>
    @ui.input.val ''
    @search()


  # Search the database for a client
  search: =>
    query = @ui.input.val()

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

  toggleDeleteMode: =>
    @deleteClientMode = !@deleteClientMode
    @el.toggleClass 'delete-mode', @deleteClientMode


  # Set the current client and display invoices
  selectClient: (e) =>

    $el = $(e.currentTarget)
    clientId = $el.data('id')

    if @deleteClientMode
      if @temp.clients[clientId].count > 0
        return window.alert 'Sorry, you must delete all the clients invoices first'
      if window.confirm 'Are you sure you want to delete that client?'
        $el.remove()
        storage.deleteClient(clientId)
      return

    # Mark element as active
    @active.el.client?.removeClass('active')
    @active.el.client = $el.addClass('active')
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

    $el = $(e.currentTarget)
    invoiceId = $el.data('id')

    if @deleteClientMode
      if window.confirm 'Are you sure you want to delete that invoice?'
        $el.remove()
        storage.deleteInvoice(invoiceId)
        @temp.clients[@temp.invoices[invoiceId].clientId].count -= 1
      return

    # Mark element as active
    @active.el.invoice?.removeClass('active')
    @active.el.invoice = $el.addClass('active')

    # Get ID
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
