var App = require('../app');
var ClientsCollection = require('../models/clients');
var ClientsPage = require('../views/pages/clients');

var ClientsController = function () {
  this.clients = new ClientsCollection();

  this.clients.add({
    name: 'Captain Jack Sparrow',
    address: 'The Black Pearl',
    city: 'Tortuga',
    postcode: '1234'
  });

  var invoices = this.clients.first().get('invoices');
  console.log(invoices);

  invoices.add({
    id: 7300,
    created: new Date(),
    date: new Date(),
    customer: 'Will Turner',
    email: 'will@gmail.com',
    site: 'The Armory',
    cost: 200
  });

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
