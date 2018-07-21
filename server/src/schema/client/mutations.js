const {
  resolveCreateMutation,
  resolveUpdateMutation,
  resolveDestroyMutation
} = require('../../utils/resolve')

const { clients } = require('../../models/clients')

const mutations = {
  createClient: resolveCreateMutation(clients),
  updateClient: resolveUpdateMutation(clients),
  destroyClient: resolveDestroyMutation(clients)
}

module.exports = { mutations }
