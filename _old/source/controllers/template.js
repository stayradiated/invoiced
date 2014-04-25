'use strict';

var swig = require('swig');
var templates = __dirname + '/../../../jade/';

var Template = function (filename) {
  _.bindAll(this, 'render');
  this.path = templates + filename + '.html';
  this.template = swig.compileFile(this.path);
};

_.extend(Template.prototype, {

  render: function(obj) {
    return this.template(obj);
  }

});

module.exports = Template;
