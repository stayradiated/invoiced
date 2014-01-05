
Base = require 'base'

class CreateClient extends Base.View

  ui:
    name: '.client-name'
    address: '.client-address'
    city: '.client-city'
    postcode: '.client-postcode'

  events:
    'submit .create-client-details': 'createClient'

  constructor: ->
    super
    @ui.city.val 'Rotorua'

  clear: ->
    for name, el of @ui when not 'city'
      el.val ''
    @ui.city.val 'Rotorua'

  # Create a new client
  createClient: (e) =>
    e.preventDefault()

    valid = true

    for selector, name of @elements
      if @[name].val() is '' then valid = false

    return unless valid

    client =
      name:     @ui.name.val()
      city:     @ui.city.val()
      address:  @ui.address.val()
      postcode: @ui.postcode.val()

    storage.saveClient(client).then =>
      @clear()
      @trigger 'toggle'
      @trigger 'refresh'

module.exports = CreateClient
