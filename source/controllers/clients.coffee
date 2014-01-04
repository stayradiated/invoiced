
Base = require 'base'
Client = require '../models/client'

class Clients extends Base.View

  elements:
    '.client-name': 'name'
    '.client-address': 'address'
    '.client-city': 'city'
    '.client-postcode': 'postcode'

  events:
    'change input': 'update'
    'submit': 'submit'

  constructor: ->
    super
    @model = new Client()
    @model.on 'refresh', @render

  update: (e) =>
    name = @elements[ '.' + e.target.className]
    value = e.target.value
    @model[name] = value

  render: =>
    for selector, name of @elements
      @[name].html @model[name]
    return this

  submit: (e) =>
    e.preventDefault()

module.exports = Clients
