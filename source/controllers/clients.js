var App = require('../app');

// Views
var ClientsPage = require('../views/pages/clients');
var ClientsView = require('../views/clients/clients');
var InvoicesView = require('../views/clients/invoices');
var DetailsView = require('../views/clients/details');

// Models
var Client = require('../models/client');

var ClientsController = function (clients) {
  this.clients = clients;
  this.view = new ClientsPage();
  this.view.on('render', this.showClients, this);
};

_.extend(ClientsController.prototype, {


  open: function (client) {
    this.view.details.close();

    var view = new InvoicesView({
      model: client,
      collection: client.get('invoices')
    });

    view.on('select:invoice', this.showDetails, this);
    view.on('create:invoice', this.createInvoice, this);

    this.view.invoices.show(view);

    return view;
  },

  showClients: function () {
    var clientsView = new ClientsView({ collection: this.clients });
    clientsView.on('select:client', this.showInvoices, this);
    clientsView.on('create:client', this.createClient, this);
    this.view.clients.show(clientsView);
  },

  showInvoices: function (client) {
    App.router.navigate('/clients/' + client.id, {trigger: true});
  },

  showDetails: function (invoice) {
    var detailsView = new DetailsView({ model: invoice });
    detailsView.on('edit:invoice', function (invoice) {
      App.router.navigate('/editor/' + invoice.id, {trigger: true});
    });
    this.view.details.show(detailsView);
  },

  createClient: function () {
    var client = new Client();

    client.on('sync', function () {
      console.log('adding client to all clients');
      this.clients.add(client);
    }, this);

    var view = this.showInvoices(client);
    view.showEditor();
  },

  createInvoice: function (client) {
    App.router.navigate('/editor/create/' + client.id, {trigger: true});
  }

});

module.exports = ClientsController;
