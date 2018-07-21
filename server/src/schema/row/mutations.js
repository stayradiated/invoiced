const {
  resolveCreateMutation,
  resolveUpdateMutation,
  resolveDestroyMutation
} = require('../../utils/resolve')

const { rows } = require('../../models/rows')

const mutations = {
  createRow: resolveCreateMutation(rows),
  updateRow: resolveUpdateMutation(rows),
  destroyRow: resolveDestroyMutation(rows)
}

module.exports = { mutations }
