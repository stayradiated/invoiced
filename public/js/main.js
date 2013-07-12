// Generated by CoffeeScript 1.6.3
(function() {
  var $, App, gui, wind;

  $ = require('jqueryify');

  gui = require('nw.gui');

  wind = window.win = gui.Window.get();

  window.log = console.log.bind(console);

  $(document).on('keydown', function(e) {
    switch (e.keyCode) {
      case 82:
        if (e.ctrlKey) {
          if (!e.shiftKey) {
            window.app.storage.end();
          }
          return win.reloadDev();
        }
        break;
      case 68:
        if (e.ctrlKey) {
          return win.showDevTools();
        }
    }
  });

  App = require('./js/controllers/app');

  $(function() {
    return window.app = new App({
      el: $('body')
    });
  });

}).call(this);
