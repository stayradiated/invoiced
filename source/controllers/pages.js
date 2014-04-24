var App = require('../app');

var HeaderView = require('../views/header');
var ClientsPageView = require('../views/pages/clients');

var PagesController = function () {
  this.pages = {
    clients: new ClientsPageView()
  };
};

_.extend(PagesController.prototype, {

  start: function () {
    this.showHeader();
    this.showPage(this.pages.clients);
  },

  showHeader: function () {
    var headerView = new HeaderView();
    App.header.show(headerView);
  },

  showPage: function (page) {
    App.page.show(page);
  },

});

App.addInitializer(function () {
  var pagesController = new PagesController();
  pagesController.start();
});

module.exports = PagesController;
