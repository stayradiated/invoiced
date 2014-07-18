'use strict';

var jade = require('./jade');

var prefix = '../../jade/';
var suffix = '.jade';

var template = function (path) {
  return jade[prefix + path + suffix];
};

module.exports = template;
