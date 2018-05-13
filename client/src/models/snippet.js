import Backbone from 'backbone'

const Snippet = Backbone.Model.extend({
  urlRoot: '/snippets',
  defaults: {
    shortcut: '',
    content: ''
  }
})

export default Snippet
