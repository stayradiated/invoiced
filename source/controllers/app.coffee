
window.Base = require '../base.coffee'

Table = require '../controllers/table.coffee'
Details = require '../controllers/details.coffee'

class App extends Base.Controller

  elements:
    '.table': 'table'
    '.snippets': 'snippets'
    '.details': 'details'

  events:
    'click .generate': 'generate'

  constructor: ->
    super

    # Overwrite elements with controllers
    @table = new Table(el: @table)
    @details = new Details(el: @details)

  generate: ->
    console.log 'Generating word document...'

module.exports = App
