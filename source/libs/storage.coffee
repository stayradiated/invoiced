
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

  escape: (text) =>
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

    invoice =
      clientId:    details.clientId
      id:          details.invoiceId
      date:        details.invoiceDate
      customer:    details.jobCustomer
      site:        details.jobSite
      cost:        details.jobAmount
      paid:        false
      dateUpdated: (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS')

    console.log invoice

    query =
      invoice: 'INSERT INTO invoices SET ? ON DUPLICATE KEY UPDATE ?'
      row: 'INSERT INTO rows SET ? ON DUPLICATE KEY UPDATE ?'
      empty: 'DELETE FROM rows WHERE invoiceId=?'
      
    # Update client details
    @_query(query.invoice, [invoice, invoice])
    
    # Delete existing rows
    @_query(query.empty, details.invoiceId)
    
    # Insert rows into database
    for row in table
      row.invoiceId = details.invoiceId
      @_query(query.row, [row, row])

  # Get an array of all clients from the database
  getClients: =>
    @_query 'SELECT * FROM clients'

  # Search all clients
  searchClients: (query) =>
    console.log 'searching for', query
    query = @escape query
    @_query """SELECT * FROM clients WHERE
      name LIKE '%#{query}%' OR
      address LIKE '%#{query}%' OR
      city LIKE '%#{query}%' OR
      postcode LIKE '%#{query}%'"""

  # Get a single client
  getClient: (id) =>
    @_query 'SELECT * FROM clients WHERE id=?', id

  saveClient: (client) =>
    client.dateUpdated = (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS')
    sql = 'INSERT INTO clients SET ? ON DUPLICATE KEY UPDATE ?'
    @_query sql, [client, client]

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
    @_query "SELECT * FROM rows WHERE invoiceId=?", invoiceId

module.exports = Storage
