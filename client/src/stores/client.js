import Backbone from 'backbone'

import AppActions from '../actions/app'
import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'

const ClientStore = Backbone.Model.extend({
  defaults: {
    active: null,
    editMode: false
  },

  _onRemove: function (client) {
    if (client === this.get('active')) {
      this.set('active', null)
    }
  }
})

const clientStore = new ClientStore()

AppDispatcher.register(function (payload) {
  const action = payload.action

  switch (action.actionType) {
    case AppConstants.OPEN_CLIENT:
      clientStore.set('editMode', false)
      clientStore.set('active', action.client)
      break

    case AppConstants.EDIT_CLIENT:
      clientStore.set('editMode', true)
      break

    case AppConstants.DESTROY_CLIENT:
      AppActions.showModal('Are you sure you want to destroy that client?',
        action.client.destroy.bind(action.client)
      )
      break
  }

  return true
})

export default clientStore
