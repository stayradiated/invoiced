
jQuery = require 'jqueryify'

App = require './controllers/app.coffee'

jQuery ->
  window.App = new App
    el: $('body')
