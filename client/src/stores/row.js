import Backbone from 'backbone'

import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'
import RowCollection from '../models/rows'

const RowStore = Backbone.Model.extend({
  defaults: {
    collection: null
  },

  initialize () {
    this._index = 0
    const collection = new RowCollection()
    collection.fetch({ reset: true })
    collection.on('reset', this._onReset, this)
    this.set('collection', collection)
  },

  _onReset () {
    this._index = this.get('collection').last().get('order') + 1
  }
})

const rowStore = new RowStore()

AppDispatcher.register(function (payload) {
  const action = payload.action

  switch (action.actionType) {

    case AppConstants.CREATE_ROW:
      action.invoice.get('rows').create({
        type: action.type,
        order: rowStore._index++
      })
      break

    case AppConstants.DESTROY_ROW:
      action.row.destroy()
      break

  }

  return true
})

export default rowStore
