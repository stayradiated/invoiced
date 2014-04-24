'use strict';

var App = new Marionette.Application();

App.addRegions({
  page: '.page-container',
  header: '.header-container'
});

$(function() {
  App.start();
});

module.exports = App;

// load pages controller
require('./controllers/pages');
