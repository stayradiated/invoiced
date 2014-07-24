'use strict';

var _ = require('lodash');
var Backbone = require('backbone');

var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var ModalStore = Backbone.Model.extend({

  defaults: {
    display: false,
    message: '',
    onSuccess: _.noop,
    onFail: _.noop,
  },

  hide: function () {
    this.set('display', false);
  }

});

var modalStore = new ModalStore();

var wrapFn = function (fn) {
  return function () {
    modalStore.hide();
    if (_.isFunction(fn)) return fn();
  };
};

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.SHOW_MODAL:
      modalStore.set({
        display: true,
        message: action.message,
        onSuccess: wrapFn(action.onSuccess),
        onFail: wrapFn(action.onFail)
      });
      break;

  }

  return true;
});

module.exports = modalStore;
