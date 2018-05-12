/* @flow */

const Route = require('../utils/route')
const Clients = require('../models/clients')

const clients = new Route({
  collection: Clients,
  columns: ['name', 'address', 'city', 'postcode']
})

clients.addRelation('invoices')

module.exports = clients
