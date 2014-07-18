var _ = require('lodash');
var Signals = require('Signals');
var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var InvoiceCollection = require('../models/invoices');
var invoiceCollection = new InvoiceCollection();

var InvoiceStore = Signals.convert({

  init: function () {
    invoiceCollection.fetch({ reset: true });
  },

  getCollection: function () {
    return invoiceCollection;
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.SOME_CONSTANT:
      break;

  }

  return true;

});

InvoiceStore.init();

module.exports = InvoiceStore;
