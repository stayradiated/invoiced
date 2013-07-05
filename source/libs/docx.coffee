
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
    content ?= existing
    return content

  template.replace(/\{{2}([A-Za-z0-9_|.]*)\}{2}/g, fn)

templates =
  document: __dirname + '/../../../docs/document.xml.tmpl'
  rowHeading: __dirname + '/../../../docs/row.heading.xml.tmpl'
  rowNumber: __dirname + '/../../../docs/row.number.xml.tmpl'
  rowBullet: __dirname + '/../../../docs/row.bullet.xml.tmpl'

config =
  template: __dirname + '/../../../docs/template/word/document.xml'
  folder: __dirname + '/../../../docs/template'
  output: __dirname + '/../../../docs/file.docx'

content = {}
loaded = false

# Load content from `templates` into `content`
loadFiles = ->

  # TODO: use async versions
  for file, path of templates
    content[file] = fs.readFileSync(path).toString()
    loaded = true

# Compile template and create docx file
compile = (details, table) ->

  if not loaded then loadFiles()

  # Compile rows
  details.rows = ""
  startDate = ''
  jobDate = ''
  for row in table
    row.jobDate = jobDate
    switch row.type
      when 'heading'
        details.rows += tmpl(content.rowHeading, row)
      when 'number'
        details.rows += tmpl(content.rowNumber, row)
      when 'bullet'
        details.rows += tmpl(content.rowBullet, row)
      when 'section'
        jobDate = row.name
        if startDate is '' then startDate = jobDate
    jobDate = '' unless row.type is 'section'

  details.jobDate = startDate

  # Compile document
  output = tmpl(content.document, details)

  # Save template to disk and create docx file
  fs.writeFile(config.template, output)
  zip(config.folder, config.output)

module.exports = compile
