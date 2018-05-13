import Backbone from 'backbone'

import AppActions from '../actions/app'
import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'
import ClientCollection from '../models/clients'

const ClientStore = Backbone.Model.extend({
  defaults: {
    collection: null,
    active: null,
    editMode: false
  },

  initialize: function () {
    const collection = new ClientCollection()
    collection.fetch({ reset: true })
    collection.on('remove', this._onRemove, this)
    this.set('collection', collection)
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

    case AppConstants.CREATE_CLIENT:
      clientStore.get('collection').create({})
      break

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
