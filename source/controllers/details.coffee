
Base = require '../base.coffee'

class Details extends Base.Controller

  elements:
    '.invoice-id': 'invoiceId'
    '.invoice-date': 'invoiceDate'

    '.client-name': 'clientName'
    '.client-address': 'clientAddress'
    '.client-city': 'clientCity'
    '.client-postcode': 'clientPostcode'

    '.job-customer': 'jobCustomer'
    '.job-site': 'jobSite'
    '.job-amount': 'jobAmount'

  events:
    'change input': 'update'

  constructor: ->
    super

  update: (e) =>
    name = @elements[ '.' + e.target.className]
    value = e.target.value

module.exports = Details
