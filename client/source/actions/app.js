var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var AppActions = {

  openInvoice: function (invoice) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_INVOICE,
      invoice: invoice
    });
  }

};

module.exports = AppActions;
