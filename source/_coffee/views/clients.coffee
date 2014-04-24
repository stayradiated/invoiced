
Base = require 'base'
Client = require '../models/client'

class Clients extends Base.View

  ui:
    name: '.client-name'
    address: '.client-address'
    city: '.client-city'
    postcode: '.client-postcode'

  events:
    'change input': 'update'
    'submit': 'submit'

  constructor: ->
    super
    @model = new Client()
    @model.on 'refresh', @render
    for name, el of @ui
      el.itemName = name

  update: (e) =>
    el = e.target
    name = el.itemName
    value = el.value
    @model[name] = value

  render: =>
    for name of @elements
      @[name].html @model[name]
    return this

  submit: (e) =>
    e.preventDefault()

module.exports = Clients
