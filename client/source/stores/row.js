'use strict';

var Backbone = require('backbone');

var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');
var RowCollection = require('../models/rows');
var RowModel = require('../models/row');

var RowStore = Backbone.Model.extend({

  defaults: {
    collection: null
  },

  initialize: function () {
    this._index = 0;
    var collection = new RowCollection();
    collection.fetch({ reset: true });
    collection.on('reset', this._onReset, this);
    this.set('collection', collection);
  },

  _onReset: function () {
    this._index = this.get('collection').last().get('order') + 1;
  }
 
});

var rowStore = new RowStore();

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.CREATE_ROW:
      action.invoice.get('rows').create({
        type: action.type,
        order: rowStore._index++
      });
      break;

    case AppConstants.DESTROY_ROW:
      action.row.destroy();
      break;

  }

  return true;
});

module.exports = rowStore;
