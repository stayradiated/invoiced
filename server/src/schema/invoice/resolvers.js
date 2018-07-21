const { resolveRelatedItem } = require('../../utils/resolve')

const { invoices } = require('../../models/invoices')

const resolvers = {
  Invoice: {
    client: resolveRelatedItem(invoices, 'client'),
    rows: resolveRelatedItem(invoices, 'rows')
  }
}

module.exports = { resolvers }
