import _ from 'lodash'
import Backbone from 'backbone'

import Row from './row'
import Rows from './rows'

const Invoice = Backbone.RelationalModel.extend({
  urlRoot: '/invoices',
  defaults: {
    client: null,
    number: null,

    date: new Date(),
    paid: 0,

    customer: '',
    email: '',
    site: '',

    cost: 0,
    labour: 0,
    airmover: 0,

    createdAt: '',
    updatedAt: ''
  },

  relations: [{
    type: 'HasMany',
    key: 'rows',
    relatedModel: Row,
    collectionType: Rows,
    includeInJSON: false,
    reverseRelation: {
      key: 'invoice',
      includeInJSON: 'id'
    }
  }],

  initialize () {
    var memento = new Backbone.Memento(this)
    _.extend(this, memento)
    this.store()
  }
})

export default Invoice
