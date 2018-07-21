const {
  resolveRelatedItem,
  resolveRelatedList
} = require('../../utils/resolve')

const { invoices } = require('../../models/invoices')

const resolvers = {
  Invoice: {
    client: resolveRelatedItem(invoices, 'client'),
    rows: resolveRelatedList(invoices, 'rows')
  }
}

module.exports = { resolvers }
