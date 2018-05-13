import Backbone from 'backbone'

import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'

const AppStore = Backbone.Model.extend({
  defaults: {
    activePage: AppConstants.CLIENT_PAGE
  }
})

const appStore = new AppStore()

AppDispatcher.register(function (payload) {
  const action = payload.action

  switch (action.actionType) {
    case AppConstants.EDIT_INVOICE:
      appStore.set('activePage', AppConstants.EDITOR_PAGE)
      break

    case AppConstants.OPEN_PAGE:
      appStore.set('activePage', action.page)
      break
  }

  return true
})

export default appStore
