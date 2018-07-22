const { resolveRelatedList } = require('../../utils/resolve')

const { clients } = require('../../models/clients')

const resolvers = {
  Client: {
    name: (client) => client.name || '',
    address: (client) => client.address || '',
    city: (client) => client.city || '',
    postcode: (client) => client.postcode || '',
    invoices: resolveRelatedList(clients, 'invoices', (qb) => {
      qb.orderBy('createdAt', 'DESC')
    })
  }
}

module.exports = { resolvers }
