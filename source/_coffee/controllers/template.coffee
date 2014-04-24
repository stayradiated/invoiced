swig = require 'swig'

templates = __dirname + '/../../../source/templates/'

class Template

  constructor: (filename) ->
    @path = templates + filename + '.html'
    @template = swig.compileFile @path

  render: (obj) =>
    @template obj

module.exports = Template
