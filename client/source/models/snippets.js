'use strict';

var Backbone = require('backbone');

var Snippet = require('./snippet');
var config = require('../../package').config;

var Snippets = Backbone.Collection.extend({

  model: Snippet,

  url: config.root + '/snippets'

});

module.exports = Snippets;
