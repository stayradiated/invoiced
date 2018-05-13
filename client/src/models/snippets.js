import Backbone from 'backbone'

import Snippet from './snippet'

const Snippets = Backbone.Collection.extend({
  model: Snippet,
  url: '/snippets'
})

export default Snippets
