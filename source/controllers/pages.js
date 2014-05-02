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

  this.page = null;
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

  showPage: function (page) {
    if (this.page !== page) {
      console.log('Pages: opening page', page);
      App.trigger('select:page', page);
      App.page.show(this.pages[page].view);
      this.page = page;
    }
  },


  /*
   * CLIENTS
   */

  showClientsPage: function () {
    this.showPage('clients');
  },

  openClient: function (clientId) {
    var client = this.models.clients.get(clientId);
    this.showPage('clients');
    this.pages.clients.open(client);
  },


  /*
   * EDITOR
   */

  showEditorPage: function () {
    this.showPage('editor');
  },

  openInvoiceInEditor: function (invoiceId) {
    var invoice = this.models.invoices.get(invoiceId);
    this.pages.editor.open(invoice);
    this.showPage('editor');
  },

  createInvoice: function (clientId) {
    var client = this.models.clients.get(clientId);
    this.showPage('editor');
    this.pages.editor.create(client);
  },

});

App.addInitializer(function () {
  var pagesController = new PagesController();
  App.router = new Router({ controller: pagesController });
  pagesController.start();
});

module.exports = PagesController;
