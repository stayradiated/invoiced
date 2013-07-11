
Base = require 'base'
require 'date-utils'

class Invoice extends Base.Model

  defaults:
    id: 7300
    clientId: -1
    date: new Date().toYMD()
    customer: ''
    site: ''
    cost: 0
    paid: 0

  constructor: ->
    super

  invoiceDate: =>
    date = new Date(@date)
    date.toFormat('DD MMMM YYYY')

  invoiceDueDate: =>
    date = new Date(@date)
    date.add(days: 7)
    date.toFormat('DD MMMM YYYY')

  # Create our own custom exporter
  export: =>
    invoiceId: @id
    invoiceDate: @invoiceDate()
    invoiceDue: @invoiceDueDate().toUpperCase()
    jobCustomer: @customer.toUpperCase()
    jobSite: @site.toUpperCase()
    jobAmount: @cost
    jobGst: Math.floor(@cost * 0.15 * 100) / 100
    jobBeforeGst: Math.floor((@cost - (@cost * 0.15)) * 100) / 100


module.exports = Invoice
