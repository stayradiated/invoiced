
Base = require '../libs/base'
Snippet = require '../models/snippet'

class Snippets extends Base.Controller

  template: new Base.View

  elements:
    '.snippets': 'list'

  events:
    'click .new-snippet': 'createSnippet'

  constructor: ->
    super
    @template.load('snippet')
    @snippets = new Snippet()
    @snippets.on 'create:model', @addSnippet

  addSnippet: (snippet) =>
    @list.append @template.render(snippet)
    
  createSnippet: =>
    console.log 'creating a new snippet'
    @snippets.create()

module.exports = Snippets
