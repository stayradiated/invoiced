var App = require('../app');

var HeaderView = require('../views/header');

var PagesController = function () {
};

_.extend(PagesController.prototype, {

  start: function () {
    this.showHeader();
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
