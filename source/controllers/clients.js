var App = require('../app');
var ClientsCollection = require('../models/clients');
var InvoicesCollection = require('../models/invoices');
var ClientsPage = require('../views/pages/clients');

var ClientsController = function () {
  this.clients = new ClientsCollection();
  this.invoices = new InvoicesCollection();
  this.clients.fetch();
  this.invoices.fetch();
};

_.extend(ClientsController.prototype, {

  show: function () {
    var view = new ClientsPage({
      clients: this.clients,
      invoices: this.invoices
    });
    App.page.show(view);
  }

});

module.exports = ClientsController;
