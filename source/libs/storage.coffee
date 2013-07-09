
Base = require 'base'
mysql = require 'mysql'
When = require 'when'

class Storage extends Base.Event

  constructor: ->
    super

    # Connect to database
    @db = mysql.createConnection
      host: '127.0.0.1'
      user: 'nodejs'
      password: 'nodejs'
      database: 'invoicer'

  start: =>

    @db.connect (err) =>
      if err
        @trigger('error', err, 'Could not connect to database')
      else
        @trigger('connected')

  # Close the connection to the database
  end: =>
    @db.end()

  escape: (text) ->
    text.replace(/(['"!?\.])/, '\\$1')

  _query: (args...) =>
    deferred = When.defer()
    args.push (err, results) ->
      if err
        console.error(err)
        return deferred.reject(err)
      deferred.resolve(results)
    @db.query(args...)
    return deferred.promise

  # Save the details and table objects into a MySQL database
  saveInvoice: ({details, table}) =>

    client =
      name:      details.clientName
      address:   details.clientAddress
      city:      details.clientCity
      postcode:  details.clientPostcode

    invoice =
      id:        details.invoiceId
      date:      details.invoiceDate
      customer:  details.jobCustomer
      site:      details.jobSite
      cost:      details.jobAmount
      paid:      false

    rowKey =
      invoiceId: details.invoiceId

    @_query('INSERT INTO clients SET ?', client).then (result) =>
      invoice.clientId = result.insertId
      @_query('INSERT INTO invoices SET ?', invoice)

    for row in table
      @_query('INSERT INTO rows SET ?', row).then (result) =>
        rowKey.rowId = result.insertId
        @_query('INSERT INTO tables SET ?', rowKey)

  # Get an array of all clients from the database
  getClients: =>
    @_query 'SELECT * FROM clients'

  # Search all clients
  searchClients: (query) =>
    query = @escape query
    @_query """SELECT * FROM clients WHERE
      name LIKE '%#{query}%' OR
      address LIKE '%#{query}%' OR
      city LIKE '%#{query}%' OR
      postcode LIKE '%#{query}%'"""

  # Get a single client
  getClient: (id) =>
    @_query 'SELECT * FROM clients WHERE id=?', id

  # Get an array of all invoices from the database
  getInvoices: =>
    @_query 'SELECT * FROM invoices'

  # Get an array of all invoices for a specified client
  getClientInvoices: (clientId) =>
    @_query 'SELECT * FROM invoices WHERE clientId=?', clientId

  # Get the number of invoices attached to the clientId
  getClientInvoiceCount: (clientId) =>
    deferred = When.defer()
    @_query('SELECT COUNT(id) FROM invoices WHERE clientId=?', clientId).then (results) ->
      deferred.resolve results[0]['COUNT(id)']
    return deferred.promise

  # Get a single invoice
  getInvoice: (id) =>
    @_query 'SELECT * FROM invoices WHERE id=?', id

  # Get all table rows in an invoice
  getRows: (invoiceId) =>
    @_query """SELECT rows.* FROM tables
      INNER JOIN rows ON tables.rowId=rows.id
      WHERE invoiceId=?""", invoiceId

module.exports = Storage
