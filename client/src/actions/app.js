import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'

const AppActions = {
  /* CREATE */

  createClient () {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_CLIENT
    })
  },

  createInvoice (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_INVOICE,
      client: client
    })
  },

  createRow (invoice, type) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_ROW,
      invoice: invoice,
      type: type
    })
  },

  createSnippet () {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_SNIPPET
    })
  },

  /* EDIT */

  editInvoice (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EDIT_INVOICE,
      invoice: invoice
    })
  },

  editClient (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EDIT_CLIENT,
      client: client
    })
  },

  editSnippet (snippet) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EDIT_SNIPPET,
      snippet: snippet
    })
  },

  /* OPEN */

  openPage (page) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_PAGE,
      page: page
    })
  },

  openClient (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_CLIENT,
      client: client
    })
  },

  openInvoice (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_INVOICE,
      invoice: invoice
    })
  },

  /* DESTROY */

  destroyClient (client) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_CLIENT,
      client: client
    })
  },

  destroyInvoice (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_INVOICE,
      invoice: invoice
    })
  },

  destroyRow (row) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_ROW,
      row: row
    })
  },

  destroySnippet (snippet) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.DESTROY_SNIPPET,
      snippet: snippet
    })
  },

  /* MISC */

  showModal (message, onSuccess, onFail) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_MODAL,
      message: message,
      onSuccess: onSuccess,
      onFail: onFail
    })
  },

  exportInvoice (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.EXPORT_INVOICE,
      invoice: invoice
    })
  }
}

export default AppActions
