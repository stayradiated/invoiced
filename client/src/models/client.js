import Backbone from 'backbone'

import Invoice from './invoice'
import Invoices from './invoices'

const Client = Backbone.RelationalModel.extend({
  urlRoot: '/clients',
  defaults: {
    name: '',
    address: '',
    city: '',
    postcode: '',
    createdAt: null,
    updatedAt: null 
  },

  relations: [{
    type: 'HasMany',
    key: 'invoices',
    relatedModel: Invoice,
    collectionType: Invoices,
    includeInJSON: 'id',
    reverseRelation: {
      key: 'client',
      includeInJSON: 'id'
    }
  }],

  parse (json) {
    json.date = new Date(json.date)
    json.createdAt = new Date(json.createdAt)
    json.updatedAt = new Date(json.updatedAt)
    return json
  },

  matchFilter (filter) {
    return this.get('name').toLowerCase().indexOf(filter.toLowerCase()) >= 0
  }
})

export default Client
