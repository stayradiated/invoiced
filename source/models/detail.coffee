
Base = require '../libs/base'
Day = require '../libs/date'

class Detail extends Base.Model

  defaults:
    invoiceId: 0
    invoiceDate: new Day().toString()
    clientName: ''
    clientAddress: ''
    clientCity: ''
    clientPostcode: ''
    jobCustomer: ''
    jobSite: ''
    jobAmount: 0

  constructor: ->
    super

  # Create our own custom exporter
  toJSON: =>
    invoiceId: @invoiceId
    invoiceDate: @invoiceDate
    clientName: @clientName.toUpperCase()
    clientAddress: @clientAddress.toUpperCase()
    clientCity: @clientCity.toUpperCase()
    clientPostcode: @clientPostcode
    jobCustomer: @jobCustomer.toUpperCase()
    jobSite: @jobSite.toUpperCase()
    jobAmount: @jobAmount
    jobGst: @jobAmount * 0.15
    jobBeforeGst: @jobAmount - (@jobAmount * 0.15)


module.exports = Detail
