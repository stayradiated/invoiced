var _ = require('lodash');
var Signals = require('signals');
var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var store = {
  activePage: AppConstants.CLIENT_PAGE,
  activeClient: null,
  activeInvoice: null
};

var AppStore = Signals.convert({

  getActivePage: function () {
    return store.activePage;
  },

  getActiveClient: function () {
    return store.activeClient;
  },

  getActiveInvoice: function () {
    return store.activeInvoice;
  },

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.EDIT_INVOICE:
      store.activeInvoice = action.invoice;
      store.activePage = AppConstants.EDITOR_PAGE;
      AppStore.emit('change:activePage');
      AppStore.emit('change:activeInvoice');
      break;

    case AppConstants.OPEN_PAGE:
      store.activePage = action.page;
      AppStore.emit('change:activePage');
      break;

    case AppConstants.OPEN_INVOICE:
      store.activeInvoice = action.invoice;
      AppStore.emit('change:activeInvoice');
      break;

    case AppConstants.OPEN_CLIENT:
      store.activeClient = action.client;
      AppStore.emit('change:activeClient');
      break;

    default:
      return true;
  }

  return true;

});

module.exports = AppStore;
