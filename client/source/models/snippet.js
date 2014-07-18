'use strict';

var Backbone = require('backbone');

var Snippet = Backbone.Model.extend({

  defaults: {
    content: ''
  }

});

module.export = Snippet;
