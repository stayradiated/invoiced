'use strict';

var App = new Marionette.Application();

App.addRegions({
  page: '.page-container',
  header: '.header-container'
});

$(function() {
  FastClick.attach(document.body);
  App.start();
});

module.exports = App;

// load pages controller
require('./controllers/pages');
