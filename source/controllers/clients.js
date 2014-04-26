var App = require('../app');
var ClientsCollection = require('../models/clients');
var ClientsPage = require('../views/pages/clients');

var ClientsController = function () {
  this.clients = new ClientsCollection();
  this.clients.once('reset', Backbone.history.start, Backbone.history);
  this.clients.fetch({ reset: true });
};

_.extend(ClientsController.prototype, {

  view: function () {
    return new ClientsPage({
      clients: this.clients
    });
  },

  open: function (id) {
    var client = this.clients.get(id);
    client.trigger('select', client);
  }

});

module.exports = ClientsController;
