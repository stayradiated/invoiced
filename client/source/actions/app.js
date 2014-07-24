var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var AppActions = {

  /* CREATE */

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

  createSnippet: function () {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_SNIPPET
    });
  },

  /* EDIT */

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

  editSnippet: function (snippet) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EDIT_SNIPPET,
      snippet: snippet
    });
  },

  /* OPEN */

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

  /* DESTROY */

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
  },

  destroyRow: function (row) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_ROW,
      row: row
    });
  },

  destroySnippet: function (snippet) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_SNIPPET,
      snippet: snippet
    });
  },

  /* MISC */

  showModal: function (message, onSuccess, onFail) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_MODAL,
      message: message,
      onSuccess: onSuccess,
      onFail: onFail
    });
  },

  exportInvoice: function (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EXPORT_INVOICE,
      invoice: invoice
    });
  }

};

module.exports = AppActions;
