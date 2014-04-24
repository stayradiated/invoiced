var App = require('../app');

var HeaderView = require('../views/header');
var ClientsController = require('./clients');

var PagesController = function () {
  this.pages = {
    clients: new ClientsController()
  };
};

_.extend(PagesController.prototype, {

  start: function () {
    this.showHeader();
    this.pages.clients.show();
  },

  showHeader: function () {
    var headerView = new HeaderView();
    App.header.show(headerView);
  }

});

App.addInitializer(function () {
  var pagesController = new PagesController();
  pagesController.start();
});

module.exports = PagesController;
