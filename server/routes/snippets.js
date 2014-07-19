'use strict';

var Route = require('../utils/route');
var Snippets = require('../models/snippets');

var snippets = new Route({
  collection: Snippets,
  columns: ['shortcut', 'content']
});

module.exports = snippets;
