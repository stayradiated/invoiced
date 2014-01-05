
Base = require 'base'
Invoice = require '../models/invoice'

class Details extends Base.View

  ui:
    id: '.invoice-id'
    date: '.invoice-date'
    site: '.invoice-site'
    cost: '.invoice-cost'
    email: '.invoice-email'
    labour: '.invoice-labour'
    customer: '.invoice-customer'
    airmover: '.invoice-airmover'

  events:
    'change input': 'update'

  constructor: ->
    super
    @model = new Invoice()
    @model.on 'refresh', @render
    for name, el of @ui
      el.itemName = name

  # Detect input name and update model
  update: (e) =>
    el = e.target
    name = el.itemName
    value = el.value
    # Parse numbers
    if el.attributes.type.value is 'number'
      value = parseFloat(value, 10) or 0
    @model[name] = value

  # Populate the input fields with model data
  render: =>
    for name of @ui
      @ui[name].val @model[name]
    return

module.exports = Details
