
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
    if window.confirm """Are you sure you want to create a new invoice?
      You will lose any unsaved changes to the current invoice."""
      @trigger('create')

  openInvoice: =>
    if window.confirm 'Are you sure? You will lose any unsaved changes to the current invoice.'
      @trigger('open')

  saveInvoice: =>
    @trigger('save')

module.exports = Header
