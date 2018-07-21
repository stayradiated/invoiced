const { resolveRelatedList } = require('../../utils/resolve')

const { clients } = require('../../models/clients')

const resolvers = {
  Client: {
    invoices: resolveRelatedList(clients, 'invoices')
  }
}

module.exports = { resolvers }
