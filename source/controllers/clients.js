var App = require('../app');
var ClientsCollection = require('../models/clients');
var ClientsPage = require('../views/pages/clients');

var ClientsController = function () {
  this.clients = new ClientsCollection();

  for (var i = 0; i < 10; i++) {
    this.clients.add({
      name: 'Captain Jack Sparrow',
      address: 'The Black Pearl',
      city: 'Tortuga',
      postcode: '1234'
    });
  }

  var invoices = this.clients.first().get('invoices');

  for (i = 0; i < 10; i++) {
    invoices.add({
      id: 7300 + i,
      created: new Date(),
      date: new Date(),
      customer: 'Will Turner',
      email: 'will@gmail.com',
      site: 'The Armory',
      cost: 200
    });
  }


};

_.extend(ClientsController.prototype, {

  show: function () {
    var view = new ClientsPage({
      collection: this.clients
    });
    App.page.show(view);
  }

});

module.exports = ClientsController;
