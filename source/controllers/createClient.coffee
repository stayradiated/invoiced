
Base = require 'base'

class CreateClient extends Base.Controller

  elements:
    '.client-name': 'name'
    '.client-address': 'address'
    '.client-city': 'city'
    '.client-postcode': 'postcode'

  events:
    'submit .create-client-details': 'createClient'

  constructor: ->
    super
    @city.val 'Rotorua'

  clear: ->
    for selector, name of @elements
      @[name].val ''
    @city.val 'Rotorua'

  # Create a new client
  createClient: (e) =>
    e.preventDefault()

    valid = true

    for selector, name of @elements
      if @[name].val() is '' then valid = false

    return unless valid

    client =
      name:     @name.val()
      city:     @city.val()
      address:  @address.val()
      postcode: @postcode.val()
    
    storage.saveClient(client).then =>
      @clear()
      @trigger 'toggle'
      @trigger 'refresh'

module.exports = CreateClient
