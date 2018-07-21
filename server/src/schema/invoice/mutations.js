const {
  resolveCreateMutation,
  resolveUpdateMutation,
  resolveDestroyMutation
} = require('../../utils/resolve')

const { invoices } = require('../../models/invoices')

const mutations = {
  createInvoice: resolveCreateMutation(invoices),
  updateInvoice: resolveUpdateMutation(invoices),
  destroyInvoice: resolveDestroyMutation(invoices)
}

module.exports = { mutations }
