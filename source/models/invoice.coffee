
Base = require 'base'
require 'date-utils'

# Convert a number into a currencly
digits = (number) ->
  number = (Math.round(number * 100) / 100).toString()
  sections = number.split('.')
  if sections.length is 1 then return number + '.00'
  if sections[1].length is 1 then return number + '0'
  if sections[1].length is 2 then return number
  if sections[1].length >  2 then return sections[0] + '.' + sections[1][0..1]

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

  customerName: =>
    match = @customer.match(/^[a-z]\.\s/i)
    match ?= ['']
    return [match[0][0..-1], @customer[match[0].length..]]

  invoiceDate: =>
    date = new Date(@date)
    date.toFormat('DD MMMM YYYY')

  invoiceDueDate: =>
    date = new Date(@date)
    date.add(days: 7)
    date.toFormat('DD MMMM YYYY')

  # Create our own custom exporter
  export: =>
    initial: @customerName()[0].toUpperCase()
    invoiceId: @id
    invoiceDate: @invoiceDate()
    invoiceDue: @invoiceDueDate().toUpperCase()
    jobCustomer: @customerName()[1].toUpperCase()
    jobSite: @site.toUpperCase()
    jobAmount: digits(@cost)
    jobGst: digits(@cost * 0.15)
    jobBeforeGst: digits(@cost - (@cost * 0.15))


module.exports = Invoice
