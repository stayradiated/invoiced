
Base = require '../base.coffee'
Day = require '../libs/date.coffee'

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
    jobAmount: ''

  constructor: ->
    super

module.exports = Detail
