
Base = require '../base.coffee'
Detail = require '../models/detail.coffee'

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
    @model = new Detail()

  # Detect input name and update model
  update: (e) =>
    name = @elements[ '.' + e.target.className]
    value = e.target.value
    @model[name] = value

  # Populate the input fields with model data
  render: =>
    for selector, name of @elements
      @[name].val @model[name]
    return

module.exports = Details
