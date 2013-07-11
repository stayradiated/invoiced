
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

module.exports = Client
