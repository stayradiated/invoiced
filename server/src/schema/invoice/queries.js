const {
  resolveItemFromCollection,
  resolvePageFromCollection
} = require('../../utils/resolve')

const { invoices } = require('../../models/invoices')

const queries = {
  invoice: resolveItemFromCollection(invoices),
  invoices: resolvePageFromCollection(invoices)
}

module.exports = { queries }
