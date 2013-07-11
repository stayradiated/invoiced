
Base = require 'base'
require 'date-utils'

class Detail extends Base.Model

  defaults:
    clientId: -1
    invoiceId: 7300
    invoiceDate: new Date().toYMD()
    jobCustomer: ''
    jobSite: ''
    jobAmount: 0

  constructor: ->
    super

  getInvoiceDate: =>
    date = new Date(@invoiceDate)
    date.toFormat('DD MMMM YYYY')

  getDueDate: =>
    date = new Date(@invoiceDate)
    date.add( days: 7 )
    date.toFormat('DD MMMM YYYY')

  # Create our own custom exporter
  export: =>

    invoiceId: @invoiceId
    invoiceDate: @getInvoiceDate()
    invoiceDue: @getDueDate().toUpperCase()

    clientName: @client.name.toUpperCase()
    clientAddress: @client.address.toUpperCase()
    clientCity: @client.city.toUpperCase()
    clientPostcode: @client.postcode

    jobCustomer: @jobCustomer.toUpperCase()
    jobSite: @jobSite.toUpperCase()
    jobAmount: @jobAmount
    jobGst: @jobAmount * 0.15
    jobBeforeGst: @jobAmount - (@jobAmount * 0.15)


module.exports = Detail
