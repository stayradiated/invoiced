import Backbone from 'backbone'

import Client from './client'

const Clients = Backbone.Collection.extend({
  model: Client,
  url: '/clients',
  comparator: 'name'
})

export default Clients;
