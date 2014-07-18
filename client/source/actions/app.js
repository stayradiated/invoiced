var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var AppActions = {

  createInvoice: function (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_INVOICE,
      client: client
    });
  },

  createClient: function () {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_CLIENT
    });
  },

  editInvoice: function (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EDIT_INVOICE,
      invoice: invoice
    });
  },

  editClient: function (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EDIT_CLIENT,
      client: client
    });
  },

  openPage: function (page) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_PAGE,
      page: page
    });
  },

  openClient: function (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_CLIENT,
      client: client
    });
  },

  openInvoice: function (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_INVOICE,
      invoice: invoice
    });
  }

};

module.exports = AppActions;
