
fs = require 'fs'
zip = require './zip'

# Super simple templating engine
tmpl = (template, namespace) ->

  fn = (existing, fieldName) ->
    fields = fieldName.split('.')
    next = namespace
    last = fields.length - 1
    for field, i in fields
      value = next[field]
      if i is last then content = value
      else next = value
    return content or existing

  template.replace(/\{{3}([A-Za-z0-9_|.]*)\}{3}/g, fn)

templates =
  doc: __dirname + '/../../../docs/document.xml.tmpl'
  row: __dirname + '/../../../docs/row.xml.tmpl'
  output: __dirname + '/../../../docs/template/word/document.xml'

zipConfig =
  folder: __dirname + '/../../../docs/template'
  output: __dirname + '/../../../docs/file.docx'


compile = (details, table) ->

  # TODO: use async versions
  docTmpl = fs.readFileSync(templates.doc).toString()
  rowTmpl = fs.readFileSync(templates.row).toString()

  # Compile rows
  details.rows = ""
  for row in table
    details.rows += tmpl(rowTmpl, row)

  # Compile document
  output = tmpl(docTmpl, details)

  # Save template to disk and create docx file
  fs.writeFile(templates.output, output)
  zip(zipConfig.folder, zipConfig.output)

module.exports = compile
