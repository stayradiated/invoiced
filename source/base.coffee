
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

  _events: {}

  trigger: (event, args...) ->
    if @_events[event]?
      for fn in @_events[event]
       fn.apply(fn, args)
    return

  on: (event, fn) ->
    @_events[event] ?= []
    @_events[event].push(fn)


# A basic Model class
# Just stores data and has defaults and events
class Model extends Event

  defaults: {}

  constructor: (attrs) ->
    load(this, @defaults)
    load(this, attrs)

  toJSON: =>
    obj = {}
    for key of @defaults
      obj[key] = @[key]
    return obj


# A collection holds an array of models
# Models events bubble up to the collection
# You can add/remove models
class Collection extends Event

  _records: []

  constructor: ->

  create: (args...) =>
    model = new @model(args...)
    @add(model)
    return model

  add: (model) =>
    @_records.push(model)
    model.on 'change', => @trigger('change', model)
    @trigger('create', model)

  forEach: =>
    Array::forEach.apply(@_records, arguments)



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
