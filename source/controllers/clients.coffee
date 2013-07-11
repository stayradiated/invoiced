
Base = require 'base'
Client = require '../models/client'

class Clients extends Base.Controller

  elements:
    '.client-name': 'name'
    '.client-address': 'address'
    '.client-city': 'city'
    '.client-postcode': 'postcode'

  events:
    'change input': 'update'

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
      @[name].val @model[name]
    return this

module.exports = Clients
