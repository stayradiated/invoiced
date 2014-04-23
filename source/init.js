'use strict';

global.$ = window.$;
global._ = window._;
global.Backbone = window.Backbone;

var gui = require('nw.gui');
var win = window.win = gui.Window.get();

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

var App = require('./js/views/app');

$(function() {
  window.app = new App({
    el: $('body')
  });
});
