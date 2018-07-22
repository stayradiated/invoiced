const {
  resolveRelatedItem,
  resolveRelatedList
} = require('../../utils/resolve')

const { invoices } = require('../../models/invoices')

const resolvers = {
  Invoice: {
    number: (invoice) => invoice.number || '',
    date: (invoice) => invoice.date ? invoice.date.toJSON() : '',
    paid: (invoice) => invoice.paid || false,
    customer: (invoice) => invoice.customer || '',
    email: (invoice) => invoice.email || '',
    site: (invoice) => invoice.site || '',
    cost: (invoice) => invoice.cost || '',
    labour: (invoice) => invoice.labour || '',
    airmover: (invoice) => invoice.airmover || '',
    createdAt: (invoice) => invoice.createdAt.toJSON(),
    updatedAt: (invoice) => invoice.updatedAt.toJSON(),

    client: resolveRelatedItem(invoices, 'client'),
    rows: resolveRelatedList(invoices, 'rows', (qb) => {
      qb.orderBy('id', 'ASC')
    })
  }
}

module.exports = { resolvers }
