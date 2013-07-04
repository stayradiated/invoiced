
$ = require 'jqueryify'

# Node-Webkit debugging tools

gui = require 'nw.gui'
window.win = gui.Window.get()
$(document).on 'keydown', (e) ->
  switch e.keyCode
    when 82
      if e.ctrlKey
        win.reloadDev()
    when 68
      if e.ctrlKey
        win.showDevTools()
    # else
    #   console.log e.keyCode

App = require './js/controllers/app'

$ ->
  window.App = new App
    el: $('body')
