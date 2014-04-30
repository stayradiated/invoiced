var App = require('../app');
var ClientsPage = require('../views/pages/clients');
var ClientsCollection = require('../models/clients');
var ClientsView = require('../views/clients/clients');
var InvoicesView = require('../views/clients/invoices');
var InvoicesCollection = require('../models/invoices');
var DetailsView = require('../views/clients/details');

var ClientsController = function () {
  this.clients = new ClientsCollection();
  this.clients.once('reset', Backbone.history.start, Backbone.history);
  this.clients.fetch({ reset: true });
};

_.extend(ClientsController.prototype, {

  render: function () {
    this.view = new ClientsPage();
    this.view.on('render', this.showClients, this);
    return this.view;
  },

  open: function (id) {
    var client = this.clients.get(id);
    client.trigger('select', client);
  },

  showClients: function () {
    var clientsView = new ClientsView({
      collection: this.clients
    });
    clientsView.on('select:client', this.showInvoices, this);
    this.view.clients.show(clientsView);
  },

  showInvoices: function (client) {
    this.view.details.close();

    var collection = new InvoicesCollection({
      client: client
    });

    var invoicesView = new InvoicesView({
      model: client,
      collection: collection
    });
    invoicesView.on('select:invoice', this.showDetails, this);

    var self = this;
    collection.fetch({ reset: true }).then(function () {
      self.view.invoices.show(invoicesView);
    });
  },

  showDetails: function (invoice) {
    var detailsView = new DetailsView({
      model: invoice
    });
    detailsView.on('edit:invoice', function (invoice) {
      console.log('editiing', invoice);
    });
    this.view.details.show(detailsView);
  }

});

module.exports = ClientsController;
