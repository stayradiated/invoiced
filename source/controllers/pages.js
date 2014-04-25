var App = require('../app');

var HeaderView = require('../views/header');
var ClientsController = require('./clients');
var EditorController = require('./editor');

var Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    'clients':      'showClientsPage',
    'clients/:id':  'openClient',

    'editor':       'showEditorPage',
    'editor/:id':   'openInvoiceInEditor'
  }
});

var PagesController = function () {
  this.pages = {
    clients: new ClientsController(),
    editor: new EditorController()
  };
};

_.extend(PagesController.prototype, {

  start: function () {
    this.showHeader();
    this.showClientsPage();
  },

  showHeader: function () {
    var headerView = new HeaderView();
    App.header.show(headerView);
  },

  showClientsPage: function () {
    App.trigger('select:page', 'clients');
    App.page.show(this.pages.clients.view());
  },

  showEditorPage: function () {
    App.trigger('select:page', 'editor');
    App.page.show(this.pages.editor.view());
  },

  openClient: function (id) {
    this.pages.clients.open(id);
  },

  openInvoiceInEditor: function (id) {
    console.log('opening invoice', id);
  }

});

App.addInitializer(function () {
  var pagesController = new PagesController();
  var router = new Router({ controller: pagesController });
  pagesController.start();
});

module.exports = PagesController;
