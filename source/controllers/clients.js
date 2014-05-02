var App = require('../app');

// Views
var ClientsPage = require('../views/pages/clients');
var ClientsView = require('../views/clients/clients');
var InvoicesView = require('../views/clients/invoices');
var DetailsView = require('../views/clients/details');

var ClientsController = function (clients) {
  this.clients = clients;
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
    var clientsView = new ClientsView({ collection: this.clients });
    clientsView.on('select:client', this.showInvoices, this);
    clientsView.on('create:client', this.createClient, this);
    this.view.clients.show(clientsView);
  },

  showInvoices: function (client) {
    this.view.details.close();

    var view = new InvoicesView({
      model: client,
      collection: client.get('invoices')
    });

    view.on('select:invoice', this.showDetails, this);
    view.on('create:invoice', this.createInvoice, this);

    this.view.invoices.show(view);
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
      this.clients.add(client);
    }, this);

    var invoicesView = new InvoicesView({
      model: client,
      collection: new InvoicesCollection({
        client: client
      })
    });

    this.view.invoices.show(invoicesView);
  },

  createInvoice: function (client) {
    App.router.navigate('/editor/create/' + client.id, {trigger: true});
  }

});

module.exports = ClientsController;
