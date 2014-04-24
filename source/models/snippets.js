'use strict';

var Snippet = require('./snippet');

var Snippets = Backbone.Collection.extend({

  model: Snippet

});

module.exports = Snippets;
