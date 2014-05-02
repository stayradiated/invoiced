var App = require('../app');

// Controllers
var ClientsController = require('./clients');
var EditorController = require('./editor');

// Views
var HeaderView = require('../views/header');

// Models
var ClientsCollection = require('../models/clients');
var InvoicesCollection = require('../models/invoices');
var RowsCollection = require('../models/rows');

var Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    '':                   'showClientsPage',
    'clients':            'showClientsPage',
    'clients/:id':        'openClient',
    'editor':             'showEditorPage',
    'editor/:id':         'openInvoiceInEditor',
    'editor/create/:id':  'createInvoice'
  }
});

var PagesController = function () {
  this.models = {
    clients: new ClientsCollection(),
    invoices: new InvoicesCollection(),
    rows: new RowsCollection()
  };

  this._loaded = 0;

  _.each(this.models, function (model) {
    model.fetch({ reset: true });
    model.once('reset', this.startHistory, this);
  }, this);

  this.pages = {
    clients: new ClientsController(this.models.clients),
    editor: new EditorController(this.models.invoices)
  };
};

_.extend(PagesController.prototype, {

  startHistory: function () {
    this._loaded += 1;
    if (this._loaded === _.keys(this.models).length) {
      Backbone.history.start();
    }
  },

  start: function () {
    this.showHeader();
  },

  showHeader: function () {
    var headerView = new HeaderView();
    App.header.show(headerView);
  },

  showClientsPage: function () {
    App.trigger('select:page', 'clients');
    App.page.show(this.pages.clients.render());
  },

  showEditorPage: function () {
    App.trigger('select:page', 'editor');
    App.page.show(this.pages.editor.view());
  },

  createInvoice: function (clientId) {
    App.trigger('select:page', 'editor');
    var client = this.models.clients.get(clientId);
    App.page.show(this.pages.editor.create(client));
  },

  openClient: function (clientId) {
    this.pages.clients.open(clientId);
  },

  openInvoiceInEditor: function (invoiceId) {
    var invoice = this.models.invoices.get(invoiceId);
    App.page.show(this.pages.editor.render(invoice));
  }

});

App.addInitializer(function () {
  var pagesController = new PagesController();
  App.router = new Router({ controller: pagesController });
  pagesController.start();
});

module.exports = PagesController;
