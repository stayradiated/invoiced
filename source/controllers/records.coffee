
Base = require 'base'

class Records extends Base.Controller

  template:
    missing: new Base.View('record.missing')
    record: new Base.View('record')

  elements:
    '.table-body': 'table'

  events:
    'click .hide': 'hide'
    'click .toggle-missing': 'toggleMissing'

  constructor: ->
    super
    @showMissing = false

  show: =>
    @render()
    @el.show()
    
  hide: =>
    @el.hide()

  toggleMissing: =>
    @showMissing = !@showMissing
    @render()

  render: =>
    html = ''
    lastId = false
    storage.getInvoices().then (invoices) =>
      for invoice in invoices
        if @showMissing and lastId
          for id in [lastId-1 .. invoice.id+1] by -1
            html += @template.missing.render(id: id)
        html += @template.record.render invoice
        lastId = invoice.id
      @table.html html

module.exports = Records
