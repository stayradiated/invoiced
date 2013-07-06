
mysql = require 'mysql'

class Storage

  constructor: ->
    
    # Connect to database
    @db = mysql.createConnection
      host: '127.0.0.1'
      port: 8889
      user: 'nodejs'
      password: 'nodejs'
      database: 'invoicer'

    @db.connect()

  saveInvoice: (data) =>

    details = data.details

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

    @db.query 'INSERT INTO clients SET ?', client, ->
      console.log arguments

module.exports = Storage
