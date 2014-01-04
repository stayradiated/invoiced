
Base = require 'base'

class Header extends Base.View

  elements:
    '.button-save': 'saveButton'

  events:
    'click .button-generate': 'generate'
    'click .button-new': 'createInvoice'
    'click .button-open': 'openInvoice'
    'click .button-save': 'saveInvoice'

  constructor: ->
    super

    @detect.details.on 'change', @markChanged
    @detect.table.on 'create:model change:model destroy:model', @markChanged
    @detect.details.on 'refresh', @resetStatus
    @pending = false

  markChanged: =>
    @pending = true
    @saveButton.addClass('pending')

  resetStatus: =>
    @pending = false
    @saveButton.removeClass('pending')

  generate: =>
    @trigger('generate')

  createInvoice: =>
    if not @pending or window.confirm """Are you sure you want to create a new invoice?
      You will lose any unsaved changes to the current invoice."""
      @trigger('create')

  openInvoice: =>
    if not @pending or window.confirm 'Are you sure? You will lose any unsaved changes to the current invoice.'
      @trigger('open')

  saveInvoice: =>
    @trigger('save')

module.exports = Header
