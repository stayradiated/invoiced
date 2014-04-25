Base = require 'base'
Snippet = require '../models/snippet'
Template = require '../libs/template'

class Snippets extends Base.View

  template: new Template('snippet')

  ui:
    list: 'ul'

  events:
    'click .delete': 'deleteSnippet'
    'click .snippet': 'loadSnippet'
    'click .new-snippet': 'createSnippet'

  constructor: ->
    super
    @model = new Snippet()
    @model.on 'create:model', @addOne
    @model.on 'destroy:model', @remove
    @model.on 'refresh', @render

  render: =>
    @model.forEach (snippet) =>
      @addOne(snippet)
    return this

  addOne: (snippet) =>
    view = $ @template.render(snippet)
    @ui.list.append(view)
    snippet.view = view
    view.data('item', snippet)

  remove: (snippet) =>
    snippet.view.remove()

  deleteSnippet: (e) =>
    e.stopPropagation()
    return unless window.confirm('Are you sure you want to delete that snippet?')
    snippet = $(e.currentTarget).parent().data('item')
    snippet.destroy()

  createSnippet: =>
    name = window.prompt('Enter Snippet')
    return unless name
    snippet = @model.create(content: name)
    @trigger 'save:snippet', snippet

  loadSnippet: (e) =>
    snippet = $(e.currentTarget).data('item')
    @trigger 'load:snippet', snippet

module.exports = Snippets
