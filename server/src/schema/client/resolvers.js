const { resolveRelatedItem } = require('../../utils/resolve')

const { clients } = require('../../models/clients')

const resolvers = {
  Client: {
    invoices: resolveRelatedItem(clients, 'invoices')
  }
}

module.exports = { resolvers }
