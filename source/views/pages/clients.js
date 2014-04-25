'use strict';

var template = require('../../utils/template');
var ClientsView = require('../clients/clients');
var InvoicesView = require('../clients/invoices');

var Clients = Backbone.Marionette.Layout.extend({

  className: 'page-clients',
  template: template('pages/clients'),

  regions: {
    clients: '.clients-container',
    invoices: '.invoices-container'
  },

  onRender: function () {
    this.clients.show(new ClientsView({
      collection: this.options.clients
    }));
    this.invoices.show(new InvoicesView({
      collection: this.options.invoices
    }));
  }

});

module.exports = Clients;
