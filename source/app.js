'use strict';

var App = Marionette.Application();

App.addRegions({
  page: '.page-container',
  header: '.header-container'
});


$(function() {
  App.start();
});

module.exports = App;
