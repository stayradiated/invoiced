var _ = require('lodash');
var Signals = require('signals');
var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var store = {
  activePage: AppConstants.CLIENT_PAGE
};

var AppStore = Signals.convert({

  getActivePage: function () {
    return store.activePage;
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.OPEN_INVOICE:
      store.activePage = AppConstants.EDITOR_PAGE;
      break;

    default:
      return true;
  }

  AppStore.emit('change');

  return true;

});

module.exports = AppStore;
