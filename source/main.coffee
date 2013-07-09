
$ = require 'jqueryify'

# Node-Webkit debugging tools

gui = require 'nw.gui'
window.win = gui.Window.get()
window.log = console.log.bind(console)

$(document).on 'keydown', (e) ->
  switch e.keyCode

    when 82 # r
      if e.ctrlKey
        window.app.storage.end()
        win.reloadDev()

    when 68 # d
      if e.ctrlKey
        win.showDevTools()

window.App = require './js/controllers/app'

$ ->
  window.app = new App
    el: $('body')
