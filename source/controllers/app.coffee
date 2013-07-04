
Base = require '../libs/base'

Table = require '../controllers/table'
Details = require '../controllers/details'
Snippets = require '../controllers/snippets'

docx = require '../libs/docx'

class App extends Base.Controller

  elements:
    '.table': 'table'
    '.snippets': 'snippets'
    '.details': 'details'

  events:
    'click .generate': 'generate'
    'click .toggle-sidebar': 'toggle'

  constructor: ->
    super

    # Overwrite elements with controllers
    @table = new Table(el: @table)
    @details = new Details(el: @details)
    @snippets = new Snippets(el: @snippets)

  generate: =>
    console.log 'Generating word document...'
    details = @details.model.toJSON()
    table = @table.rows.toJSON()
    docx(details, table)

  toggle: =>
    @el.toggleClass('no-snippets')

module.exports = App
