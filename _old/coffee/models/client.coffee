
Base = require 'base'

class Client extends Base.Model

  defaults:
    id: null
    name: ''
    address: ''
    city: ''
    postcode: ''

  constructor: ->
    super

  export: =>
    clientName: @name.toUpperCase()
    clientAddress: @address.toUpperCase()
    clientCity: @city.toUpperCase()
    clientPostcode: @postcode

module.exports = Client
