'use strict';

var Backbone = require('backbone');

var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');
var InvoiceCollection = require('../models/invoices');

var InvoiceStore = Backbone.Model.extend({

  defaults: {
    collection: null,
    active: null,
    editing: null
  },

  initialize: function () {
    var collection = new InvoiceCollection();
    collection.fetch({ reset: true });
    collection.on('remove', this._onRemove, this);
    this.set('collection', collection);
  },

  _onRemove: function (invoice) {
    console.log('invoice was removed', invoice);
    if (invoice === this.get('active')) {
      this.set('active', null);
    }
  }

});

var invoiceStore = new InvoiceStore();

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.OPEN_CLIENT:
    case AppConstants.EDIT_CLIENT:
      invoiceStore.set('active', null);
      break;

    case AppConstants.DESTROY_INVOICE:
      action.invoice.destroy();
      break;

    case AppConstants.CREATE_INVOICE:
      invoiceStore.get('collection').create({
        client: action.client,
        customer: action.client.get('name'),
        site: action.client.get('address')
      });
      break;

    case AppConstants.OPEN_INVOICE:
      invoiceStore.set('active', action.invoice);
      break;

    case AppConstants.EDIT_INVOICE:
      console.log('backing up rows');
      action.invoice.store();
      action.invoice.get('rows').store();
      invoiceStore.set('editing', action.invoice);
      break;

  }

  return true;
});

module.exports = invoiceStore;
