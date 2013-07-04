
# My own custom framework, it's based on Spine and Backbone.
# The idea is that it only includes the stuff I use.

# Uses jQuery for DOM stuff
$ = require 'jqueryify'


# Load values from one object into another
load = (obj, attrs) ->
  for key, value of attrs
    obj[key] = value
  return obj

# RND template engine - http://amix.dk/blog/post/161
RND = (tmpl, ns) ->
  fn = (w, g) ->
    g = g.split("|")
    cnt = ns[g[0]]
    i = 1
    while i < g.length
      cnt = eval(g[i++])(cnt)
    return cnt || w
  tmpl.replace(/%\(([A-Za-z0-9_|.]*)\)/g, fn)


# Handle DOM interaction
class Controller

  elements: {}
  events: {}
  
  # You can specify which element to bind to
  # But it defaults to @el
  _bind: (el=@el) =>

    # Cache @elements
    for selector, name of @elements
      @[name] = el.find(selector)
    
    # Bind events
    for query, action of @events
      split = query.indexOf(' ')
      event = query[0..split]
      selector = query[split+1..]
      el.find(selector).on(event, @[action])

  constructor: (attrs) ->
    load(this, attrs)
    
    # Binding events/elements requires an element
    if @el? then @_bind()


# Simple event handler
# I could add .off() and .once() but I never use them ...
class Event

  constructor: ->
    @_events = {}

  trigger: (event, args...) =>
    console.log '> Trigger', event, args
    if @_events[event]?
      for fn in @_events[event]
       fn.apply(fn, args)
    return

  on: (event, fn) =>
    console.log '> Listening for', event
    @_events[event] ?= []
    @_events[event].push(fn)


# A basic Model class
# Just stores data and has defaults and events
class Model extends Event
  
  constructor: (attrs) ->
    super

    @defaults ?= {}
    @_data = {}

    console.log 'defaults', @defaults

    load(@_data, @defaults)
    load(@_data, attrs)

    set = (key) =>
      (value) =>
        return if value is @_data[key]
        @_data[key] = value
        @trigger("change:#{key}", value)

    get = (key) =>
      return => @_data[key]

    for key of @defaults
      @__defineSetter__ key, set(key)
      @__defineGetter__ key, get(key)

  destroy: =>
    console.log '> Destroying model'
    @trigger('before:destroy')
    delete @_data
    @trigger('destroy')
    return this

  toJSON: =>
    return @_data


# A collection holds an array of models
# Models events bubble up to the collection
# You can add/remove models
class Collection extends Event

  constructor: ->
    super
    @_records = []

  create: (args...) =>
    model = new @model(args...)
    @add(model)
    return model

  add: (model) =>

    # Add to records array
    @_records.push(model)

    # Bubble events
    model.on 'change', =>
      @trigger('change:model', model)

    model.on 'destroy', =>
      @trigger('destroy:model', model)
      @remove(model)

    # Alert app that a new model has been created
    @trigger('create:model', model)

  remove: (record) =>
    console.log 'removing record from collection'
    index = @_records.indexOf(record)
    @_records.splice(index, 1)
    @trigger('change')

  forEach: =>
    Array::forEach.apply(@_records, arguments)

  toJSON: =>
    record.toJSON() for record in @_records

  first: =>
    @_records[0]

  last: =>
    @_records[@_records.length-1]

  get: (index) =>
    @_records[index]


# A view stores and renders a template
class View

  constructor: (@template) ->

  # Load the contents of an element
  # HTML: <script id="item-template" type="text/template"></script>
  # JS: view.load('item')
  load: (id) =>
    html = $("##{id}-template").html()
    @template = html.replace(/\s+/g, ' ')[1..-1]

  render: (data) ->
    RND(@template, data)


# Export all the classes and jQuery
module.exports =
  $: $
  Event: Event
  Controller: Controller
  Model: Model
  Collection: Collection
  View: View
