'use strict';

global.$ = window.$;
global._ = window._;
global.Backbone = window.Backbone;

var gui = require('nw.gui');
var win = gui.Window.get();

$(document).on('keydown', function(e) {
  if (e.ctrlKey) return true;
  switch (e.keyCode) {
    case 82: // r
      return win.reloadDev();
    case 68: // d
      return win.showDevTools();
  }
});

window.App = require('./js/app');
