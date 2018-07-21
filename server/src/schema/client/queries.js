const {
  resolveItemFromCollection,
  resolvePageFromCollection
} = require('../../utils/resolve')

const { clients } = require('../../models/clients')

const queries = {
  client: resolveItemFromCollection(clients),
  clients: resolvePageFromCollection(clients)
}

module.exports = { queries }
