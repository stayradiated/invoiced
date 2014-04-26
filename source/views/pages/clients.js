'use strict';

var template = require('../../utils/template');
var ClientsView = require('../clients/clients');
var InvoicesView = require('../clients/invoices');
var InvoicesCollection = require('../../models/invoices');

var Clients = Backbone.Marionette.Layout.extend({

  className: 'page-clients',
  template: template('pages/clients'),

  regions: {
    clients: '.clients-container',
    invoices: '.invoices-container'
  },

  initialize: function () {
    this.listenTo(this.options.clients, 'select', this.selectClient);
  },

  onRender: function () {
    this.clients.show(new ClientsView({
      collection: this.options.clients
    }));
  },

  selectClient: function (client) {
    var self = this;
    var collection = new InvoicesCollection({
      client: client.id
    });
    collection.fetch({ reset: true }).then(function () {
      self.invoices.show(new InvoicesView({
        model: client,
        collection: collection
      }));
    });
  }

});

module.exports = Clients;
