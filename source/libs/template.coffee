swig = require 'swig'

folder = __dirname + '/../../../source/views/'

class Template

  constructor: (filename) ->
    @path = folder + filename + '.html'
    @template = swig.compileFile @path

  render: (obj) =>
    @template obj

module.exports = Template
