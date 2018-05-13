import $ from 'jquery'
import Backbone from 'backbone'

import AppActions from '../actions/app'
import AppDispatcher from '../dispatchers/app'
import AppConstants from '../constants/app'
import InvoiceCollection from '../models/invoices'

const InvoiceStore = Backbone.Model.extend({
  defaults: {
    collection: null,
    active: null,
    editing: null
  },

  initialize () {
    var collection = new InvoiceCollection()
    collection.fetch({ reset: true })
    collection.on('remove', this._onRemove, this)
    this.set('collection', collection)
  },

  _onRemove (invoice) {
    console.log('invoice was removed', invoice)
    if (invoice === this.get('active')) {
      this.set('active', null)
    }
  }
})

const invoiceStore = new InvoiceStore()

AppDispatcher.register(function (payload) {
  var action = payload.action

  switch (action.actionType) {
    case AppConstants.OPEN_CLIENT:
    case AppConstants.EDIT_CLIENT:
      invoiceStore.set('active', null)
      break

    case AppConstants.DESTROY_INVOICE:
      AppActions.showModal('Are you sure you want to destroy that invoice?',
        action.invoice.destroy.bind(action.invoice)
      )
      break

    case AppConstants.CREATE_INVOICE:
      invoiceStore.get('collection').create({
        client: action.client,
        customer: action.client.get('name'),
        site: action.client.get('address')
      })
      break

    case AppConstants.OPEN_INVOICE:
      invoiceStore.set('active', action.invoice)
      break

    case AppConstants.EDIT_INVOICE:
      action.invoice.store()
      action.invoice.get('rows').store()
      invoiceStore.set('editing', action.invoice)
      break

    case AppConstants.EXPORT_INVOICE:
      console.log('doing stuff')
      $.get('/docx/' + action.invoice.get('id'))
      break
  }

  return true
})

export default invoiceStore
