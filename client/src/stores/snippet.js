import Backbone from 'backbone'

import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'
import SnippetModel from '../models/snippet'
import SnippetCollection from '../models/snippets'

const SnippetStore = Backbone.Model.extend({
  defaults: {
    collection: null,
    edit: null
  },

  initialize: function () {
    const collection = new SnippetCollection()
    collection.fetch({ reset: true })
    collection.on('sync', this._onSync, this)
    this.set('collection', collection)
  },

  expand: function (shortcut) {
    return this.get('collection').findWhere({
      shortcut: shortcut.toLowerCase(),
    })
  },

  _onSync: function () {
    this.set('edit', null)
  }
})

const snippetStore = new SnippetStore()

AppDispatcher.register(function (payload) {
  const action = payload.action

  switch (action.actionType) {
    case AppConstants.CREATE_SNIPPET:
      const snippet = new SnippetModel()
      snippetStore.set('edit', snippet)
      snippetStore.get('collection').add(snippet)
      break

    case AppConstants.EDIT_SNIPPET:
      snippetStore.set('edit', action.snippet)
      break

    case AppConstants.DESTROY_SNIPPET:
      action.snippet.destroy()
      break
  }

  return true
})

export default snippetStore
