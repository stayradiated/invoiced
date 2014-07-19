var _ = require('lodash');
var Backbone = require('backbone');

var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');
var RowCollection = require('../models/rows');

var RowStore = Backbone.Model.extend({

  defaults: {
    collection: null
  },

  initialize: function () {
    var collection = new RowCollection();
    collection.fetch({ reset: true });
    this.set('collection', collection);
  }
 
});

var rowStore = new RowStore();

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

  }

  return true;
});

module.exports = rowStore;
