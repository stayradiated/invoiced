'use strict';

var Snippet = Backbone.Model.extend({

  defaults: {
    id: null,
    content: 'A new snippet'
  }

});

var Snippets = Backbone.Collection.extend({

  model: Snippet

});

module.exports = Snippets;
