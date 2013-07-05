
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
    '#save-file': 'file'

  events:
    'click .generate': 'generateButton'
    'click .toggle-sidebar': 'toggle'

  constructor: ->
    super

    # Overwrite elements with controllers
    @table = new Table(el: @table)
    @details = new Details(el: @details)
    @snippets = new Snippets(el: @snippets)
    
    # Build doc when user selects a file
    @file.on 'change', (e) =>
      path = e.target.value
      @buildDoc(path)

  generateButton: =>
    # Show file dialog
    @file.click()

  buildDoc: (path) =>
    details = @details.model.toJSON()
    table = @table.rows.toJSON()
    docx(path, details, table)

  toggle: =>
    @el.toggleClass('no-snippets')

module.exports = App
