fs = require 'fs'
zip = require './zip'
When = require 'when'

# Merge two objects together
merge = (to, from) ->
  for own key, val of from
    to[key] = val

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

# Configuration
config = {}
config.docs = __dirname + '/../../../docs/'
config.folder = config.docs + 'template/'
config.template = config.folder + 'word/document.xml'

# Template files to laod
templates =
  document: config.docs + 'document.xml.tmpl'
  rowNumber: config.docs + 'row.number.xml.tmpl'
  rowBullet: config.docs + 'row.bullet.xml.tmpl'
  rowHeading: config.docs + 'row.heading.xml.tmpl'

# Store template contents
content = {}
loaded = false

readFile = (name, path) ->
  deferred = When.defer()
  fs.readFile path, (err, contents) ->
    if err
      return deferred.reject(err)
    deferred.resolve([name, contents.toString()])
  return deferred.promise

# Load content from `templates` into `content`
loadFiles = (fn) ->

  requests = []
  for file, path of templates
    requests.push readFile(file, path)

  When.all requests, (contents) ->
    for [file, text] in contents
      content[file] = text
    loaded = true
    if fn then fn()

# Compile template and create docx file
compile = (path, {client, invoice, rows}) ->

  # Load templates and then compile after that
  if not loaded
    args = arguments
    return loadFiles ->
      compile.apply(this, args)

  # Compile document
  data = {}

  data.rows = ""
  startDate = ''
  jobDate = ''

  # Compile rows
  for row in rows
    row.jobDate = jobDate
    switch row.type
      when 'heading'
        data.rows += tmpl(content.rowHeading, row)
      when 'number'
        data.rows += tmpl(content.rowNumber, row)
      when 'bullet'
        data.rows += tmpl(content.rowBullet, row)
      when 'section'
        jobDate = row.name
        if startDate is '' then startDate = jobDate
    jobDate = '' unless row.type is 'section'

  # The first job date becomes the start date
  data.jobDate = startDate

  # Merge data with client and invoice
  merge(data, client)
  merge(data, invoice)

  # Compile document
  output = tmpl(content.document, data)

  # Save template to disk and create docx file
  fs.writeFile config.template, output, (err) ->
    zip(config.folder, path)

module.exports = compile
