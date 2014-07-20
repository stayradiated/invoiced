'use strict';

var Backbone = require('backbone');

var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');
var SnippetModel = require('../models/snippet');
var SnippetCollection = require('../models/snippets');

var SnippetStore = Backbone.Model.extend({

  defaults: {
    collection: null,
    edit: null
  },

  initialize: function () {
    var collection = new SnippetCollection();
    collection.fetch({ reset: true });
    collection.on('sync', this._onSync, this);
    this.set('collection', collection);
  },

  expand: function (shortcut) {
    return this.get('collection').findWhere({
      shortcut: shortcut
    });
  },

  _onSync: function () {
    this.set('edit', null);
  }
 
});

var snippetStore = new SnippetStore();

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.CREATE_SNIPPET:
      var snippet = new SnippetModel();
      snippetStore.set('edit', snippet);
      snippetStore.get('collection').add(snippet);
      break;

    case AppConstants.EDIT_SNIPPET:
      snippetStore.set('edit', action.snippet);
      break;

    case AppConstants.DESTROY_SNIPPET:
      action.snippet.destroy();
      break;

  }

  return true;
});

module.exports = snippetStore;
