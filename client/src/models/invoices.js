import Backbone from 'backbone'

import Invoice from './invoice'

const Invoices = Backbone.Collection.extend({
  model: Invoice,
  url: '/invoices',
  comparator: 'number'
})

export default Invoices
