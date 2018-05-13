import Backbone from 'backbone'

import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'

const ModalStore = Backbone.Model.extend({
  defaults: {
    display: false,
    message: '',
    onSuccess: () => null,
    onFail: () => null,
  },

  hide () {
    this.set('display', false)
  }
})

var modalStore = new ModalStore()

var wrapFn = (fn) => () => {
  modalStore.hide()
  if (typeof fn === 'function') {
    return fn()
  }
}

AppDispatcher.register(function (payload) {
  var action = payload.action

  switch (action.actionType) {

    case AppConstants.SHOW_MODAL:
      modalStore.set({
        display: true,
        message: action.message,
        onSuccess: wrapFn(action.onSuccess),
        onFail: wrapFn(action.onFail)
      })
      break

  }

  return true
})

export default modalStore
