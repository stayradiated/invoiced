
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

  saveInvoice(data) =>

    client = 
      name: data.details.clientName
      address: data.details.clientAddress
      city: data.details.clientCity
      postcode: data.details.clientPostcode

    invoice =
      id: data.details.invoiceId
      date: data.details.invoiceDate
      customer: data.details.jobCustomer
      site: data.details.jobSite
      cost: data.details.jobAmount
      paid: false

    @db.query 'INSERT INTO clients SET ?', client, ->
      console.log arguments

module.exports = Storage
