var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var AppActions = {

  createClient: function () {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_CLIENT
    });
  },

  createInvoice: function (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_INVOICE,
      client: client
    });
  },

  createRow: function (invoice, type) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_ROW,
      invoice: invoice,
      type: type
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
  },

  destroyClient: function (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_CLIENT,
      client: client
    });
  },

  destroyInvoice: function (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_INVOICE,
      invoice: invoice
    });
  }

};

module.exports = AppActions;
