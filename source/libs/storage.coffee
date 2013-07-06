
Base = require '../libs/base'
mysql = require 'mysql'

class Storage extends Base.Event

  constructor: ->
    super

    # Connect to database
    @db = mysql.createConnection
      host: '127.0.0.1'
      # port: 8889
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

    @db.query 'INSERT INTO clients SET ?', client, (err, result) =>
      if err then console.error(err)
      invoice.clientId = result.insertId

      @db.query 'INSERT INTO invoices SET ?', invoice, (err, result) =>
        if err then console.error(err)

    for row in table

      @db.query 'INSERT INTO rows SET ?', row, (err, result) =>
        if err then console.error(err)
        rowKey.rowId = result.insertId

        @db.query 'INSERT INTO tables SET ?', rowKey, (err, result) =>
          if err then console.error(err)


  # Get an array of all clients from the database
  getClients: (fn) =>
    @db.query 'SELECT * FROM clients', fn

  # Search all clients
  searchClients: (query, fn) =>
    @db.query """SELECT * FROM clients WHERE
      name LIKE '%#{query}%' OR
      address LIKE '%#{query}%' OR
      city LIKE '%#{query}%' OR
      postcode LIKE '%#{query}%'""", fn

  # Get a single client
  getClient: (id, fn) =>
    @db.query 'SELECT * FROM clients WHERE id=?', id, fn

  # Get an array of all invoices from the database
  getInvoices: =>
    @db.query 'SELECT * FROM invoices', fn

  # Get a single invoice
  getInvoice: (id, fn) =>
    @db.query 'SELECT * FROM invoices WHERE id=?', id, fn

  # Get all table rows in an invoice
  getRows: (invoiceId, fn) =>
    @db.query 'SELECT rows.* FROM tables INNER JOIN rows ON tables.rowId=rows.id WHERE invoiceId=?', invoiceId, fn

module.exports = Storage
