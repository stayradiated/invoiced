var _ = require('lodash');
var Backbone = require('backbone');

var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var AppStore = Backbone.Model.extend({

  defaults: {
    activePage: AppConstants.CLIENT_PAGE
  }

});

var appStore = new AppStore();

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.EDIT_INVOICE:
      appStore.set('activePage', AppConstants.EDITOR_PAGE);
      break;

    case AppConstants.OPEN_PAGE:
      appStore.set('activePage', action.page);
      break;

  }

  return true;
});

module.exports = appStore;
