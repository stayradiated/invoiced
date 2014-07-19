'use strict';

var Backbone = require('backbone');

var config = require('../../package').config;

var Snippet = Backbone.Model.extend({

  urlRoot: config.root + '/snippets',

  defaults: {
    shortcut: '',
    content: ''
  }

});

module.exports = Snippet;
