
Base = require 'base'
Invoice = require '../models/invoice'

class Details extends Base.View

  elements:
    '.invoice-id':       'input-id'
    '.invoice-date':     'input-date'
    '.invoice-site':     'input-site'
    '.invoice-cost':     'input-cost'
    '.invoice-email':    'input-email'
    '.invoice-labour':   'input-labour'
    '.invoice-customer': 'input-customer'
    '.invoice-airmover': 'input-airmover'

  events:
    'change input': 'update'

  constructor: ->
    super
    @model = new Invoice()
    @model.on 'refresh', @render

  # Detect input name and update model
  update: (e) =>
    name = @elements[ '.' + e.target.className][6..]
    value = e.target.value
    # Parse numbers
    if e.target.attributes.type.value is 'number'
      value = parseFloat(value, 10)
    @model[name] = value

  # Populate the input fields with model data
  render: =>
    for selector, name of @elements
      attrName = name[6..]
      @[name].val @model[attrName]
    return

module.exports = Details
