var _ = require('lodash');
var Signals = require('signals');
var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var RowCollection = require('../models/rows');

var rowCollection = new RowCollection();

var RowStore = Signals.convert({

  init: function () {
    rowCollection.fetch({ reset: true });
  },

  getCollection: function () {
    return rowCollection;
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

RowStore.init();
module.exports = RowStore;
