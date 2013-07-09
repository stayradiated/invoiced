
Base = require 'base'

class Header extends Base.Controller

  constructor: ->
    super

  events:
    'click .button-generate': 'generate'
    'click .button-new': 'createInvoice'
    'click .button-open': 'openInvoice'
    'click .button-save': 'saveInvoice'
  
  generate: =>
    @trigger('generate')

  createInvoice: =>
    @trigger('create')

  openInvoice: =>
    @trigger('open')

  saveInvoice: =>
    @trigger('save')

module.exports = Header
